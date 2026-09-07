export function isFocusInside(container: { contains(node: Node): boolean } | undefined, active: Node | null) {
  return !!container && !!active && container.contains(active)
}

export function shouldDropBlock(expand: boolean, hovered: boolean, focusInside: boolean) {
  return !expand && !hovered && !focusInside
}

export function shouldArmFromKey(key: string) {
  return key === "Enter" || key === " "
}

export function openChangePlan(input: { forceOpen: boolean; block: boolean; open: boolean; skipClick: boolean }) {
  const blocked = input.forceOpen || (input.block && input.open)
  return {
    resetSkipClick: !blocked && input.skipClick,
    applyOpen: !blocked && !input.skipClick,
  }
}
