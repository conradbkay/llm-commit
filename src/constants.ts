import { anthropic } from '@ai-sdk/anthropic'
import { deepseek } from '@ai-sdk/deepseek'
import { openai } from '@ai-sdk/openai'
import { xai } from '@ai-sdk/xai'

export const DEFAULT_TOKENS = 512

export const ANTHROPIC_MIN_THINK_BUDGET = 1024

// for "names" property can probably autogenerate those
// if we had a list of model ids we could include that here and be able to map modelId to provider
export const providerData = {
  anthropic: {
    defaultModelId: 'claude-3-7-sonnet-latest',
    sdkProvider: anthropic,
    names: ['anthropic', 'an', 'ant', 'claude', 'haiku']
  },
  openai: {
    defaultModelId: 'gpt-4o',
    sdkProvider: openai,
    names: ['openai']
  },
  deepseek: {
    defaultModelId: 'deepseek-reasoner',
    sdkProvider: deepseek,
    names: ['deepseek', 'r1', 'de', 'ds']
  },
  xai: {
    defaultModelId: 'groq-beta',
    sdkProvider: xai,
    names: ['xai', 'x'] // don't include groq since that's actually a different provider
  }
} as const

export const defaultProvider = 'anthropic'
