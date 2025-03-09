# LLM Commit

Turn diffs into somewhat accurate commit messages

## Setup

Run `llm-commit --help` to see a list of options

### .env

Looks for a .env file in the project root

Follows <https://sdk.vercel.ai/providers/ai-sdk-providers> defaults, for example

```ini
ANTHROPIC_API_KEY=sk-hunter2
```

### Ignoring Files

The code runs `git diff --staged` internally which respects .gitignore. To run on unstaged commits pass in --unstaged or -u

<https://harper.blog/2024/03/11/use-an-llm-to-automagically-generate-meaningful-git-commit-messages/> basic idea
