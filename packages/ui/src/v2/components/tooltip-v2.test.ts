import { describe, expect, mock, test } from "bun:test"

mock.module("@kobalte/core/tooltip", () => {
  const Tooltip = () => null
  Tooltip.Trigger = () => null
  Tooltip.Portal = () => null
  Tooltip.Content = () => null
  return { Tooltip }
})
mock.module("./tooltip-v2.css", () => ({}))

const { isFocusInside, openChangePlan, shouldArmFromKey, shouldDropBlock } = await import("./tooltip-v2")

describe("isFocusInside", () => {
  const child = {} as Node
  const other = {} as Node
  const container = { contains: (node: Node) => node === child }

  test("is false when the trigger is missing", () => {
    expect(isFocusInside(undefined, child)).toBe(false)
  })

  test("is false when nothing is focused", () => {
    expect(isFocusInside(container, null)).toBe(false)
  })

  test("is true only when focus is inside the trigger", () => {
    expect(isFocusInside(container, child)).toBe(true)
    expect(isFocusInside(container, other)).toBe(false)
  })
})

describe("shouldDropBlock", () => {
  test("unblocks only when not expanded, not hovered, and focus is outside", () => {
    expect(shouldDropBlock(false, false, false)).toBe(true)
  })

  test("keeps the block while a nested control is expanded", () => {
    expect(shouldDropBlock(true, false, false)).toBe(false)
  })

  test("keeps the block while the trigger is hovered", () => {
    expect(shouldDropBlock(false, true, false)).toBe(false)
  })

  test("keeps the block while focus is inside the trigger", () => {
    expect(shouldDropBlock(false, false, true)).toBe(false)
  })
})

describe("shouldArmFromKey", () => {
  test("arms on Enter and Space", () => {
    expect(shouldArmFromKey("Enter")).toBe(true)
    expect(shouldArmFromKey(" ")).toBe(true)
  })

  test("ignores other keys", () => {
    expect(shouldArmFromKey("Tab")).toBe(false)
    expect(shouldArmFromKey("Escape")).toBe(false)
    expect(shouldArmFromKey("a")).toBe(false)
  })
})

describe("openChangePlan", () => {
  test("applies the requested open state on a normal change", () => {
    expect(openChangePlan({ forceOpen: false, block: false, open: true, skipClick: false })).toEqual({
      resetSkipClick: false,
      applyOpen: true,
    })
  })

  test("ignores Kobalte while forceOpen is set, without consuming a trigger click", () => {
    expect(openChangePlan({ forceOpen: true, block: false, open: false, skipClick: true })).toEqual({
      resetSkipClick: false,
      applyOpen: false,
    })
  })

  test("does not open while blocked, without consuming a trigger click", () => {
    expect(openChangePlan({ forceOpen: false, block: true, open: true, skipClick: true })).toEqual({
      resetSkipClick: false,
      applyOpen: false,
    })
  })

  test("still allows a close while blocked", () => {
    expect(openChangePlan({ forceOpen: false, block: true, open: false, skipClick: false })).toEqual({
      resetSkipClick: false,
      applyOpen: true,
    })
  })

  test("consumes a click on the trigger and skips the open change", () => {
    expect(openChangePlan({ forceOpen: false, block: false, open: false, skipClick: true })).toEqual({
      resetSkipClick: true,
      applyOpen: false,
    })
  })
})
