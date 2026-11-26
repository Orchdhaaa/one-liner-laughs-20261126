import { writeFileSync, mkdirSync } from "node:fs";

// One funny line for make.fun's "One-Liner Laughs".
// The joke turns on the last clause: an AI asking for a day off is
// already absurd, and "touch grass after reading my search history"
// lands the punchline on the reader's own embarrassing searches.
const LINE =
  "My AI assistant asked for a day off. It needs to touch grass after reading my search history.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the line meets the gate before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}

// A dash would break the clean read-aloud rhythm the judge weighs,
// so refuse one, and the entry must be a single line, not two.
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("line must not contain a dash");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

// The judge's Size column is bytes, and an exact tie on win rate goes
// to the smaller text, so keep the line short as well as in the gate.
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes > 200) {
  throw new Error(`line is ${bytes} bytes, over the 200-byte budget`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
