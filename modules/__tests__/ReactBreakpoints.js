import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import ReactBreakpoints from '../ReactBreakpoints'
import { Media } from '../index'

test('it renders without crashing', () => {
  const breakpoints = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
  }
  const root = document.createElement('div')
  ReactDOM.render(
    <ReactBreakpoints breakpoints={breakpoints}>
      <div>Hello world!</div>
    </ReactBreakpoints>,
    root,
  )
})

test('it takes breakpoints prop', () => {
  const breakpoints = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
  }
  const dom = mount(<ReactBreakpoints breakpoints={breakpoints} />)
  expect(dom.props().breakpoints).toEqual(breakpoints)
})

test('it renders correct breakpoint', () => {
  const breakpoints = {
    mobile: 320,
    tablet: 768,
    mid: 1000,
    desktop: 1023,
  }
  global.window.innerWidth = 999
  const message = 'success'
  const dom = mount(
    <ReactBreakpoints breakpoints={breakpoints}>
      <Media>
        {({ breakpoints, currentBreakpoint }) => {
          if (breakpoints[currentBreakpoint] >= breakpoints.tablet) {
            return <div>{message}</div>
          }
          return <div>fail</div>
        }}
      </Media>
    </ReactBreakpoints>,
  )
  expect(dom.find('div').text()).toEqual(message)
})
