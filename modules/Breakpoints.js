import React from 'react'
import { ERRORS } from './messages'

class Breakpoints extends React.Component {
  constructor() {
    super()
    this.state = {
      currentBreakpoint: null,
      breakpoints: []
    }
    this.calculateBreakpoint = this.calculateBreakpoint.bind(this)
  }
  componentWillMount() {
    if (!this.props.breakpoints || this.props.breakpoints.length <= 2) throw new Error(ERRORS.NO_BREAKPOINTS)
    this.setState({ breakpoints: this.props.breakpoints })
    window.addEventListener('resize', this.readWidth.bind(this))
    window.addEventListener('load', this.readWidth.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.readWidth.bind(this))
    window.removeEventListener('load', this.readWidth.bind(this))
  }
  readWidth(event) {
    let width = event.target.innerWidth
      ? event.target.innerWidth
      : window.innerWidth
    this.calculateBreakpoint(width)
  }
  calculateBreakpoint(width) {
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
    return React.cloneElement(this.props.children, { currentBreakpoint: this.state.currentBreakpoint })
  }
}



export default Breakpoints 