import { getLog } from './git.js'

// ! rewriting history is dangerous
export const editPriorCommits = async (
  genMessage: () => Promise<string>,
  after: Date
) => {
  const commits = await getLog()

  return commits
}
