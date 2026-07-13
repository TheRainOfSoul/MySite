import { test } from "node:test";
import assert from "node:assert/strict";
import { firstMeaningfulLine } from "./projects.js";

test("skips headings, badges, and images; returns first prose line", () => {
  const md = [
    "# My Project",
    "",
    "![badge](https://img)",
    "[![ci](https://a)](https://b)",
    "",
    "A small tool that **does** things and [links](http://x).",
  ].join("\n");
  assert.equal(firstMeaningfulLine(md), "A small tool that does things and links.");
});

test("returns empty string when nothing meaningful", () => {
  assert.equal(firstMeaningfulLine("# Only a title\n\n"), "");
});

test("truncates long lines to <=140 chars with ellipsis", () => {
  const long = "x".repeat(300);
  const out = firstMeaningfulLine(long);
  assert.ok(out.length <= 140);
  assert.ok(out.endsWith("…"));
});
