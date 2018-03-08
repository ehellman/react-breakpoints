<img src="rbp-logo.png" width="150" height="150" />

# react-breakpoints [![npm](https://img.shields.io/npm/v/react-breakpoints.svg)](https://www.npmjs.com/package/react-breakpoints)

This library solves the problem that CSS media queries alone could not solve. Sometimes you want to create an application that looks a certain way on desktop and a certain way on mobile. Sometimes the components look too different for you to be able to just change the CSS, you have to make one component for desktop and another for mobile. This is bad, because the JavaScript for the hidden component is still running in the background even though you are not seeing it.

This library solves that.

`react-breakpoints` allows you to use the viewport width to load different components, opening up for building more complex responsive applications without suffering the performance problems of hidden desktop components on your mobile site and vice versa.

This library is not dependent on Redux, see documentation for instructions on how to use.

Version 2.0.0 is a rewrite with the new context API that came in React `16.3.0`. A polyfill for older React versions is included in the library, so it is backwards compatible with `15.x.x` and `16.x.x`.

## Roadmap

**VERSION 3.0.0**
- [ ] Test that `guessedBreakpoint` prop from server side rendering works, make changes if needed.
- [ ] Example project
- [ ] `debounceOptions` object passdown if needed.

## Installation
`npm install --save react-breakpoints`

## Usage

First you need to include the `ReactBreakpoints` component in your component tree. It expects an object that will represent your breakpoints.

```js
// index.js
import App from './App'
import ReactBreakpoints from 'react-breakpoints'

const breakpoints = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920,
}

ReactDOM.render(
  <ReactBreakpoints breakpoints={breakpoints}>
    <App />
  </ReactBreakpoints>, 
  document.getElementById('root')
)
```

## Inside your components

When you want access to the current screen width inside a component you import the `withBreakpoints` function, wrapping your component when you export it. This will give you access to `props.screenWidth` which updates whenever you resize your window or your device orientation changes and `props.breakpoints` which is the original object which you supplied to the `ReactBreakpoints` component.

```js
import { withBreakpoints } from 'react-breakpoints'

class Navigation extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.screenWidth > this.props.breakpoints.desktop
            ? <DesktopNavigation />
            : <TouchNavigation />
        }
      </div>
    )
  }
}


export default withBreakpoints(Navigation)
```

It works the exact same way in stateless components, here is a more extensive example:

```js
import { withBreakpoints } from 'react-breakpoints'

const MyComponent = ({ screenWidth, breakpoints }) => {
  let renderList
  if (screenWidth < breakpoints.tablet) {
    renderList = <MobileList />
  }
  else if (screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop) {
    renderList = <TabletList />
  }
  else if (screenWidth >= breakpoints.desktop) {
    renderList = <DesktopList />
  }
  return (
    <div>
      <label>Select from the list below:</label>
      {renderList}
    </div>
  )
}
  
export default withBreakpoints(MyComponent)
```

## Server side rendering
**WARNING:** This feature is experimental.

```js
// server.js

import ReactBreakpoints from 'react-breakpoints'

const breakpoints = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920,
}

const guessedBreakpoint = breakpoints.mobile // create your own logic to generate this number

const markup = renderToString(
  <ReactBreakpoints 
    guessedBreakpoint={guessedBreakpoint} 
    breakpoints={breakpoints}
  >
    <App/>
  <ReactBreakpoints />
)
```

## With ES7 decorators

```js
import { withBreakpoints } from 'react-breakpoints'

@withBreakpoints
class Navigation extends React.Component {
  render() {
    return this.props.screenWidth > this.props.breakpoints.desktop
      ? <DesktopNavigation />
      : <TouchNavigation />
  }
}
```
## Options

### `debounceResize: bool` option
By default, this library does NOT debounce the `resize` listener. However, by passing the `debounceResize` prop to the `ReactBreakpoints` component it will be enabled with a default delay.

```js
ReactDOM.render(
  <ReactBreakpoints
    breakpoints={...}
    debounceResize={true}
  >
    <App />
  </ReactBreakpoints>  
  , document.getElementById('root')
)
```

### `debounceDelay: number[ms]` option
Set a custom delay in milliseconds for how the length of the debounce wait.

```js
ReactDOM.render(
  <ReactBreakpoints
    breakpoints={...}
    debounceResize={true}
    debounceDelay={100}
  >
    <App />
  </ReactBreakpoints>  
  , document.getElementById('root')
)
```

### `defaultBreakpoint: number` option
In case you always want to default to a certain breakpoint, say you're building a mobile-only application - you can pass the mobile breakpoint here.

```js

const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1025,
}

ReactDOM.render(
  <ReactBreakpoints
    breakpoints={breakpoints}
    defaultBreakpoint={breakpoints.mobile}
  >
    <App />
  </ReactBreakpoints>  
  , document.getElementById('root')
)
```