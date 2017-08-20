import React from 'react'
import { connect } from 'react-redux'
import { changeBreakpoint } from './action'
import PropTypes from 'prop-types'
import { ERRORS } from './messages'


class ConnectedBreakpoints extends React.Component {
  constructor() {
    super()
    this.calculateBreakpoint = this.calculateBreakpoint.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    nextProps.guessedBreakpoint && this.props.changeBreakpoint(this.props.guessedBreakpoint)
  }
  componentWillMount() {
    if (!this.props.breakpoints || this.props.breakpoints.length <= 2) throw new Error(ERRORS.NO_CONNECTED_BREAKPOINTS)
    window.addEventListener('resize', this.readWidth.bind(this))
    window.addEventListener('load', this.readWidth.bind(this))
    window.addEventListener('orientationchange', this.readWidth.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.readWidth.bind(this))
    window.removeEventListener('load', this.readWidth.bind(this))
    window.removeEventListener('orientationchange', this.readWidth.bind(this))
  }
  readWidth(event) {
    let width = event.target.innerWidth
      ? event.target.innerWidth
      : window.innerWidth
    this.calculateBreakpoint(width)
  }
  calculateBreakpoint(width) {
    if (this.props.breakpoints.length > 2) {

      this.props.breakpoints.map((breakpoint, i) => {

        if (i == 0 && width < this.props.breakpoints[i + 1]) {
          this.props.currentBreakpoint != i && this.props.changeBreakpoint(i)
        }
        if (i >= 1 && i < this.props.breakpoints.length) {
          if (width >= this.props.breakpoints[i - 1] && width < this.props.breakpoints[i]) {
            this.props.currentBreakpoint != i - 1 && this.props.changeBreakpoint(i - 1) 
          }
        }
        if (i == this.props.breakpoints.length - 1) {
          if (width >= this.props.breakpoints[i]) {
            this.props.currentBreakpoint != i && this.props.changeBreakpoint(i) 
          }
        }
      })
    }
  }
  render() {
    return this.props.children
  }
}

ConnectedBreakpoints.PropTypes = {
  guessedBreakpoint: PropTypes.number,
  breakpoints: PropTypes.arrayOf(PropTypes.number).isRequired
}

const mapStateToProps = state => ({ currentBreakpoint: state.currentBreakpoint })

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeBreakpoint: (newBreakpoint) => {
      dispatch(changeBreakpoint(newBreakpoint))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedBreakpoints)