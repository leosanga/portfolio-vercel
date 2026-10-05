import { readFileSync } from "node:fs";
import { ESLint } from "eslint";
import prettier from "prettier";

// Verify the selected lane with LF-normalized input; do not rewrite worktree files.
const patchMode = process.argv.includes("--format-patch");
const files = process.argv.slice(2).filter((arg) => arg !== "--format-patch");
if (!files.length) throw new Error("Pass the source paths to review.");
const eslint = new ESLint();
let patch = "*** Begin Patch\n";
let changed = 0;
let errors = 0;
for (const file of files) {
  const source = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const options = (await prettier.resolveConfig(file)) ?? {};
  const formatted = await prettier.format(source, { ...options, filepath: file });
  if (formatted !== source) {
    changed++;
    if (patchMode) {
      const before = source.trimEnd().split("\n");
      const after = formatted.trimEnd().split("\n");
      let start = 0;
      let end = 0;
      while (before[start] === after[start] && start < Math.min(before.length, after.length))
        start++;
      while (
        end < Math.min(before.length, after.length) - start &&
        before[before.length - 1 - end] === after[after.length - 1 - end]
      )
        end++;
      patch += `*** Update File: ${file}\n@@\n`;
      patch +=
        [
          ...before.slice(Math.max(0, start - 2), start).map((line) => ` ${line}`),
          ...before.slice(start, before.length - end).map((line) => `-${line}`),
          ...after.slice(start, after.length - end).map((line) => `+${line}`),
          ...before.slice(before.length - end, before.length - end + 2).map((line) => ` ${line}`),
        ].join("\n") + "\n";
    }
  }
  if (!patchMode && /\.[cm]?[jt]sx?$/.test(file)) {
    const results = await eslint.lintText(source, { filePath: file });
    for (const result of results) {
      errors += result.errorCount;
      for (const message of result.messages)
        console.log(`${file}:${message.line} ${message.message}`);
    }
  }
}
patch += "*** End Patch";
if (patchMode) process.stdout.write(JSON.stringify({ changed, patch }));
else {
  console.log(
    `Scoped source review: ${files.length} files, ${changed} format differences, ${errors} lint errors.`,
  );
  if (changed || errors) process.exitCode = 1;
}
