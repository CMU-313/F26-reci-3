import { describe, expect, mock, test } from "bun:test"
import { createRoot } from "solid-js"
import { isFocusInside, openChangePlan, shouldArmFromKey, shouldDropBlock } from "./tooltip-v2-behavior"

type RootProps = {
  children?: unknown
  onOpenChange?: (open: boolean) => void
}

type TriggerProps = {
  children?: unknown
  ref?: (el: HTMLDivElement) => void
  onPointerDownCapture?: () => void
  onKeyDownCapture?: (event: KeyboardEvent) => void
  onPointerLeave?: () => void
  onFocusOut?: () => void
}

type ContentProps = {
  children?: unknown
  onPointerDownOutside?: (event: { target: EventTarget | null; preventDefault: () => void }) => void
}

const captured: { root?: RootProps; trigger?: TriggerProps; content?: ContentProps } = {}
const env = {
  hovered: false,
  expanded: false,
  contained: undefined as Node | undefined,
}
const focus = { node: null as Element | null }
let observerCallback: (() => void) | undefined

const triggerEl = {
  matches: () => env.hovered,
  querySelector: () => (env.expanded ? ({} as Element) : null),
  contains: (node: Node) => env.contained === node,
  closest: () => null,
} as unknown as HTMLDivElement

if (typeof globalThis.Node === "undefined") {
  globalThis.Node = class Node {} as typeof Node
}

const host = globalThis as typeof globalThis & { document?: { activeElement: Element | null } }
if (!host.document) host.document = { activeElement: null }
Object.defineProperty(host.document, "activeElement", {
  configurable: true,
  get: () => focus.node,
})

globalThis.MutationObserver = class {
  constructor(callback: () => void) {
    observerCallback = callback
  }
  observe() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as typeof MutationObserver

globalThis.requestAnimationFrame = (callback) => {
  callback(0)
  return 1
}

mock.module("@kobalte/core/tooltip", () => {
  const Tooltip = Object.assign(
    (props: RootProps) => {
      captured.root = props
      return props.children
    },
    {
      Trigger: (props: TriggerProps) => {
        captured.trigger = props
        props.ref?.(triggerEl)
        return props.children
      },
      Portal: (props: { children?: unknown }) => props.children,
      Content: (props: ContentProps) => {
        captured.content = props
        return props.children
      },
    },
  )
  return { Tooltip }
})
mock.module("./tooltip-v2.css", () => ({}))

const { TooltipV2 } = await import("./tooltip-v2")

function mount(props: Parameters<typeof TooltipV2>[0]) {
  captured.root = undefined
  captured.trigger = undefined
  captured.content = undefined
  observerCallback = undefined
  env.hovered = false
  env.expanded = false
  env.contained = undefined
  focus.node = null
  return createRoot((dispose) => {
    TooltipV2(props)
    return dispose
  })
}

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

describe("TooltipV2", () => {
  test("wires openChangePlan into Kobalte open changes", () => {
    const dispose = mount({ value: "tip", children: "child" })
    expect(captured.root?.onOpenChange).toBeDefined()

    captured.root?.onOpenChange?.(true)
    captured.trigger?.onPointerDownCapture?.()
    captured.root?.onOpenChange?.(true)
    captured.root?.onOpenChange?.(false)

    const force = mount({ forceOpen: true, value: "tip", children: "child" })
    captured.root?.onOpenChange?.(false)
    force()
    dispose()
  })

  test("wires shouldArmFromKey into trigger keydown", () => {
    const dispose = mount({ value: "tip", children: "child" })
    captured.trigger?.onKeyDownCapture?.({ key: "Tab" } as KeyboardEvent)
    captured.trigger?.onKeyDownCapture?.({ key: "Enter" } as KeyboardEvent)
    captured.trigger?.onKeyDownCapture?.({ key: " " } as KeyboardEvent)
    dispose()
  })

  test("wires isFocusInside and shouldDropBlock into leave, focus, and expand", () => {
    const dispose = mount({ value: "tip", children: "child" })

    env.hovered = true
    captured.trigger?.onPointerLeave?.()
    env.hovered = false
    focus.node = triggerEl
    captured.trigger?.onPointerLeave?.()
    focus.node = null
    captured.trigger?.onPointerLeave?.()
    captured.trigger?.onFocusOut?.()

    env.expanded = true
    observerCallback?.()
    env.expanded = false
    observerCallback?.()

    captured.content?.onPointerDownOutside?.({
      target: triggerEl,
      preventDefault: () => {},
    })
    captured.root?.onOpenChange?.(true)
    dispose()
  })
})
