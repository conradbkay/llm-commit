import { readFile } from 'fs/promises'
import { globby } from 'globby'
// could trim to ignoring any folders that don't contain an edited file
export const genFileStructure = async (patterns: string | string[] = '**') => {
  const paths = await globby(patterns, { gitignore: true, onlyFiles: true })

  return paths
}

const formatCommitDiff = (diff: string) => {
  return diff
}
