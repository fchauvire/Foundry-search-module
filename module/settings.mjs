import { MODULE_ID, SETTINGS } from "./constants.mjs";

export function registerSettings() {
  game.settings.register(MODULE_ID, SETTINGS.CASE_SENSITIVE, {
    name: "FULLSEARCH.SettingsCaseSensitiveName",
    hint: "FULLSEARCH.SettingsCaseSensitiveHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
}
