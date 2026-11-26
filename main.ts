import { mkdirSync, writeFileSync } from "node:fs";

// One-Liner Laughs: a single joke line, written out for the judge.
// The setup treats the assistant like an employee asking for leave;
// the payoff is that its burnout came from reading the human's searches.
const JOKE =
  "My AI assistant asked for a day off. It needs to touch grass after reading my search history.";

const letters = Array.from(JOKE);
if (letters.length < 1 || letters.length > 200) {
  throw new Error(`joke is ${letters.length} characters, not 1-200`);
}
if (JOKE.trim() === "") {
  throw new Error("joke is blank");
}
// A one-line joke needs a setup and a payoff, so a single word is not
// a joke: require at least two words before the line goes to the judge.
if (!JOKE.includes(" ")) {
  throw new Error("joke needs more than one word");
}
if (/[\n\r\t]/.test(JOKE)) {
  throw new Error("joke must fit on one line");
}
if (/[–—]/.test(JOKE)) {
  throw new Error("joke must not use a dash");
}
const size = new TextEncoder().encode(JOKE).length;
if (size > 200) {
  throw new Error(`joke is ${size} bytes, over the 200-byte budget`);
}

const folder =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(folder, { recursive: true });
writeFileSync(`${folder}/entry.txt`, JOKE, "utf8");
