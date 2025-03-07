const system =
  "You are a senior software engineer working as the lead of a popular open-source project. You are presented with the codebase's file structure and the commit diff, and must understand the changes, then write a proper commit message for them. You will be given some examples to understand what the message should look like"

// not all of these will be used. See baseDisable and custom based on model
const instructions = {
  logic:
    "\n\nBefore outputting the commit, think for a few sentences about what the diffs mean, creating a list of changes. Make sure the summary generalizes to most of the changes and doesn't just focus on one. Try generating a summary, then saying whether it is general, comprehensive, and concise then trying to make a better one. Use that one in your final message rather than coming up with a separate summary. For each point, try referencing which file change(s) it correlates to. Do Not Hallucinate",
  examples: `\n\n<example>
use locally hosted ollama llm, nomic-embed-text model
</example>

<example>
set the embedding model in an environment variable
</example>

<example>
fs/pipe: add simpler helpers for common cases
The fix to atomically read the pipe head and tail state when not holding
the pipe mutex has caused a number of headaches due to the size change
of the involved types.

It turns out that we don't have _that_ many places that access these
fields directly and were affected, but we have more than we strictly
should have, because our low-level helper functions have been designed
to have intimate knowledge of how the pipes work.

And as a result, that random noise of direct 'pipe->head' and
'pipe->tail' accesses makes it harder to pinpoint any actual potential
problem spots remaining.

For example, we didn't have a "is the pipe full" helper function, but
instead had a "given these pipe buffer indexes and this pipe size, is
the pipe full".  That's because some low-level pipe code does actually
want that much more complicated interface.

But most other places literally just want a "is the pipe full" helper,
and not having it meant that those places ended up being unnecessarily
much too aware of this all.

It would have been much better if only the very core pipe code that
cared had been the one aware of this all.

So let's fix it - better late than never.  This just introduces the
trivial wrappers for "is this pipe full or empty" and to get how many
pipe buffers are used, so that instead of writing

        if (pipe_full(pipe->head, pipe->tail, pipe->max_usage))

the places that literally just want to know if a pipe is full can just
say

        if (pipe_is_full(pipe))

instead.  The existing trivial cases were converted with a 'sed' script.

This cuts down on the places that access pipe->head and pipe->tail
directly outside of the pipe code (and core splice code) quite a lot.

The splice code in particular still revels in doing the direct low-level
accesses, and the fuse fuse_dev_splice_write() code also seems a bit
unnecessarily eager to go very low-level, but it's at least a bit better
than it used to be.
</example>`,

  'think-first':
    '\n\nPlease make sure your commit message comes after any thinking/reasoning about the code changes',
  brevity:
    '\n\nMake sure the summary is less than 75 characters, and ideally under 50 characters long'
} as const

const instructionKeyOrder = [
  // just use a thinking model for these
  'logic',
  'think-first',
  'examples',
  'brevity'
] as const

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
  const base = instructionKeyOrder
    .filter(
      (key) =>
        key in instructions && !(disableInstructionKeys || []).includes(key)
    )
    .map((key) => instructions[key])
    .join('')
    .trim()

  return {
    system,
    messages: [
      // apparently long context (20k+) at the top performs a lot better, but can test for shorter
      {
        role: 'user' as const,
        content: `<diff>${diff}</diff>\n\n<files>${fileStructure.join('\n')}\n${base}`
      }
      // causes error for think mode
      /*{
        role: 'assistant' as const,
        content: 'The first change to the code is'
      }*/
    ]
  }
}
