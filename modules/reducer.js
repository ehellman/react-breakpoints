import { CHANGE_BREAKPOINT } from './action'

const breakpointsReducer = (state = 1, action) => {
  switch (action.type) {
    case CHANGE_BREAKPOINT:
      return action.payload
    default:
      return state
  }
}

export default breakpointsReducer