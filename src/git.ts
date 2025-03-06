import { simpleGit } from 'simple-git'

const git = simpleGit()

// prev=2 means 2nd most recent commit
export const getDiff = async (prev?: number) => {
  const diff = await git.diff(
    typeof prev === 'number' ? [`HEAD~${prev}`] : undefined
  )

  return diff
}

// git date format is pretty broad, can say "yesterday" etc
export const getLog = async (after?: string) => {
  const { all } = await git.log(after ? { '--after': after } : {})

  return all
}
