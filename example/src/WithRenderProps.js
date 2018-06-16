import React from 'react'
import { Media } from 'react-breakpoints'

const DummyComponent = ({ name }) => <div>{name}</div>

const WithRenderProps = props => {
  return (
    <div>
      <h3>With Render Props</h3>
      <Media>
        {({ breakpoints, currentBreakpoint }) => (
          <React.Fragment>
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
                color: 'rebeccapurple',
                ...(breakpoints[currentBreakpoint] < breakpoints.desktop && {
                  color: 'red',
                }),
              }}
            />
          </React.Fragment>
        )}
      </Media>
    </div>
  )
}

export default WithRenderProps
