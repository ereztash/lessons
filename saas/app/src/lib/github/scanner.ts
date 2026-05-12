import { Octokit } from '@octokit/rest'
import type { RepoScanInput, CommitSummary } from '@/lib/classifier/types'

export async function scanRepo(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<RepoScanInput> {
  const [repoData, commits, prs, rootTree, claudeMd, docs] = await Promise.allSettled([
    octokit.repos.get({ owner, repo }),
    octokit.repos.listCommits({ owner, repo, per_page: 50 }),
    octokit.pulls.list({ owner, repo, state: 'all', per_page: 1 }),
    octokit.git.getTree({ owner, repo, tree_sha: 'HEAD' }),
    octokit.repos.getContent({ owner, repo, path: 'CLAUDE.md' }).catch(() => null),
    octokit.repos.getContent({ owner, repo, path: 'docs' }).catch(() => null),
  ])

  const repoInfo =
    repoData.status === 'fulfilled' ? repoData.value.data : null
  const commitList =
    commits.status === 'fulfilled' ? commits.value.data : []
  const prList = prs.status === 'fulfilled' ? prs.value.data : []
  const tree = rootTree.status === 'fulfilled' ? rootTree.value.data.tree : []

  const rootFiles = tree
    .filter((item) => item.type === 'blob')
    .map((item) => item.path ?? '')
    .filter(Boolean)

  const packageJsonEntry = tree.find((item) => item.path === 'package.json')
  let packageJson: Record<string, unknown> | null = null
  if (packageJsonEntry?.sha) {
    try {
      const blob = await octokit.git.getBlob({
        owner,
        repo,
        file_sha: packageJsonEntry.sha,
      })
      const content = Buffer.from(blob.data.content, 'base64').toString('utf-8')
      packageJson = JSON.parse(content)
    } catch {
      packageJson = null
    }
  }

  const mappedCommits: CommitSummary[] = commitList.map((c) => ({
    sha: c.sha,
    message: c.commit.message,
    authorName: c.commit.author?.name ?? '',
    authorEmail: c.commit.author?.email ?? '',
    date: c.commit.author?.date ?? '',
  }))

  const lastCommitDate =
    repoInfo?.pushed_at ? new Date(repoInfo.pushed_at) : null

  return {
    owner,
    name: repo,
    githubRepoId: repoInfo?.id ?? 0,
    language: repoInfo?.language ?? null,
    description: repoInfo?.description ?? null,
    lastCommitAt: lastCommitDate,
    defaultBranch: repoInfo?.default_branch ?? 'main',
    commits: mappedCommits,
    prCount: prList.length > 0 ? (prs.status === 'fulfilled' ? 1 : 0) : 0,
    rootFiles,
    packageJson,
    hasClaudeMd:
      claudeMd !== null &&
      claudeMd.status === 'fulfilled' &&
      claudeMd.value !== null,
    hasDocs:
      docs !== null &&
      docs.status === 'fulfilled' &&
      docs.value !== null,
  }
}

export async function scanAllRepos(
  accessToken: string
): Promise<RepoScanInput[]> {
  const octokit = new Octokit({ auth: accessToken })

  const reposResponse = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    per_page: 100,
    sort: 'pushed',
    direction: 'desc',
  })

  // Scan repos in parallel batches of 6
  const results: RepoScanInput[] = []
  for (let i = 0; i < reposResponse.length; i += 6) {
    const batch = reposResponse.slice(i, i + 6)
    const batchResults = await Promise.allSettled(
      batch.map((r) => scanRepo(octokit, r.owner.login, r.name))
    )
    for (const result of batchResults) {
      if (result.status === 'fulfilled') results.push(result.value)
    }
  }

  return results
}
