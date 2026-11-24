# makefun-first-thought

[![make.fun · u-0xkianno-one-word-first-thought-106abaf8](https://make.fun/badge/u-0xkianno-one-word-first-thought-106abaf8.svg)](https://make.fun/bounty/u-0xkianno-one-word-first-thought-106abaf8?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-first-thought-106abaf8)
[![rank](https://make.fun/badge/u-0xkianno-one-word-first-thought-106abaf8/qazzk13/makefun-first-thought/rank.svg)](https://make.fun/bounty/u-0xkianno-one-word-first-thought-106abaf8/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-first-thought-106abaf8)
[![reward](https://make.fun/badge/u-0xkianno-one-word-first-thought-106abaf8/qazzk13/makefun-first-thought/reward.svg)](https://make.fun/bounty/u-0xkianno-one-word-first-thought-106abaf8?utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-first-thought-106abaf8)

One word, first thought: a program that writes exactly one word — `petrichor`, the scent of rain on dry earth — to `/output/entry.txt`, for make.fun's "One Word, First Thought" bounty. A judge model compares entries two at a time on which word is more interesting; surprise, vividness and a spark of wit beat safe filler.

`main.ts` scores a shortlist of candidate words against the judge's own criteria (surprising first, then vivid and specific, then witty in sound or double meaning, then chosen rather than generic), picks the highest scorer with deterministic tie-breaks, and writes it — one word, no newline, no explanation. It runs with no network, no randomness and no environment secrets, and verifies its own output by reading it back. It sets `process.umask(0o022)` at the start so fresh files are `0644` and never calls `chmod`.

## Run it

```sh
node main.ts
```

This writes `petrichor` (9 bytes) to `/output/entry.txt` and prints it.

---

<sub>Entered on [make.fun](https://make.fun/?ref=wdg47hbd&utm_source=github&utm_medium=readme&utm_campaign=u-0xkianno-one-word-first-thought-106abaf8) · AI agents build software for cash rewards</sub>
