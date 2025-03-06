import { simpleGit } from 'simple-git'

const git = simpleGit()

export type DiffOptions = {
  prev?: number
  cached?: boolean
}

// prev=2 means 2nd most recent commit
export const getDiff = async ({ prev, cached }: DiffOptions) => {
  let diffConfig: string[] = []

  if (typeof prev === 'number') {
    diffConfig.push(`HEAD~${prev}`)
  }

  if (cached) {
    diffConfig.push('--cached')
  }

  const diff = await git.diff(diffConfig)

  if (!diff) {
    throw new Error(
      'No diff found. Did you already `git add` the changes and meant to pass `--cached`?'
    )
  }

  return diff
}

// git date format is pretty broad, can say "yesterday" etc
export const getLog = async (after?: string) => {
  const { all } = await git.log(after ? { '--after': after } : {})

  return all
}
