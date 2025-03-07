import { getLog } from './git.js'

// ! rewriting history is dangerous
export const editPriorCommits = async (
  genMessage: () => Promise<string>,
  after?: Date
) => {
  // check for potential prompt injection
  if (after && !(after instanceof Date)) {
    throw new Error()
  }

  const commits = await getLog()

  return commits
}
