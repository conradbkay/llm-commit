# Prompting

- Just brainstorming some considerations and possibilities
- The only way to know what works is by testing it out
- Likely need some context for the repo and project

Almost certainly have to nudge it towards writing good commits, rather than replicating what it's seen before
> Use industry best practices
> Write like a senior developer who takes pride in their commit messages
> Explain "why" certain changes were made

First line is always the summary, optional extra text goes after a blank line

Slight chance naming a few very popular repos will help
> Write in the style used in the linux kernel

Probably need at least one example

Can try telling it what NOT to do

## Context

Entire file structure is fairly cheap so probably just include that

Maybe can get away with just showing diffs

Would be interesting to give it the last `x` commit messages, with some instructions for how to use it

## Experimentation

The end of the message seems to always be part of the commit message

It'll sometimes use conventional commits, making it always do that would make parsing easier
