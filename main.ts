import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const fortuneText =
  "The oldest code in the room is only asking to be read before it is blamed.";

function validateFortune(text) {
  const characterCount = [...text].length;
  const containsLineBreak = /[\r\n]/.test(text);
  const isBlank = text.trim().length === 0;

  if (characterCount < 1 || characterCount > 120 || containsLineBreak || isBlank) {
    throw new Error(`entry failed validation: ${characterCount} characters`);
  }
}

validateFortune(fortuneText);

function publishEntry(outputDirectory, text) {
  mkdirSync(outputDirectory, { recursive: true });

  const temporaryPath = join(outputDirectory, ".entry.txt.tmp");
  const entryPath = join(outputDirectory, "entry.txt");

  writeFileSync(temporaryPath, text, "utf8");
  renameSync(temporaryPath, entryPath);
}

publishEntry(process.env.MAKEFUN_OUTPUT_DIR || "/output", fortuneText);
