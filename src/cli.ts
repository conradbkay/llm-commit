import { config } from 'dotenv'
config()

import process from 'node:process'
import { OptionValues, program } from 'commander'
import pc from 'picocolors'
import { oraPromise } from 'ora'
import { anthropic } from '@ai-sdk/anthropic'
// todo make us not have to write file extension
import { DEFAULT_TOKENS } from './constants.js'
import { genCommitMessage } from './genMessage.js'

export const run = async () => {
  try {
    program
      .description(
        `${pc.italic('LLM Commit')} - Turn diffs into somewhat accurate commit messages`
      )
      .option('-p, --provider <provider>', 'LLM provider')
      .option('-m, --model <model>', 'model id')
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
    model: string
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
  { model, maxTokens, outPath, reasonTokens, silent, cached }: CliOptions
) => {
  await oraPromise(
    genCommitMessage({
      model: anthropic(model || 'claude-3-7-sonnet-latest'),
      maxTokens: maxTokens || DEFAULT_TOKENS,
      reasonTokens,
      outPath,
      printCommit: !silent,
      diffOptions: { cached }
    })
  )
}
