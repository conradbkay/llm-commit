import { writeFile } from 'fs/promises'
import { genPrompt } from './prompt'
import { unwrapResult } from '@promptbook/utils'
import { configs, create } from './api/anthropic'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const diff = readFileSync(resolve('./diff.txt'), 'utf8')

const TOKENS = 1024

async function main() {
  const message = await create({
    max_tokens: TOKENS,
    messages: [
      {
        role: 'user',
        content: genPrompt(diff)
      }
    ],
    ...configs.sonnet_think(TOKENS)
  })

  if (message.content[message.content.length - 1].type !== 'text') {
    throw new Error('Unexpected output length/type')
  }

  console.log(
    unwrapResult((message.content[message.content.length - 1] as any).text)
  )

  await writeFile('output.json', JSON.stringify(message), 'utf8')
}

main()
