# Roadmap

<https://repomix.com/guide/> some ideas for giving code to LLMs

<https://cbea.ms/git-commit/> writing good commit messages

- Interface for providing more custom args <http://sdk.vercel.ai/docs/ai-sdk-core/settings>
- Performance Benchmarking (manual)
- Run on previous commits
- Run on commits in date range, manually approve/deny all changes or ask it to try again
- Might as well have a frontend for the above
- Maybe it'll handle doing several commits from one prompt well, which would reduce cost a lot if using a lot of general codebase context

## Misc

Diff is ugly to present usually, maybe some react package for that

Probably prefer diffs in plain format since training data might work with diffs, but could try out something like diff/parse-diff/parse-git-diff

### Beyond .gitignore

Certain files should be commited but their diff not used for generating the message

- lockfiles
- certain file types (.bin)
- any very large diff

Client side can add `package-lock.json -diff` to `.gitattributes`
