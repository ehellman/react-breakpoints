import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import ReactBreakpoints from '../ReactBreakpoints'
import withBreakpoints from '../withBreakpoints'

// this test is currently failing, the WrappedComponent does not get access
// to the correct props. the issue here is with how the test is written
// not with the component. first to fix!

test('it gives correct props', () => {
  const breakpoints = {
    mobile: 320,
    tablet: 768,
    mid: 1000,
    desktop: 1023,
  }
  const Component = props => <div>data is {JSON.stringify(props)}</div>
  const WrappedComponent = withBreakpoints(Component)
  const dom = mount(
    <ReactBreakpoints breakpoints={breakpoints}>
      <WrappedComponent />
    </ReactBreakpoints>,
  )
  console.log(dom.html())
})
