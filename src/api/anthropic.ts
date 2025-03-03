import Anthropic from '@anthropic-ai/sdk'
import {
  MessageCreateParamsNonStreaming,
  ThinkingConfigParam
} from '@anthropic-ai/sdk/resources/index.mjs'

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'] // This is the default and can be omitted
})

export const { create } = client.messages

export const configs: Record<
  string,
  (tokens?: number) => Partial<MessageCreateParamsNonStreaming> & {
    model: string
  }
> = {
  sonnet_think: (tokens: number = 1024) => ({
    max_tokens: tokens * 2,
    thinking: { type: 'enabled', budget_tokens: tokens } as ThinkingConfigParam,
    model: 'claude-3-7-sonnet-latest'
  }),
  sonnet: () => ({ model: 'claude-3-7-sonnet-latest' }),
  haiku: () => ({ model: 'claude3-5-haiku-latest' })
}
