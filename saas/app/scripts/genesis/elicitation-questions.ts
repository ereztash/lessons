export interface ElicitationQuestion {
  id: string
  dimension: 'actors' | 'entities' | 'invariants' | 'antiPatterns' | 'vocabulary'
  text: string
}

export const ELICITATION_QUESTIONS: ElicitationQuestion[] = [
  { id: 'A1', dimension: 'actors',       text: 'Who are the actors that initiate work in this system?' },
  { id: 'A2', dimension: 'actors',       text: 'Who consumes the output of those actions?' },
  { id: 'A3', dimension: 'actors',       text: 'Which role has the least power but most frequent contact with the system?' },
  { id: 'A4', dimension: 'actors',       text: 'Is there an actor whose absence the system must tolerate gracefully?' },
  { id: 'B1', dimension: 'entities',     text: 'What is the central noun in your description? (root entity)' },
  { id: 'B2', dimension: 'entities',     text: 'What 2-3 entities are owned by the root?' },
  { id: 'B3', dimension: 'entities',     text: 'Is the dominant relationship one-to-many or many-to-many?' },
  { id: 'B4', dimension: 'entities',     text: 'What is the smallest atomic transaction (one verb + one noun)?' },
  { id: 'C1', dimension: 'invariants',   text: 'What is the one thing that must NEVER happen?' },
  { id: 'C2', dimension: 'invariants',   text: 'What is the constraint true at every moment in time?' },
  { id: 'C3', dimension: 'invariants',   text: 'What state transitions are illegal?' },
  { id: 'D1', dimension: 'antiPatterns', text: 'What did past versions of this idea get wrong?' },
  { id: 'D2', dimension: 'antiPatterns', text: 'What assumption looks reasonable but is not?' },
  { id: 'D3', dimension: 'antiPatterns', text: 'What is the "easy" version users will demand but you must refuse?' },
  { id: 'D4', dimension: 'antiPatterns', text: 'What is the failure mode you have seen in similar systems?' },
  { id: 'E1', dimension: 'vocabulary',   text: 'What word does your domain use where the world says X?' },
  { id: 'E2', dimension: 'vocabulary',   text: 'What sentence would make a domain expert wince?' },
  { id: 'E3', dimension: 'vocabulary',   text: 'What sentence signals deep understanding?' },
]
