import process from 'node:process'
import { Option, OptionValues, program } from 'commander'
import pc from 'picocolors'

export const run = async () => {
  try {
    program
      .description(
        'LLM Commit - Turn diffs into somewhat accurate commit messages'
      )
      .action(commanderActionEndpoint)

    await program.parseAsync(process.argv)
  } catch (error) {
    console.error(error)
  }
}

export interface CliOptions extends OptionValues {}

const commanderActionEndpoint = async (
  directories: string[],
  options: CliOptions = {}
) => {
  await runCli(directories, process.cwd(), options)
}

export const runCli = async (
  directories: string[],
  cwd: string,
  options: CliOptions
) => {}
