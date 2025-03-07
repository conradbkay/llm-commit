import { generateText, LanguageModel } from 'ai'
import { genFileStructure } from './context.js'
import { DiffOptions, getDiff } from './git.js'
import { genPrompt } from './prompt.js'
import { writeFile } from 'fs/promises'
import { ANTHROPIC_MIN_THINK_BUDGET } from './constants.js'

export type GenCommitMessageOptions = {
  model: LanguageModel
  maxTokens: number
  reasonTokens?: number
  outPath?: string
  silent?: boolean
  thinkTokens?: boolean
  diffOptions?: DiffOptions
}

export const genCommitMessage = async ({
  model,
  maxTokens,
  reasonTokens,
  outPath,
  silent,
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

  if (!silent) {
    console.log('\n' + llmResult.text)
  }

  if (outPath) {
    try {
      await writeFile(outPath, JSON.stringify(llmResult), 'utf8')
    } catch (writeError) {
      // We don't want to fail the entire operation if just the output file fails
      console.error(
        `Warning: Failed to write output to ${outPath}: ${writeError.message}`
      )
    }
  }
}
