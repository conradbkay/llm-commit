import { config } from 'dotenv'
config()

import { writeFile } from 'fs/promises'
import process from 'node:process'
import { OptionValues, program } from 'commander'
import pc from 'picocolors'
import clipboard from 'clipboardy'
import { oraPromise } from 'ora'
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
        '-u, --unstaged',
        'Use unstaged changes (omits --cached in git diff)'
      )
      .option('-c, --copy', 'copies output to clipboard')
      .option(
        '-r, --reason-tokens <reasonTokens>',
        'enable reasoning/thinking for eligible models'
      )
      .option('-s, --silent', 'do not print output')
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
    unstaged: boolean
    copy: boolean
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
    unstaged,
    provider,
    copy
  }: CliOptions
) => {
  if (!provider) {
    console.log(`Defaulting to ${defaultProvider}...`)
    provider = defaultProvider
  }

  const useProviderKey = convertProviderInput(provider)

  if (!(useProviderKey! in providerData)) {
    throw new Error(`provider "${provider}" not recognized`)
  }

  const { defaultModelId, sdkProvider } = providerData[useProviderKey!]

  const useModelId = modelId || defaultModelId

  const model = sdkProvider(useModelId)

  console.log('Running ' + useModelId)

  try {
    const llmResult = await oraPromise(
      genCommitMessage({
        model,
        maxTokens: maxTokens || DEFAULT_TOKENS,
        reasonTokens,
        diffOptions: { cached: !unstaged }
      })
    )

    if (!llmResult.text) {
      throw new Error('No commit message generated')
    }

    if (copy) {
      clipboard.write(llmResult.text) // if this were browser we'd want to catch err in case we don't have permission
    }

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
  } catch (err) {
    // seems like ai-sdk already handles any retryable errors, just error includes a lot of the request and res which seems unnecessary
    if ('data' in err && 'error' in err.data) {
      console.error(err.data.error.type + '\n' + err.data.error.message)
    } else {
      console.error(err)
    }

    process.exit(1)
  }
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
