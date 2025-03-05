const system =
  'You are a senior software engineer working as the lead of a popular open-source project. You are presented with a code diff, and must understand the changes, then write a proper commit message for them. You will be given an example to understand what the message should look like generally'

// not all of these will be used. See baseDisable and custom based on model
const instructions = {
  logic:
    "\n\nBefore outputting the commit, think for a few sentences about what the diffs mean, creating a list of changes. Make sure the summary generalizes to most of the changes and doesn't just focus on one. Try generating a summary, then saying whether it is general, comprehensive, and concise then trying to make a better one. Use that one in your final message rather than coming up with a separate summary. For each point, try referencing which file change(s) it correlates to",
  'no-hallicinate':
    "Be very careful not to describe any changes that weren't definitely made. It is much better to produce a very short message than make anything up",
  examples: `\n\n<example>
updated code to use locally hosted ollama llm, nomic-embed-text model
</example>
  
  <example>Update setup_mcp.py
Added import platform to detect the operating system
Used platform.system() to check if it's Windows or not
Adjusted pip and python paths:

Windows: uses 'Scripts' folder and '.exe' extension
Mac/Linux: uses 'bin' folder without extension

The script now automatically detects the operating system and uses the appropriate paths for each one, making it compatible with both Windows and macOS/Linux systems</example>

<example>
set the embedding model in an environment variable
</example>`,
  'think-first':
    '\n\nPlease make sure your commit message comes after any thinking/reasoning about the code changes'
} as const

// used for benchmarking/prompt development
const experimentalInstructions = {
  'output-usage':
    'Your output will be fed to git commit -m "[your commit message]"',
  explanation: 'Explain why changes were made'
} as const

const instructionKeyOrder = [
  'explanation',
  'output-usage',
  // just use a thinking model for this?
  //'logic',
  //'no-hallucinate',
  'examples',
  'think-first'
] as const

export const genPrompt = (
  diff: string,
  disableInstructionKeys: string[] = []
) => {
  const base = instructionKeyOrder
    .filter(
      (key) => key in instructions && !disableInstructionKeys.includes(key)
    )
    .map((key) => instructions[key])
    .join('')
    .trim()

  return {
    system,
    messages: [
      // apparently long context (20k+) at the top performs a lot better, but can test for shorter
      { role: 'user' as const, content: `<diff>${diff}</diff>\n\n${base}` }
      // causes error for think mode
      /*{
        role: 'assistant' as const,
        content: 'The first change to the code is'
      }*/
    ]
  }
}
