import React from 'react'
import PropTypes from 'prop-types'

const withBreakpoints = Component =>
  class withBreakpoints extends React.Component {
    static contextTypes = {
      currentBreakpoint: PropTypes.number
    }
    render() {
      return <Component {...this.props} {...this.context} />
    }
  }

export default withBreakpoints