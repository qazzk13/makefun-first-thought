// One Word, First Thought — make.fun bounty
// u-0xkianno-one-word-first-thought-106abaf8
//
// The program writes exactly one word to /output/entry.txt: the first
// word that comes to mind. The judge compares words two at a time on
// surprise, vividness, and a spark of wit — so the word must be one a
// reader would not have guessed, yet one that calls up a clear image
// the moment it is read.
//
// The choice below is scored, in code, against the judge's own
// criteria (most important first): exactly one word; surprising;
// vivid and specific; witty in sound or double meaning; chosen,
// never generic filler. The highest-scoring word wins, ties broken
// by shorter length, then alphabetically — fully deterministic, no
// randomness, no network, no environment secrets.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The grading sandbox runs as uid 65534, so never chmod anything:
// set the umask instead and fresh files come out 0644, fresh
// directories 0755, which the sandbox can read.
process.umask(0o022);

type Candidate = {
  word: string;
  // 0-5 each, in the judge's criterion order.
  surprise: number;
  vividness: number;
  wit: number;
  chosen: number;
};

const CANDIDATES: Candidate[] = [
  // The scent of rain on dry earth. Uncommon enough to surprise,
  // exact enough to summon the smell in one breath, and its soft
  // petr-ichor music rewards a second look.
  { word: "petrichor", surprise: 5, vividness: 5, wit: 4, chosen: 5 },
  // The warmth of the sun in winter. Lovely, but softer and less
  // sharply imaged than petrichor.
  { word: "apricity", surprise: 5, vividness: 4, wit: 3, chosen: 5 },
  // The sound of wind in the trees. Rarer still, but so obscure
  // the image may not land on a first read.
  { word: "psithurism", surprise: 5, vividness: 4, wit: 3, chosen: 4 },
  // Being thrown out of a window. Funny and vivid, but a joke
  // word first, an image second.
  { word: "defenestration", surprise: 4, vividness: 4, wit: 5, chosen: 4 },
  // The strange strangeness of used bookshops. Evocative, but
  // coined and niche; the feeling is vaguer than a smell.
  { word: "vellichor", surprise: 5, vividness: 3, wit: 3, chosen: 4 },
  // The realisation that every passer-by lives a life as vivid
  // as your own. Beautiful — and, by now, the expected pick.
  { word: "sonder", surprise: 2, vividness: 4, wit: 3, chosen: 3 },
];

function score(c: Candidate): number {
  // Weight the criteria the way the judge orders them.
  return (
    c.surprise * 4 + c.vividness * 3 + c.wit * 2 + c.chosen * 1
  );
}

function pickFirstThought(candidates: Candidate[]): string {
  const ranked = [...candidates].sort((a, b) => {
    const byScore = score(b) - score(a);
    if (byScore !== 0) return byScore;
    if (a.word.length !== b.word.length) return a.word.length - b.word.length;
    return a.word.localeCompare(b.word);
  });
  return ranked[0].word;
}

const word = pickFirstThought(CANDIDATES);

// The gate: UTF-8 text, 1 to 24 characters, not only whitespace,
// exactly one word, nothing else — no newline, no explanation.
if (!/^[^\s]+$/.test(word) || word.length < 1 || word.length > 24) {
  throw new Error(`picked word fails the gate: ${JSON.stringify(word)}`);
}

// The harness fixes the destination: /output/entry.txt. No flag,
// no environment value, no second draft — the path is a constant.
const outDir = "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, word, "utf8");

// Read it back and re-check the gate on the bytes that were
// actually written, so a bad write can never pass silently.
const written = readFileSync(outPath, "utf8");
if (written !== word) {
  throw new Error(`read-back mismatch: ${JSON.stringify(written)}`);
}
console.log(`${word} (${Buffer.byteLength(written, "utf8")} bytes)`);
