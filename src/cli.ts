#!/usr/bin/env node
import { convert } from "./index.js";
import { createInterface } from "node:readline";

function usage(): never {
  console.error(`Usage: steamid [--compact] <id> [id...]
       steamid [--compact]   # read IDs from stdin (one per line)`);
  process.exit(1);
}

async function readStdinLines(): Promise<string[]> {
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  const lines: string[] = [];
  for await (const line of rl) {
    const t = line.trim();
    if (t) lines.push(t);
  }
  return lines;
}

const args = process.argv.slice(2);
const compact = args.includes("--compact");
const inputs = args.filter((a) => a !== "--compact" && a !== "--help" && a !== "-h");

if (args.includes("--help") || args.includes("-h")) usage();

let ids = inputs;
if (ids.length === 0) {
  if (process.stdin.isTTY) usage();
  ids = await readStdinLines();
  if (ids.length === 0) usage();
}

const fromStdin = inputs.length === 0;
const results = [];
for (const id of ids) {
  try {
    results.push(convert(id));
  } catch (e) {
    results.push({ input: id, error: e instanceof Error ? e.message : String(e) });
  }
}

const space = compact ? undefined : 2;
// Batch (multiple args or stdin) → JSON array; single CLI arg → object
const payload = !fromStdin && results.length === 1 ? results[0] : results;
console.log(JSON.stringify(payload, null, space));
