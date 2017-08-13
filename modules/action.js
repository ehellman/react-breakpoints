export const CHANGE_BREAKPOINT = 'CHANGE_BREAKPOINT'

export const changeBreakpoint = (newBreakpoint) => {
  console.log('action fired')
  return {
    type: CHANGE_BREAKPOINT,
    payload: newBreakpoint
  }
}