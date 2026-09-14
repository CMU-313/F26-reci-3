import { TextAttributes } from "@opentui/core"
import { For } from "solid-js"
import { useTheme } from "../context/theme"
import { useDialog } from "../ui/dialog"
import { scotty } from "../logo"

export function DialogScotty() {
  const dialog = useDialog()
  const { theme } = useTheme()

  return (
    <box paddingLeft={2} paddingRight={2} gap={1}>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          Scotty
        </text>
        <text fg={theme.textMuted} onMouseUp={() => dialog.clear()}>
          esc
        </text>
      </box>
      <box>
        <For each={scotty}>
          {(line) => (
            <text fg={theme.text} selectable={false}>
              {line}
            </text>
          )}
        </For>
      </box>
      <box paddingBottom={1}>
        <text fg={theme.textMuted}>Go Tartans!</text>
      </box>
    </box>
  )
}
