import type { ProjectSpec, ScaffoldOutput } from './types'
import { validate } from './validator'
import { renderAll } from './templates'

export function compile(spec: ProjectSpec, rootDir: string): ScaffoldOutput {
  const validation = validate(spec)
  if (!validation.passed) {
    return { rootDir, files: [], validation }
  }
  return { rootDir, files: renderAll(spec), validation }
}
