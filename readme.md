# LLM Commit

Hopefully use any model to generate above average commit messages. The bar has never been lower

<https://repomix.com/guide/> some ideas for giving code to LLMs

<https://harper.blog/2024/03/11/use-an-llm-to-automagically-generate-meaningful-git-commit-messages/> basic idea

<https://cbea.ms/git-commit/>

## Setup

### .env

Follows <https://sdk.vercel.ai/providers/ai-sdk-providers> defaults

```ini
ANTHROPIC_API_KEY=
XAI_API_KEY=
DEEPSEEK_API_KEY=
```

### Beyond .gitignore

Certain files should be commited but their diff not used for generating the message

- lockfiles
- certain file types (.bin)
- any very large diff

Client side can add `package-lock.json -diff` to `.gitattributes`

## Roadmap

- Interface for providing more custom args <http://sdk.vercel.ai/docs/ai-sdk-core/settings>
- Better loading indicators
- Benchmarking performance (obviously will be subjective comparison)
- Run on previous commits
- Run on commits in date range, manually approve/deny all changes or ask it to try again
- Might as well have a frontend for the above

## Price

Input tokens will likely be 10-100x output. Basic prompting with small commits will average maybe 1.5k input tokens per commit, and 100 output tokens would be on the very high end

- 625 commits/$ using 3.5 Haiku
- 167 commits/$ using 3.7 Sonnet

Maybe it'll handle doing several commits from one prompt well, which would reduce cost a lot if using a lot of general codebase context

## Benchmarking

## Misc

Diff is ugly to present usually, maybe some react package for that

Probably prefer diffs in plain format since training data might work with diffs, but could try out something like diff/parse-diff/parse-git-diff
