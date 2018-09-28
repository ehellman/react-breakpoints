import React from 'react'
import { shallow } from 'enzyme'
import ReactBreakpoints from '../ReactBreakpoints'

describe('<ReactBreakpoints />', function() {
  it('calculates breakpoint correctly', function() {
    var breakpoints = {
      mobile: 320,
      mobileLandscape: 480,
      tablet: 768,
      tabletLandscape: 1024,
      desktop: 1200,
      desktopWide: 1500,
      desktopHuge: 1920,
    }
    var wrapper = shallow(<ReactBreakpoints breakpoints={breakpoints} />)
    var instance = wrapper.instance()
    Object.keys(breakpoints).forEach(function(k) {
      var value = breakpoints[k]
      expect(instance.calculateCurrentBreakpoint(value + 1)).toEqual(k)
    })
  })

  it('breakpoints need not to be sorted', () => {
    var breakpoints = {
      mobileLandscape: 480,
      tabletLandscape: 1024,
      desktop: 1200,
      desktopHuge: 1920,
      desktopWide: 1500,
      tablet: 768,
      mobile: 320,
    }
    var wrapper = shallow(<ReactBreakpoints breakpoints={breakpoints} />)
    var instance = wrapper.instance()
    Object.keys(breakpoints).forEach(function(k) {
      var value = breakpoints[k]
      expect(instance.calculateCurrentBreakpoint(value + 1)).toEqual(k)
    })
  })
})
