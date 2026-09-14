import { EOL } from "os"
import * as Effect from "effect/Effect"
import { scotty } from "@opencode-ai/tui/logo"
import { Commands } from "../commands"
import { Runtime } from "../../framework/runtime"

export default Runtime.handler(
  Commands.commands.scotty,
  Effect.fn("cli.scotty")(function* () {
    process.stdout.write(scotty.join(EOL) + EOL)
  }),
)
