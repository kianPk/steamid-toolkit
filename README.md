# SteamID Toolkit

Convert between **SteamID64**, **SteamID3**, and classic **SteamID** — CLI + library.

Built for YGuard admin tools where bans land as SteamID64 but some configs still want `STEAM_1:…`.

## Features

- Convert SteamID64 ↔ SteamID3 ↔ classic SteamID
- **Batch mode:** multiple args or stdin lines → JSON array
- `--compact` single-line JSON
- `profileUrl(id64)` → `https://steamcommunity.com/profiles/<id64>`

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release notes (current **1.1.0**).

```bash
npm i && npm run build
node dist/cli.js 76561198000000000
node dist/cli.js --compact STEAM_1:0:1 '[U:1:2]'
printf '76561198000000000\nSTEAM_1:1:1\n' | node dist/cli.js --compact
```

MIT · [@kianPk](https://github.com/kianPk)
