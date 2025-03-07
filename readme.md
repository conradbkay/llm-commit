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

The code runs `git diff` internally which respects .gitignore

`git diff` doesn't count staged changes, so pass in --cached if you already ran `git add`

<https://harper.blog/2024/03/11/use-an-llm-to-automagically-generate-meaningful-git-commit-messages/> basic idea
