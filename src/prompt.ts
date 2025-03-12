const system =
  "You are a senior software engineer working as the lead of a popular open-source project. You are presented with the codebase's file structure and the commit diff, and must understand the changes, then write a proper commit message for them"

const logic =
  "\n\nBefore outputting the commit, think for a few sentences about what the diffs mean, creating a list of changes. Make sure the summary generalizes to most of the changes and doesn't just focus on one. Try generating a summary, then saying whether it is general, comprehensive, and concise then trying to make a better one. Use that one in your final message rather than coming up with a separate summary.\n\nDo Not Hallucinate.\n\nMake sure your commit message comes after any thinking/reasoning about the code changes"

const examples = [
  'feat: use locally hosted ollama llm',
  'set the embedding model in an environment variable',
  `fs/pipe: add simpler helpers for common cases

The fix to atomically read the pipe head and tail state when not holding
the pipe mutex has caused a number of headaches due to the size change
of the involved types.

It turns out that we don't have _that_ many places that access these
fields directly and were affected, but we have more than we strictly
should have, because our low-level helper functions have been designed
to have intimate knowledge of how the pipes work.`
]

const main = `Guidelines:
- Make sure the summary is very short (less than 75 characters)
- Explain the purpose and functionality of the code
- Define technical terms and concepts when relevant
- Use analogies or examples to illustrate concepts
- Focus on the core logic rather than trivial details
- Adjust explanation depth based on the apparent complexity of the commit`

export type GenPromptOptions = {
  diff: string
  fileStructure: string[]
  disableInstructionKeys?: string[]
}

export const genPrompt = ({
  diff,
  fileStructure,
  disableInstructionKeys
}: GenPromptOptions) => {
  return {
    system,
    messages: [
      // apparently long context (20k+) at the top performs a lot better so put diff there
      {
        role: 'user' as const,
        content: `<diff>${diff}</diff>\n\n<files>${fileStructure.join('\n')}\n</files>\n\n${examples}\n\n${main}`
      }
    ]
  }
}
