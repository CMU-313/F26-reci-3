import type { V2ColorValue } from "../types"
import { V2_AVATAR_DARK, V2_AVATAR_LIGHT } from "./avatar"

const ref = (name: string): V2ColorValue => `var(--${name})`

type Mode = "light" | "dark"
type TokenPair = { light: V2ColorValue; dark: V2ColorValue }


const agentTokens: Record<string, TokenPair> = {
  "v2-agent-plan-solid": {
    light: ref("v2-pink-800"),
    dark: ref("v2-pink-400"),
  },
  "v2-agent-plan-border": {
    light: "rgba(200, 61, 139, 0.20)",
    dark: "rgba(247, 153, 198, 0.20)",
  },
  "v2-agent-plan-background": {
    light: "rgba(253, 236, 243, 0.10)",
    dark: "rgba(170, 53, 118, 0.05)",
  },
  "v2-agent-build-solid": {
    light: ref("v2-blue-800"),
    dark: ref("v2-blue-300"),
  },
  "v2-agent-build-border": {
    light: "rgba(44, 71, 200, 0.20)",
    dark: "rgba(162, 188, 255, 0.20)",
  },
  "v2-agent-build-background": {
    light: "rgba(236, 241, 254, 0.10)",
    dark: "rgba(38, 63, 169, 0.05)",
  },
  "v2-agent-explore-solid": {
    light: ref("v2-yellow-900"),
    dark: ref("v2-yellow-300"),
  },
  "v2-agent-explore-border": {
    light: "rgba(203, 159, 52, 0.20)",
    dark: "rgba(243, 218, 155, 0.20)",
  },
  "v2-agent-explore-background": {
    light: "rgba(254, 250, 236, 0.1)",
    dark: "rgba(172, 136, 51, 0.05)",
  },
  "v2-agent-review-solid": {
    light: ref("v2-green-800"),
    dark: ref("v2-green-300"),
  },
  "v2-agent-writer-solid": {
    light: ref("v2-purple-700"),
    dark: ref("v2-purple-400"),
  },
}

