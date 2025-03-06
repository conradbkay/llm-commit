import { config } from 'dotenv'
config()

import { anthropic } from '@ai-sdk/anthropic'
import { genCommitMessage } from './genMessage'
import { join } from 'path'
import { DEFAULT_TOKENS } from './constants'

const main = async () => {
  const model = anthropic('claude-3-7-sonnet-latest')

  await genCommitMessage({
    model,
    maxTokens: DEFAULT_TOKENS,
    outPath: join('outputs', model.modelId + '.json')
  })
}

main()
