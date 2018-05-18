import React from 'react'
import createReactContext from 'create-react-context'

const BreakpointsContext = React.createContext ?
  React.createContext() :
  createReactContext()

const {
  Provider,
  Consumer
} = BreakpointsContext

Provider.displayName = 'ReactBreakpoints.Provider'
Consumer.displayName = 'ReactBreakpoints.Consumer'

export {
  Provider,
  Consumer
}
export default BreakpointsContext