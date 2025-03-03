// not all of these will be used. See baseDisable and custom based on model
const instructions = {
  task: 'Your goal is to write a git commit message for a code diff',
  senior:
    'Reply as a senior software engineer who takes pride in their commit messages',
  formatSummary:
    'Always write a summary for the first line, which should be short, less than 72 characters and ideally less than 50 characters',
  formatDesc:
    'Any additional text is purely optional and should come after a blank line. Feel free to use bullet point format. Try not to reiterate every trivial change made to the code',
  logic:
    "Before outputting the commit, think for a few sentences about what the diffs mean, creating a list of changes. Make sure the summary generalizes to most of the changes and doesn't just focus on one. Try generating a summary, then saying whether it is general, comprehensive, and concise then trying to make a better one. Use that one in your final message rather than coming up with a separate summary",
  noIntro: 'Do NOT start with things like "here is a commit message"',
  diffExplain:
    'The text that follows is the code diff for the commit, your message should reflect these changes',
  noHallucinate:
    "Be very careful not to describe any changes that weren't definitely made. It is much better to produce a very short message than make anything up"
} as const

// mostly used for benchmarking/prompt development
const experimentalInstructions = {
  outputUsage:
    'Your output will be fed to git commit -m "[your commit message]"',
  explanation: 'Explain why changes were made'
} as const

const instructionKeyOrder = [
  'task',
  'senior',
  'explanation',
  'outputUsage',
  'formatSummary',
  'formatDesc',
  'logic',
  'noIntro',
  'diffExplain',
  'noHallucinate'
] as const

export const genPrompt = (
  diff: string,
  disableInstructionKeys: string[] = []
) => {
  const base = instructionKeyOrder
    .filter(
      (key) => key in instructions && !disableInstructionKeys.includes(key)
    )
    .reduce((accum, instructionKey) => {
      return accum + instructions[instructionKey] + '. '
    }, '')
    .trim()

  return base + '\n\n' + diff
}
