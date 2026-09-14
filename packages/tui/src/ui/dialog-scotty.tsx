import { TextAttributes } from "@opentui/core"
import { For } from "solid-js"
import { useTheme } from "../context/theme"
import { useDialog } from "./dialog"
import { useBindings } from "../keymap"

const SCOTTY = [
  "              __",
  "      \\______/  \\",
  "      /  o  o    \\",
  "     (      ^     )",
  "      \\   wwwww  /",
  "      /|        |\\",
  "     (_|  \\__/  |_)",
  "       ||      ||",
  "      (_|      |_)",
]

export function DialogScotty() {
  const dialog = useDialog()
  const { theme } = useTheme()

  useBindings(() => ({
    bindings: [
      { key: "return", desc: "Close Scotty", group: "Dialog", cmd: () => dialog.clear() },
      { key: "escape", desc: "Close Scotty", group: "Dialog", cmd: () => dialog.clear() },
    ],
  }))

  return (
    <box paddingLeft={2} paddingRight={2} gap={1}>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          Scotty
        </text>
        <text fg={theme.textMuted} onMouseUp={() => dialog.clear()}>
          esc/enter
        </text>
      </box>
      <box paddingBottom={1}>
        <For each={SCOTTY}>
          {(line) => (
            <text fg={theme.text} wrapMode="none">
              {line}
            </text>
          )}
        </For>
      </box>
      <text fg={theme.textMuted}>Let's go Tartans!</text>
      <box flexDirection="row" justifyContent="flex-end" paddingBottom={1}>
        <box paddingLeft={3} paddingRight={3} backgroundColor={theme.primary} onMouseUp={() => dialog.clear()}>
          <text fg={theme.selectedListItemText}>ok</text>
        </box>
      </box>
    </box>
  )
}
