import { generateText, LanguageModel } from 'ai'
import { genFileStructure } from './context.js'
import { DiffOptions, getDiff } from './git.js'
import { genPrompt } from './prompt.js'
import { writeFile } from 'fs/promises'

export type GenCommitMessageOptions = {
  model: LanguageModel
  maxTokens: number
  reasonTokens?: number
  outPath?: string
  printCommit?: boolean
  thinkTokens?: boolean
  diffOptions?: DiffOptions
}

export const genCommitMessage = async ({
  model,
  maxTokens,
  reasonTokens,
  outPath,
  printCommit,
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
          budgetTokens: Math.max(1024, reasonTokens || 0) // anthropic minimum
        }
      }
    }
  })

  if (printCommit) {
    console.log(llmResult.text)
  }

  if (outPath) {
    await writeFile(outPath, JSON.stringify(llmResult), 'utf8')
  }
}
