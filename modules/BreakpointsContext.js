import React from 'react'
import createReactContext from 'create-react-context'

const BreakpointsContext = React.createContext
  ? React.createContext()
  : createReactContext()

const {
  Consumer,
  Provider,
} = BreakpointsContext

export {
  Provider,
  Consumer,
}
export default BreakpointsContext
