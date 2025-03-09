import { generateText, LanguageModel } from 'ai'
import { genFileStructure } from './context.js'
import { DiffOptions, getDiff } from './git.js'
import { genPrompt } from './prompt.js'
import { ANTHROPIC_MIN_THINK_BUDGET } from './constants.js'

export type GenCommitMessageOptions = {
  model: LanguageModel
  maxTokens: number
  reasonTokens?: number
  thinkTokens?: boolean
  diffOptions?: DiffOptions
}

export const genCommitMessage = async ({
  model,
  maxTokens,
  reasonTokens,
  diffOptions
}: GenCommitMessageOptions) => {
  const diff = await getDiff(diffOptions || {})

  const fileStructure = await genFileStructure()

  const prompt = genPrompt({
    diff,
    fileStructure,
    disableInstructionKeys: reasonTokens ? ['logic'] : undefined
  })

  const llmResult = await generateText({
    model,
    maxTokens,
    ...prompt,
    providerOptions: {
      anthropic: {
        thinking: {
          type: reasonTokens ? 'enabled' : 'disabled',
          budgetTokens: Math.max(ANTHROPIC_MIN_THINK_BUDGET, reasonTokens || -1)
        }
      }
    }
  })

  return llmResult
}