//Core token dictionary mapping 
const coreTokens: Record<string, TokenPair> = {
  "v2-background-bg-base": {
    light: ref("v2-grey-100"),
    dark: ref("v2-grey-1000"),
  },
  "v2-background-bg-deep": {
    light: ref("v2-grey-200"),
    dark: ref("v2-grey-1100"),
  },
  "v2-background-bg-layer-01": {
    light: ref("v2-grey-300"),
    dark: ref("v2-grey-800"),
  },
  "v2-background-bg-layer-02": {
    light: ref("v2-grey-400"),
    dark: ref("v2-grey-600"),
  },
  "v2-background-bg-layer-03": {
    light: ref("v2-grey-500"),
    dark: ref("v2-grey-500"),
  },
  "v2-background-bg-layer-04": {
    light: ref("v2-grey-600"),
    dark: ref("v2-grey-400"),
  },
  "v2-background-bg-inverse": {
    light: ref("v2-grey-1000"),
    dark: ref("v2-grey-100"),
  },
  "v2-background-bg-contrast": {
    light: ref("v2-grey-900"),
    dark: ref("v2-grey-700"),
  },
  "v2-background-bg-button-neutral": {
    light: ref("v2-grey-100"),
    dark: ref("v2-alpha-light-6"),
  },
  "v2-background-bg-accent": {
    light: ref("v2-blue-600"),
    dark: ref("v2-blue-600"),
  },

  "v2-text-text-inverse": {
    light: ref("v2-grey-100"),
    dark: ref("v2-grey-1000"),
  },
  "v2-text-text-contrast": {
    light: ref("v2-grey-100"),
    dark: ref("v2-grey-100"),
  },
  "v2-text-text-accent": {
    light: ref("v2-blue-600"),
    dark: ref("v2-blue-400"),
  },
  "v2-text-text-accent-hover": {
    light: ref("v2-blue-700"),
    dark: ref("v2-blue-300"),
  },
  "v2-text-text-code-accent": {
    light: ref("v2-blue-900"),
    dark: ref("v2-blue-400"),
  },

  "v2-border-border-muted": {
    light: ref("v2-alpha-dark-8"),
    dark: ref("v2-alpha-light-8"),
  },
  "v2-border-border-base": {
    light: ref("v2-alpha-dark-10"),
    dark: ref("v2-alpha-light-10"),
  },
  "v2-border-border-strong": {
    light: ref("v2-alpha-dark-20"),
    dark: ref("v2-alpha-light-20"),
  },
  "v2-border-border-inverse": {
    light: ref("v2-grey-1000"),
    dark: ref("v2-grey-100"),
  },
  "v2-border-border-focus": {
    light: ref("v2-blue-500"),
    dark: ref("v2-blue-500"),
  },

  "v2-overlay-simple-overlay-hover": {
    light: ref("v2-alpha-dark-4"),
    dark: ref("v2-alpha-light-6"),
  },
  "v2-overlay-simple-overlay-pressed": {
    light: ref("v2-alpha-dark-8"),
    dark: ref("v2-alpha-light-10"),
  },
  "v2-overlay-simple-overlay-contrast-hover": {
    light: ref("v2-alpha-light-12"),
    dark: ref("v2-alpha-dark-24"),
  },
  "v2-overlay-simple-overlay-contrast-pressed": {
    light: ref("v2-alpha-light-24"),
    dark: ref("v2-alpha-dark-40"),
  },
  "v2-overlay-simple-overlay-scrim": {
    light: ref("v2-alpha-dark-40"),
    dark: ref("v2-alpha-dark-60"),
  },
  "v2-overlay-gradient-depth-overlay-depth-top": {
    light: ref("v2-alpha-light-100"),
    dark: ref("v2-alpha-light-100"),
  },
  "v2-overlay-gradient-depth-overlay-depth-bot": {
    light: ref("v2-alpha-light-0"),
    dark: ref("v2-alpha-light-0"),
  },
  "v2-overlay-simple-tab-active-scrim": {
    light: "#fafafa00",
    dark: "#24242400",
  },
  "v2-overlay-simple-tab-hover-scrim": {
    light: "#eeeeee00",
    dark: "#3a3a3a00",
  },
  "v2-overlay-simple-tab-scrim": {
    light: "#fafafa00",
    dark: "#08080800",
  },

  "v2-state-bg-success": {
    light: ref("v2-green-100"),
    dark: ref("v2-green-1200"),
  },
  "v2-state-fg-success": {
    light: ref("v2-green-800"),
    dark: ref("v2-green-500"),
  },
  "v2-state-border-success": {
    light: ref("v2-green-300"),
    dark: ref("v2-green-900"),
  },
  "v2-state-bg-warning": {
    light: ref("v2-yellow-100"),
    dark: ref("v2-yellow-1200"),
  },
  "v2-state-fg-warning": {
    light: ref("v2-yellow-800"),
    dark: ref("v2-yellow-500"),
  },
  "v2-state-border-warning": {
    light: ref("v2-yellow-300"),
    dark: ref("v2-yellow-900"),
  },
  "v2-state-bg-danger": {
    light: ref("v2-red-100"),
    dark: ref("v2-red-1200"),
  },
  "v2-state-fg-danger": {
    light: ref("v2-red-800"),
    dark: ref("v2-red-500"),
  },
  "v2-state-border-danger": {
    light: ref("v2-red-300"),
    dark: ref("v2-red-900"),
  },
  "v2-state-bg-info": {
    light: ref("v2-blue-100"),
    dark: ref("v2-blue-1200"),
  },
  "v2-state-fg-info": {
    light: ref("v2-blue-800"),
    dark: ref("v2-blue-500"),
  },
  "v2-state-border-info": {
    light: ref("v2-blue-300"),
    dark: ref("v2-blue-900"),
  },

  "v2-elevation-raised": {
    light:
      "0px 2px 4px 0px var(--v2-alpha-dark-4), 0px 1px 2px -1px var(--v2-alpha-dark-8), 0px 0px 0px 0.5px var(--v2-alpha-dark-12), 0px 0px 0px 0px var(--v2-alpha-dark-0)",
    dark:
      "0px 2px 4px 0px var(--v2-alpha-dark-30), 0px 1px 2px 0px var(--v2-alpha-dark-30), 0px 0px 0px 0.5px var(--v2-alpha-light-16), 0px -0.5px 0px 0px var(--v2-alpha-light-6)",
  },
  "v2-elevation-floating": {
    light:
      "0px 8px 16px 0px var(--v2-alpha-dark-4), 0px 4px 8px 0px var(--v2-alpha-dark-8), 0px 0px 0px 0.5px var(--v2-alpha-dark-12), 0px 0px 0px 0px var(--v2-alpha-dark-0)",
    dark:
      "0px 8px 16px 0px var(--v2-alpha-dark-30), 0px 4px 8px 0px var(--v2-alpha-dark-30), 0px 0px 0px 0.5px var(--v2-alpha-light-16), 0px -0.5px 0px 0px var(--v2-alpha-light-6)",
  },
  "v2-elevation-overlay": {
    light:
      "0px 16px 32px 0px var(--v2-alpha-dark-4), 0px 8px 16px 0px var(--v2-alpha-dark-8), 0px 0px 0px 0.5px var(--v2-alpha-dark-12), 0px 0px 0px 0px var(--v2-alpha-dark-0)",
    dark:
      "0px 16px 32px 0px var(--v2-alpha-dark-30), 0px 8px 16px 0px var(--v2-alpha-dark-30), 0px 0px 0px 0.5px var(--v2-alpha-light-16), 0px -0.5px 0px 0px var(--v2-alpha-light-6)",
  },
  "v2-elevation-button-neutral": {
    light:
      "0px 1px 1.5px 0px var(--v2-alpha-dark-10), 0px 0px 0px 0.5px var(--v2-alpha-dark-14), 0px 0px 0px 0px var(--v2-alpha-dark-0)",
    dark:
      "0px 1px 2px 0px var(--v2-alpha-dark-40), 0px 0px 0px 0.5px var(--v2-alpha-light-20), 0px -0.5px 0px 0px var(--v2-alpha-light-10)",
  },
  "v2-elevation-button-contrast": {
    light:
      "0px 1px 1.5px 0px var(--v2-alpha-dark-20), 0px 0px 0px 0.5px var(--v2-grey-800), inset 0px 1px 2px 0px var(--v2-alpha-light-14), inset 0px -1px 2px 0px var(--v2-alpha-dark-6), 0px 0px 0px 0px var(--v2-alpha-dark-0)",
    dark:
      "0px 1px 2px 0px var(--v2-alpha-dark-40), 0px 0px 0px 0.5px var(--v2-alpha-light-40), inset 0px 0px 0px 0px var(--v2-alpha-light-0), inset 0px 0px 0px 0px var(--v2-alpha-light-0), 0px -0.5px 0px 0px var(--v2-alpha-light-30)",
  },
  "v2-elevation-elements": {
    light: "0px 0.5px 0.5px 0px var(--v2-alpha-dark-40)",
    dark: "0px 0.5px 0.5px 0px var(--v2-alpha-dark-40)",
  },
  "v2-elevation-switch-off": {
    light:
      "inset 0px 1px 1px 0px var(--v2-alpha-dark-8), inset 0px 0.5px 0.5px 0px var(--v2-alpha-dark-8), inset 0px 0px 0px 0.5px var(--v2-alpha-dark-10)",
    dark:
      "inset 0px -0.5px 0px 0px var(--v2-alpha-light-10), inset 0px 0px 0px 0px var(--v2-alpha-light-0), inset 0px 0px 0px 0.5px var(--v2-alpha-light-16)",
  },
  "v2-elevation-switch-on": {
    light:
      "inset 0px 2px 2px 0px var(--v2-alpha-dark-10), inset 0px 1px 1px 0px var(--v2-alpha-dark-10), inset 0px 0px 0px 0.5px var(--v2-alpha-dark-20)",
    dark:
      "inset 0px -0.5px 0px 0px var(--v2-alpha-light-10), inset 0px 0px 0px 0px var(--v2-alpha-light-0), inset 0px 0px 0px 0.5px var(--v2-alpha-light-16)",
  },

  "v2-illustration-illustration-layer-01": {
    light: ref("v2-grey-300"),
    dark: ref("v2-grey-900"),
  },
  "v2-illustration-illustration-layer-02": {
    light: ref("v2-grey-400"),
    dark: ref("v2-grey-800"),
  },
  "v2-illustration-illustration-layer-03": {
    light: ref("v2-grey-500"),
    dark: ref("v2-grey-700"),
  },
}

function resolveMode(table: Record<string, TokenPair>, mode: Mode): Record<string, V2ColorValue> {
  return Object.fromEntries(Object.entries(table).map(([key, pair]) => [key, pair[mode]]))
}

const light: Record<string, V2ColorValue> = {
  ...resolveMode(coreTokens, "light"),
  ...resolveMode(agentTokens, "light"),
  ...V2_AVATAR_LIGHT,
}

const dark: Record<string, V2ColorValue> = {
  ...resolveMode(coreTokens, "dark"),
  ...resolveMode(agentTokens, "dark"),
  ...V2_AVATAR_DARK,
}

export function mapV2Semantics(isDark: boolean): Record<string, V2ColorValue> {
  return isDark ? dark : light
}

export function mergeV2Tokens(...layers: Record<string, V2ColorValue>[]): Record<string, V2ColorValue> {
  return Object.assign({}, ...layers)
}
