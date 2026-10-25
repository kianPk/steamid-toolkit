const BASE = 76561197960265728n;

export function isSteamId64(s: string): boolean {
  return /^7656\d{13}$/.test(s);
}

export function toSteamId64FromAccount(accountId: number): string {
  return (BASE + BigInt(accountId)).toString();
}

export function accountIdFromSteamId64(id64: string): number {
  if (!isSteamId64(id64)) throw new Error("invalid SteamID64");
  return Number(BigInt(id64) - BASE);
}

export function toSteamId3(id64: string): string {
  return `[U:1:${accountIdFromSteamId64(id64)}]`;
}

export function toSteamId(id64: string): string {
  const acc = accountIdFromSteamId64(id64);
  const y = acc % 2;
  const z = Math.floor(acc / 2);
  return `STEAM_1:${y}:${z}`;
}

/** Community profile URL for a SteamID64. */
export function profileUrl(id64: string): string {
  const normalized = isSteamId64(id64) ? id64 : parseAny(id64);
  return `https://steamcommunity.com/profiles/${normalized}`;
}

export function parseAny(input: string): string {
  const s = input.trim();
  if (isSteamId64(s)) return s;
  const id3 = s.match(/^\[U:1:(\d+)\]$/i);
  if (id3) return toSteamId64FromAccount(Number(id3[1]));
  const classic = s.match(/^STEAM_[0-5]:([01]):(\d+)$/i);
  if (classic) {
    const y = Number(classic[1]);
    const z = Number(classic[2]);
    return toSteamId64FromAccount(z * 2 + y);
  }
  throw new Error(`unrecognized SteamID: ${input}`);
}

export type SteamIdResult = {
  steamid64: string;
  steamid3: string;
  steamid: string;
  accountId: number;
  profileUrl: string;
};

export function convert(input: string): SteamIdResult {
  const id64 = parseAny(input);
  return {
    steamid64: id64,
    steamid3: toSteamId3(id64),
    steamid: toSteamId(id64),
    accountId: accountIdFromSteamId64(id64),
    profileUrl: profileUrl(id64)
  };
}
