import { CHANGE_BREAKPOINT } from './action'

const createBreakpointsReducer = (guessedBreakpoint) => {
  const initialState = guessedBreakpoint ? guessedBreakpoint : 0
  return function breakpointsReducer(state = initialState, action) {
    switch (action.type) {
      case CHANGE_BREAKPOINT:
        return action.payload
      default:
        return state
    }
  }
}

export default createBreakpointsReducer