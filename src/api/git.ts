import { simpleGit } from 'simple-git'

export const getDiff = async () => {
  const git = simpleGit()

  const diff = await git.diff()

  return diff
}
