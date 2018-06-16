import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import BreakpointsContext from './BreakpointsContext'
import { Consumer } from './BreakpointsContext'

const withBreakpoints = Component => {
  // Remove conditional application of forwardRef in 4.0
  const C = React.forwardRef
    ? React.forwardRef((props, ref) => (
        <Consumer>
          {context => <Component {...props} ref={ref} {...context} />}
        </Consumer>
      ))
    : props => (
        <Consumer>{context => <Component {...props} {...context} />}</Consumer>
      )
  C.displayName = `withBreakpoints(${Component.displayName || Component.name})`
  return hoistStatics(C, Component)
}

export default withBreakpoints
