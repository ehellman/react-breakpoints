import React from 'react'
import { connect } from 'react-redux'
import { changeBreakpoint } from './action'
import PropTypes from 'prop-types'


class ConnectedBreakpoints extends React.Component {
  constructor() {
    super()
    this.calculateBreakpoint = this.calculateBreakpoint.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    nextProps.guessedBreakpoint && this.props.changeBreakpoint(this.props.guessedBreakpoint)
  }
  componentWillMount() {
    window.addEventListener('resize', this.readWidth.bind(this))
    window.addEventListener('load', this.readWidth.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.readWidth.bind(this))
    window.removeEventListener('load', this.readWidth.bind(this))
  }
  readWidth(event) {
    console.log('read width')
    let width = event.target.innerWidth
      ? event.target.innerWidth
      : window.innerWidth
    this.calculateBreakpoint(width)
  }
  calculateBreakpoint(width) {
    console.log('calculating breakpoint...')
    if (width < this.props.breakpoints[1]) {
      this.props.currentBreakpoint != 1 && this.props.changeBreakpoint(1)
    } else if (width >= this.props.breakpoints[0] && width < this.props.breakpoints[2]) {
      this.props.currentBreakpoint != 2 && this.props.changeBreakpoint(2)
    } else if (width >= this.props.breakpoints[1] && width < this.props.breakpoints[3]) {
      this.props.currentBreakpoint != 3 && this.props.changeBreakpoint(3)
    } else if (width >= this.props.breakpoints[2] && width < this.props.breakpoints[4]) {
      this.props.currentBreakpoint != 4 && this.props.changeBreakpoint(4)
    } else if (width >= this.props.breakpoints[3] && width < this.props.breakpoints[5]) {
      this.props.currentBreakpoint != 5 && this.props.changeBreakpoint(5)
    } else if (width >= this.props.breakpoints[4] && width > this.props.breakpoints[5]) {
      this.props.currentBreakpoint != 6 && this.props.changeBreakpoint(6)
    }
  }
  render() {
    return this.props.children
  }
}

ConnectedBreakpoints.PropTypes = {
  guessedBreakpoint: PropTypes.number,
  breakpoints: PropTypes.arrayOf(PropTypes.number)
}

const mapStateToProps = state => {
  return {
    currentBreakpoint: state.currentBreakpoint
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeBreakpoint: (newBreakpoint) => {
      dispatch(changeBreakpoint(newBreakpoint))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedBreakpoints)