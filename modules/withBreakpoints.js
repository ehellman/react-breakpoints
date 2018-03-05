import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import BreakpointsContext from './BreakpointsContext'
import { Consumer } from './BreakpointsContext'


const withBreakpoints = Component => {
  const C = props => (
    <Consumer>
      {
        context => 
          <Component {...props} {...context}></Component>
      }
    </Consumer>
  )
  C.displayName = `withBreakpoints(${Component.displayName || Component.name})`
  return hoistStatics(C, Component)
} 

export default withBreakpoints