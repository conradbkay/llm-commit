import { writeFile } from 'fs/promises'
import { genPrompt } from './prompt'
import { unwrapResult } from '@promptbook/utils'
import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { getDiff } from './api/git'

const TOKENS = 1024
const THINK_MODE = 'disabled'

async function main() {
  const model = anthropic('claude-3-7-sonnet-latest')

  const diff = await getDiff()

  const prompt = genPrompt(diff)

  const message = await generateText({
    model,
    maxTokens: TOKENS,
    ...prompt,
    providerOptions: {
      anthropic: {
        thinking: { type: THINK_MODE, budgetTokens: Math.floor(TOKENS / 2) }
      }
    }
  })

  console.log(unwrapResult(message.text))

  await writeFile(model + '.json', JSON.stringify(message), 'utf8')
}

main()
