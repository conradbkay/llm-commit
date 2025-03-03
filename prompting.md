# Prompting

- Just brainstorming some considerations and possibilities
- The only way to know what works is by testing it out
- Likely need some context for the repo and project

Almost certainly have to nudge it towards writing good commits, rather than replicating what it's seen before
> Use industry best practices

First line is always the summary, optional extra text goes after a blank line

Slight chance naming a few very popular repos will help
> Write in the style used in the linux kernel

Probably need at least one example

Can try telling it what NOT to do

## Context

Entire file structure is fairly cheap so probably just include that

Maybe can get away with just showing diffs

Would be interesting to give it the last `x` commit messages, with some instructions for how to use it

## Useful Libraries

`@promptbook/utils` has an `unwrap` function to remove any conversational boiletplate like "Here's a concise commit message: " although prompting might be enough to remove those
