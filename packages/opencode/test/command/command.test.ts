import { describe, expect } from "bun:test"
import { Effect } from "effect"
import { AppNodeBuilder } from "@opencode-ai/core/effect/app-node-builder"
import { TestConfig } from "../fixture/config"
import { Command } from "@/command"
import { testEffect } from "../lib/effect"
import { withTmpdirInstance } from "../fixture/fixture"

const it = testEffect(AppNodeBuilder.build(Command.node, [["@opencode-ai/core/config", TestConfig.layer()]]))

describe("Command", () => {
  it.effect("includes the built-in scotty slash command", () =>
    withTmpdirInstance()(Effect.gen(function* () {
      const command = yield* Command.Service
      const result = yield* command.list()
      const scotty = result.find((item) => item.name === "scotty")

      expect(scotty).toMatchObject({
        name: "scotty",
        description: "display a Scottish terrier",
      })
      expect(String(scotty?.template)).toContain("  /  _  _  _  \\")
    })),
  )
})
