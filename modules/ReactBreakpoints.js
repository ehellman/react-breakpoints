import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import { em, stripUnit } from './utils'
import { Provider } from './BreakpointsContext'
import { ERRORS } from './messages'

class ReactBreakpoints extends React.Component {
  static defaultProps = {
    breakpointUnit: 'px',
    debounceResize: false,
    debounceDelay: 50,
    snapMode: true,
  }
  static propTypes = {
    /*
      @breakpoints
      Your breakpoints object.
     */
    breakpoints: PropTypes.objectOf(PropTypes.number),
    /*
      @breakpointUnit
      The type of unit that your breakpoints should use - px or em.
     */
    breakpointUnit: PropTypes.oneOf(['px', 'em']),
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
      If you don't want the resize listener to be debounced, set to false. Defaults to false
      when snapMode is true.
     */
    debounceResize: PropTypes.bool,
    /*
      @debounceDelay: number
      Set a custom delay for how long the debounce timeout should be.
     */
    debounceDelay: PropTypes.number,
    /*
      @snapMode
      Replaces breakpoints.current with screenWidth, disabling re-render only
      when breakpoint changes, instead potentially re-rendering when
      calculateCurrentBreakpoint returns a new value.
     */
    snapMode: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const { breakpoints, defaultBreakpoint, guessedBreakpoint } = this.props

    // throw Error if no breakpoints were passed
    if (!breakpoints) throw new Error(ERRORS.NO_BREAKPOINTS)
    // throw Error if breakpoints is not an object
    if (typeof breakpoints !== 'object') throw new Error(ERRORS.NOT_OBJECT)

    let currentBreakpoint = null

    // if we are on the client, we directly compote the breakpoint using window width
    if (global.window) {
      currentBreakpoint = this.calculateCurrentBreakpoint(
        this.convertScreenWidth(global.window.innerWidth),
      )
    } else if (guessedBreakpoint) {
      currentBreakpoint = this.calculateCurrentBreakpoint(guessedBreakpoint)
    } else if (defaultBreakpoint) {
      currentBreakpoint = this.calculateCurrentBreakpoint(defaultBreakpoint)
    }

    const screenWidth = global.window ? this.convertScreenWidth(global.window.innerWidth) : defaultBreakpoint;
    this.state = {
      breakpoints: breakpoints || {},
      // if we are on the client, we set the screen width to the window width,
      // otherwise, we use the default breakpoint
      screenWidth: screenWidth,
      currentBreakpoint: currentBreakpoint,
    }
  }

  convertScreenWidth(screenWidth) {
    const { breakpointUnit } = this.props;
    return breakpointUnit === 'em' ? stripUnit(em(screenWidth)) : screenWidth;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.readWidth() // initial width calculation

      if (this.props.debounceResize) {
        window.addEventListener(
          'resize',
          debounce(this.readWidth, this.props.debounceDelay),
        )
      } else {
        window.addEventListener('resize', this.readWidth)
      }
      window.addEventListener('orientationchange', this.readWidth)
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      if (this.props.debounceResize) {
        window.addEventListener(
          'resize',
          debounce(this.readWidth, this.props.debounceDelay),
        )
      } else {
        window.addEventListener('resize', this.readWidth)
      }
      window.removeEventListener('orientationchange', this.readWidth)
    }
  }
  calculateCurrentBreakpoint(screenWidth) {
    let currentBreakpoint = null
    const breakpointKeys = Object.keys(this.props.breakpoints)
    new Array(...breakpointKeys)
      .reverse() // reverse array to put largest breakpoint first
      .map(breakpoint => {
        const breakpointValue = this.props.breakpoints[breakpoint]
        if (!currentBreakpoint && screenWidth >= breakpointValue) {
          currentBreakpoint = breakpoint
        }
      })
    // If currentBreakpoint is null here, screenWidth is below lowest breakpoint,
    // so it will still be set to equal lowest breakpoint instead of null
    if (currentBreakpoint === null) {
      currentBreakpoint = breakpointKeys[0]
    }

    return currentBreakpoint
  }
  readWidth = event => {
    const { snapMode } = this.props
    const width = event
      ? event.target.innerWidth
        ? event.target.innerWidth
        : window.innerWidth
      : window.innerWidth
    let screenWidth = this.convertScreenWidth(width);
    const current = this.calculateCurrentBreakpoint(screenWidth)

    this.setState(state => {
      if (state.currentBreakpoint === current) return null
      return {
        currentBreakpoint: snapMode ? current : null,
        screenWidth: snapMode ? null : screenWidth,
      }
    })
  }
  getContextValues = () => ({
    breakpoints: {
      ...this.props.breakpoints,
    },
    ...(this.props.snapMode && {
      currentBreakpoint: this.state.currentBreakpoint,
    }),
    ...(!this.props.snapMode && {
      screenWidth: this.state.screenWidth,
    }),
  })
  render() {
    const { children } = this.props
    return (
      <Provider value={this.getContextValues()}>
        {children && children}
      </Provider>
    )
  }
}

export default ReactBreakpoints
