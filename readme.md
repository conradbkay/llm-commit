# LLM Commit

Hopefully use any model to generate above average commit messages. The bar has never been lower

Most of the refinement will likely come in the form of better prompting, or just better models being released

## Setup

### .env

```ini
ANTHROPIC_API_KEY=
GROQ_API_KEY=
```

### Beyond .gitignore

Certain files should be commited but their diff not used for generating the message

- lockfiles
- certain file types (.bin)
- any very large diff

Client side can add `package-lock.json -diff` to `.gitattributes`

## Roadmap

- Turn into a CLI tool
- More APIs (Deepseek, openAI)
- Benchmarking performance (obviously will be subjective comparison)
- Run on previous commits
- Run on commits in date range, manually approve/deny all changes or ask it to try again
- Might as well have a frontend for the above

## Price

Input tokens will likely be 10-100x output. Basic prompting with small commits will average maybe 1.5k input tokens per commit, and 100 output tokens would be on the very high end

- 625 commits/$ using 3.5 Haiku
- 167 commits/$ using 3.7 Sonnet

## Benchmarking

Diff is ugly to present usually, maybe some react package for that
