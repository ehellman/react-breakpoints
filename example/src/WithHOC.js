import React from 'react'
import { withBreakpoints } from 'react-breakpoints'

const DummyComponent = ({ name }) => <div>{name}</div>

const WithHOC = ({ breakpoints, currentBreakpoint }) => {
  return (
    <div>
      <h3>With Render Props</h3>
      <h4>
        Your current breakpoint is{' '}
        <code>
          <pre>{currentBreakpoint}</pre>
        </code>
      </h4>
      {breakpoints[currentBreakpoint] > breakpoints.tablet ? (
        <div>Should only be seen on tablet and above :)</div>
      ) : (
        <div />
      )}
      <DummyComponent
        name={
          breakpoints[currentBreakpoint] < breakpoints.desktop
            ? 'Below desktop'
            : 'Above desktop'
        }
        style={{
          color: 'lime',
          ...(breakpoints[currentBreakpoint] < breakpoints.desktop && {
            color: 'red',
          }),
        }}
      />
    </div>
  )
}

export default withBreakpoints(WithHOC)
