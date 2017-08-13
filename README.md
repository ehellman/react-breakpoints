# react-breakpoints
This library allows you to use the viewport width to load different components, opening up for building more complex responsive applications without worrying too much about the performance of hidden desktop components on your mobile site.

It is still under development with `1.0.0` being the next milestone, it will include:
- Accepting `guessedBreakpoint` prop from server.
- Being able to handle a breakpoint array of varied length (now only supports 6) by rewriting the `calculateBreakpoint` method.
- A fully featured `Breakpoints` component that works without Redux.

## Example
```
const Navigation = props => (
  {
    props.currentBreakpoint >= 3
      ? <DesktopNavigation />
      : <MobileNavigation />
  }
)

const mapStateToProps = state => {
  return {
    currentBreakpoint: state.currentBreakpoint
  }
}
export default connect(mapStateToProps)(Navigation)
```

## Installation
`npm install --save react-breakpoints`

## Usage

```
// index.js

import { ConnectedBreakpoints } from 'react-breakpoints'

const breakpoints = [
  320,
  480,
  768,
  992,
  1200,
  1560 
]

ReactDOM.render(
  <Provider store={store}>
    <ConnectedBreakpoints breakpoints={breakpoints}> 
      <App />
    </ConnectedBreakpoints> 
  </Provider>,
  document.getElementById('root')
)


// reducer.js

import { combineReducers } from 'redux'
import { breakpointsReducer } from 'react-breakpoints'

export default combineReducers({
  currentBreakpoint: breakpointsReducer
})
```