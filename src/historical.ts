import { getLog } from './git'

// ! force pushes
export const editPriorCommits = async (after: Date) => {
  const commits = await getLog()

  return commits
}
