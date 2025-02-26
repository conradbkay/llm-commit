import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'] // This is the default and can be omitted
})

// TODO temporary until I look at other companies API/look for something all-in-one
export const { create } = client.messages
