import { simpleGit } from 'simple-git'

// prev=2 means 2nd most recent commit
export const getDiff = async (prev?: number) => {
  const git = simpleGit()

  const diff = await git.diff(
    typeof prev === 'number' ? [`HEAD~${prev}`] : undefined
  )

  return diff
}
