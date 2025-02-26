import { writeFile } from 'fs/promises'
import { create } from './api/anthropic'

async function main() {
  const message = await create({
    max_tokens: 8192,
    messages: [
      {
        role: 'user',
        content: `Reply as a 10x senior developer:
        How would you design a system to generate prompts for an LLM to generate concise, relevant git commit messages?
        Assume you have access to all data about the repository and file/code changes
        do NOT generate any code, just describe a general approach for now`
      }
    ],
    model: 'claude-3-5-haiku-latest'
  })

  await writeFile('output.json', JSON.stringify(message), 'utf8')
}

main()
