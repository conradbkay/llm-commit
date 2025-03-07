import { config } from 'dotenv'
config()

import process from 'node:process'
import { OptionValues, program } from 'commander'
import pc from 'picocolors'
import { oraPromise } from 'ora'
import { anthropic } from '@ai-sdk/anthropic'
import { xai } from '@ai-sdk/xai'
import { deepseek } from '@ai-sdk/deepseek'
// todo make us not have to write file extension
import { DEFAULT_TOKENS, defaultProvider, providerData } from './constants.js'
import { genCommitMessage } from './genMessage.js'

export const run = async () => {
  try {
    program
      .description(
        `${pc.greenBright('LLM Commit')} - Turn diffs into somewhat accurate commit messages`
      )
      .option('-p, --provider <provider>', 'LLM provider')
      .option('-m, --model-id <id>', 'model id')
      .option('-t, --max-tokens <tokens>', 'max tokens')
      .option('-o, --out-path <path>', 'write path for full LLM output')
      .option(
        '-r, --reason-tokens <reasonTokens>',
        'enable reasoning/thinking for eligible models'
      )
      .option(
        '-s, --silent',
        'do not print output (should only be used with --out-path)'
      )
      .option('-c, --cached', 'whether to use staged files for git diff')
      .action(commanderActionEndpoint)

    await program.parseAsync(process.argv)
  } catch (error) {
    console.error(error)
  }
}

export type CliOptions = OptionValues &
  Partial<{
    provider: string
    modelId: string
    maxTokens: number
    reasonTokens: number
    outPath: string
    silent: boolean
    cached: boolean
  }>

const commanderActionEndpoint = async (options: CliOptions = {}) => {
  await runCli(process.cwd(), options)
}

export const runCli = async (
  cwd: string,
  {
    modelId,
    maxTokens,
    outPath,
    reasonTokens,
    silent,
    cached,
    provider
  }: CliOptions
) => {
  if (!provider) {
    console.log('Defaulting to ', defaultProvider + '...')
    provider = defaultProvider
  }

  const useProviderKey = convertProviderInput(provider)

  if (!(useProviderKey! in providerData)) {
    throw new Error(`provider "${provider}" not recognized`)
  }

  const { defaultModelId, sdkProvider } = providerData[useProviderKey!]

  const useModelId = modelId || defaultModelId

  const model = sdkProvider(useModelId)

  await oraPromise(
    genCommitMessage({
      model,
      maxTokens: maxTokens || DEFAULT_TOKENS,
      reasonTokens,
      outPath,
      silent,
      diffOptions: { cached }
    })
  )
}

// tries to find close matches/shorthands
const convertProviderInput = (rawInput: string) => {
  const normalized = rawInput.toLowerCase().trim()

  for (const provider in providerData) {
    if (providerData[provider].names.includes(normalized)) {
      return provider
    }
  }

  return null
}
