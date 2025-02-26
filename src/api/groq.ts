import Groq from 'groq-sdk'

const client = new Groq({
  apiKey: process.env['GROQ_API_KEY'] // This is the default and can be omitted
})

export const { create } = client.chat.completions
