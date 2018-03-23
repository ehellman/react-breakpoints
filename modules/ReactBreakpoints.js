import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { Provider } from './BreakpointsContext'
import { ERRORS } from './messages'

class ReactBreakpoints extends React.Component {
  static contextTypes = {
    screenWidth: PropTypes.number,
    breakpoints: PropTypes.objectOf(PropTypes.number),
  }
  static childContextTypes = {
    screenWidth: PropTypes.number,
    breakpoints: PropTypes.objectOf(PropTypes.number),
  }
  static defaultProps = {
    debounceResize: true,
    debounceDelay: 50,
  }
  static propTypes = {
    /*
      @breakpoints
      Your breakpoints object.
     */
    breakpoints: PropTypes.objectOf(PropTypes.number),
    /*
      @guessedBreakpoint
      When rendering on the server, you can do your own magic with for example UA
      to guess which viewport width a user probably has.
     */
    guessedBreakpoint: PropTypes.number, // from server
    /*
      @defaultBreakpoint
      In case you don't want to default to mobile on SSR and no guessedBreakpoint
      is passed, use defaultBreakpoint to set your own value.
     */
    defaultBreakpoint: PropTypes.number,
    /*
      @debounceResize
      If you don't want the resize listener to be debounced, set to false.
     */
    debounceResize: PropTypes.bool,
    /*
      @debounceDelay
      Set a custom delay for how long the debounce timeout should be.
     */
    debounceDelay: PropTypes.number,
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      screenWidth: this.props.guessedBreakpoint || this.props.defaultBreakpoint,
      breakpoints: this.props.breakpoints || {},
    }
  }
  getChildContext() {
    return {
      breakpoints: {
        ...this.state.breakpoints,
      },
      screenWidth: this.state.screenWidth,
    }
  }
  componentWillMount() {
    if (!this.props.breakpoints) throw new Error(ERRORS.NO_BREAKPOINTS)
    if (typeof this.props.breakpoints !== 'object') throw new Error(ERRORS.NOT_OBJECT)
    this.props.breakpoints !== this.state.breakpoints && 
      this.setState({ breakpoints: this.props.breakpoints })
    if (typeof window !== undefined) {
      if (this.props.debounceResize) {
        window.addEventListener('resize', debounce(this.readWidth, this.props.debounceDelay))
      } else {
        window.addEventListener('resize', this.readWidth)        
      }
      window.addEventListener('orientationchange', this.readWidth)
      window.addEventListener('load', this.readWidth)
    }

  }
  componentWillUnmount() {
    if (typeof window !== undefined) {
      if (this.props.debounceResize) {
        window.addEventListener('resize', debounce(this.readWidth, this.props.debounceDelay))
      } else {
        window.addEventListener('resize', this.readWidth)        
      }
      window.removeEventListener('orientationchange', this.readWidth)
      window.removeEventListener('load', this.readWidth)
    }
  }
  readWidth = event => {
    this.setState({
      screenWidth: event.target.innerWidth
        ? event.target.innerWidth
        : window.innerWidth
    })
  }
  render() {
    const {
      children
    } = this.props
    return (
      <Provider value={this.getChildContext()}>
        {children ? React.Children.only(children) : null}
      </Provider>
    )
  }
}

export default ReactBreakpoints