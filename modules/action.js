export const CHANGE_BREAKPOINT = 'CHANGE_BREAKPOINT'

export const changeBreakpoint = (newBreakpoint) => {
  return {
    type: CHANGE_BREAKPOINT,
    payload: newBreakpoint
  }
}