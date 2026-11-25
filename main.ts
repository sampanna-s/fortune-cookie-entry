import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const fortune =
  "The stars promise you great wealth in your future. They did not mention it is currently held as collateral.";

// Gate mirror from RULES.txt: UTF-8 text, 1-160 chars, not only
// whitespace, and a fortune cookie line of at most 20 words.
if (
  fortune.length < 1 ||
  fortune.length > 160 ||
  fortune.trim().length === 0 ||
  fortune.trim().split(/\s+/).length > 20
) {
  throw new Error("fortune fails the entry gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, fortune + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
