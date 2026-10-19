#!/usr/bin/env node
import { parseAny, toSteamId, toSteamId3, toSteamId64FromAccount, accountIdFromSteamId64 } from "./index.js";

const input = process.argv[2];
if (!input) {
  console.error("Usage: steamid <SteamID64|SteamID3|STEAM_1:x:y>");
  process.exit(1);
}
const id64 = parseAny(input);
console.log(JSON.stringify({
  steamid64: id64,
  steamid3: toSteamId3(id64),
  steamid: toSteamId(id64),
  accountId: accountIdFromSteamId64(id64)
}, null, 2));
