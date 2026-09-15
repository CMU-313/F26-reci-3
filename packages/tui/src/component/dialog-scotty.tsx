import { TextAttributes } from "@opentui/core"
import { For } from "solid-js"
import { useTheme } from "../context/theme"
import { useDialog } from "../ui/dialog"

const SCOTTY = [
  "                 __---__",
  "              _-       -_",
  "            /              \\",
  "           |    O      O    |",
  "           |       __       |",
  "            \\     |__|     /",
  "         /```-.__________.-'```\\",
  "        /                        \\",
  "  _____/    CARNEGIE  MELLON       \\_____",
  " |                                        |",
  " |   __      __      __      __      __   |",
  "  \\_/  \\____/  \\____/  \\____/  \\____/  \\_/",
  "   |    |    |    |    |    |    |    |",
  "   |    |    |    |    |    |    |    |",
]

export function DialogScotty() {
  const { theme } = useTheme()
  const dialog = useDialog()

  dialog.setSize("large")

  return (
    <box paddingLeft={2} paddingRight={2} gap={1} paddingBottom={1}>
      <box flexDirection="row" justifyContent="space-between">
        <text fg={theme.text} attributes={TextAttributes.BOLD}>
          Scotty
        </text>
        <text fg={theme.textMuted} onMouseUp={() => dialog.clear()}>
          esc
        </text>
      </box>
      <box>
        <For each={SCOTTY}>
          {(line) => (
            <text fg={theme.text} wrapMode="none">
              {line}
            </text>
          )}
        </For>
      </box>
      <text fg={theme.textMuted}>Go Tartans!</text>
    </box>
  )
}