import React from 'react'

class Breakpoints extends React.Component {
  constructor() {
    super()
    this.state = {
      currentBreakpoint: null,
      width: null,
      breakpoints: []
    }
    this.calculateBreakpoint = this.calculateBreakpoint.bind(this)
    this.setBreakpoints = this.setBreakpoints.bind(this)
  }
  componentWillMount() {
    window.addEventListener('resize', this.updateWidth.bind(this))
    window.addEventListener('load', this.updateWidth.bind(this))
    !this.props.breakpoints && this.setState({ 
      breakpoints: [
        320,
        480,
        768,
        992,
        1200,
        1560 
      ]
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this))
    window.removeEventListener('load', this.updateWidth.bind(this))
  }
  setBreakpoints(breakpoints) {
    return this.props.breakpoints && this.setState({ breakpoints })
  }
  updateWidth(event) {
    let width = event.target.innerWidth
      ? event.target.innerWidth
      : window.innerWidth
    this.setState({ width })
    this.calculateBreakpoint(width)
  }
  calculateBreakpoint(width) {
    if (width < this.state.breakpoints[1]) {
      this.setState({ currentBreakpoint: 1 })
    } else if (width >= this.state.breakpoints[0] && width < this.state.breakpoints[2]) {
      this.setState({ currentBreakpoint: 2 })
    } else if (width >= this.state.breakpoints[1] && width < this.state.breakpoints[3]) {
      this.setState({ currentBreakpoint: 3 })
    } else if (width >= this.state.breakpoints[2] && width < this.state.breakpoints[4]) {
      this.setState({ currentBreakpoint: 4 })
    } else if (width >= this.state.breakpoints[3] && width < this.state.breakpoints[5]) {
      this.setState({ currentBreakpoint: 5 })
    } else if (width >= this.state.breakpoints[4] && width > this.state.breakpoints[5]) {
      this.setState({ currentBreakpoint: 6 })
    }
  }
  render() {
    return this.props.children
  }
}



export default Breakpoints 