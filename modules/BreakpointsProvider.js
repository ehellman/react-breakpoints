import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from './BreakpointsContext'
import { ERRORS } from './messages'

class BreakpointsProvider extends React.Component {
  static contextTypes = {
    currentBreakpoint: PropTypes.number
  }
  static childContextTypes = {
    currentBreakpoint: PropTypes.number
  }
  static propTypes = {
    breakpoints: PropTypes.arrayOf(PropTypes.number),
    guessedBreakpoint: PropTypes.number
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      breakpoints: this.props.breakpoints || [],
      currentBreakpoint: this.props.guessedBreakpoint || 2
    }
  }
  getChildContext() {
    return {
      currentBreakpoint: this.state.currentBreakpoint
    }
  }
  componentWillMount() {
    if (!this.props.breakpoints || this.props.breakpoints.length <= 2) throw new Error(ERRORS.NO_BREAKPOINTS)
    this.props.breakpoints !== this.state.breakpoints && 
      this.setState({ breakpoints: this.props.breakpoints })
    if (window !== undefined) {
      window.addEventListener('resize', this.readWidth)
      window.addEventListener('load', this.readWidth)
    }
  }
  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.readWidth)
      window.removeEventListener('load', this.readWidth)
    }
  }
  readWidth = event => {
    let width = event.target.innerWidth
      ? event.target.innerWidth
      : window.innerWidth
    this.calculateBreakpoint(width)
  }
  calculateBreakpoint = width => {
    if (this.state.breakpoints.length > 2) {
      this.state.breakpoints.map((breakpoint, i) => {
        if (i == 0 && width < this.state.breakpoints[i + 1]) {
          this.state.currentBreakpoint != i && this.setState({ currentBreakpoint: i })
        }
        if (i >= 1 && i < this.state.breakpoints.length) {
          if (width >= this.state.breakpoints[i - 1] && width < this.state.breakpoints[i]) {
            this.state.currentBreakpoint != i - 1 && this.setState({ currentBreakpoint: i - 1 })
          }
        }
        if (i == this.state.breakpoints.length - 1) {
          if (width >= this.state.breakpoints[i]) {
            this.state.currentBreakpoint != i && this.setState({ currentBreakpoint: i })
          }
        }
      })
    }
  }
  render() {
    return (
      <Provider value={this.getChildContext()}>
        {this.props.children}
      </Provider>
    )
  }
}

export default BreakpointsProvider