import { CHANGE_BREAKPOINT } from './action'

const breakpointsReducer = (state = 1, action) => {
  switch (action.type) {
    case CHANGE_BREAKPOINT:
      console.log('reducer fired bro', state)
      return action.payload
    default:
      return state
  }
}

export default breakpointsReducer