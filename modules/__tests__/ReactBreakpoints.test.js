import React from 'react'
import { shallow } from 'enzyme'
import ReactBreakpoints from '../ReactBreakpoints'

describe('<ReactBreakpoints />', function() {
  it('sorts breakpoints once', () => {
    const breakpoints = {
      mobile: 320,
      desktopHuge: 1920,
    }
    const spy = jest.fn(ReactBreakpoints.sortBreakpoints)
    ReactBreakpoints.sortBreakpoints = spy
    const wrapper = shallow(<ReactBreakpoints breakpoints={breakpoints} />)
    const instance = wrapper.instance()
    // call readWidth, the event listener, multiple times
    for (let i = 0; i < 5; i++) {
      instance.calculateCurrentBreakpoint(320 * i)
    }
    expect(spy.mock.calls.length).toBe(1)
  })
  it('calculates breakpoint correctly', function() {
    const breakpoints = {
      mobile: 320,
      mobileLandscape: 480,
      tablet: 768,
      tabletLandscape: 1024,
      desktop: 1200,
      desktopWide: 1500,
      desktopHuge: 1920,
    }
    const wrapper = shallow(<ReactBreakpoints breakpoints={breakpoints} />)
    const instance = wrapper.instance()
    Object.keys(breakpoints).forEach(function(k) {
      const value = breakpoints[k]
      expect(instance.calculateCurrentBreakpoint(value + 1)).toEqual(k)
    })
  })

  it('breakpoints need not to be sorted', () => {
    const breakpoints = {
      mobileLandscape: 480,
      tabletLandscape: 1024,
      desktop: 1200,
      desktopHuge: 1920,
      desktopWide: 1500,
      tablet: 768,
      mobile: 320,
    }
    const wrapper = shallow(<ReactBreakpoints breakpoints={breakpoints} />)
    const instance = wrapper.instance()
    Object.keys(breakpoints).forEach(function(k) {
      const value = breakpoints[k]
      expect(instance.calculateCurrentBreakpoint(value + 1)).toEqual(k)
    })
  })
})
