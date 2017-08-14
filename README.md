# react-breakpoints

This library contains a component that solves the problem that CSS alone could not solve. Sometimes you want to create an application that looks a certain way on desktop and a certain way on mobile. Sometimes they look too different for you to be able to just style the component, you have to make one component for desktop and another for mobile. This is bad, because the JavaScript is still running for the desktop component on mobile, even if you are not seeing it.

This library solves that.

`react-breakpoints` allows you to use the viewport width to load different components, opening up for building more complex responsive applications without worrying too much about the performance of hidden desktop components on your mobile site and vice versa.

It is still under development with `1.0.0` being the next milestone, it will include:
- Accepting `guessedBreakpoint` prop from server.
- Being able to handle a breakpoint array of varied length (now only supports 6) by rewriting the `calculateBreakpoint` method.
- A fully featured `Breakpoints` component that works without Redux.

## Example
```js
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

```js
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
