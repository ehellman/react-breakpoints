# react-breakpoints [![npm](https://img.shields.io/npm/v/react-breakpoints.svg)](https://www.npmjs.com/package/react-breakpoints)

This library solves the problem that CSS media queries alone could not solve. Sometimes you want to create an application that looks a certain way on desktop and a certain way on mobile. Sometimes the components look too different for you to be able to just change the CSS, you have to make one component for desktop and another for mobile. This is bad, because the JavaScript for the hidden component is still running in the background even though you are not seeing it.

This library solves that.

`react-breakpoints` allows you to use the viewport width to load different components, opening up for building more complex responsive applications without suffering the performance problems of hidden desktop components on your mobile site and vice versa.

This library is not dependent on Redux, see documentation for instructions on how to use.

## Roadmap

**VERSION 1.1.0**
- [ ] Test that `guessedBreakpoint` prop from server side rendering works, make changes if needed.

**VERSION 1.2.0**
- [ ] Example project

**VERSION SOMEDAY**
- [ ] Work with just 1 or 2 breakpoints instead of a minimum of 3.

## Example
```js
add exampe with props.cubre > 3 <Comp/>
```
## Installation
`npm install --save react-breakpoints`

## Usage

First you need to include the `BreakpointsProvider` component in your component tree. It expects an array of **at least 3 numeric values** that will represent your breakpoints.

```js
// index.js
import App from './App'
import { BreakpointsProvider } from 'react-breakpoints'

const breakpoints = [
  320,
  375,
  768,
  992,
  1200,
  1560 
]

ReactDOM.render(
  <BreakpointsProvider breakpoints={breakpoints}>
    <App />
  </BreakpointsProvider>, 
  document.getElementById('root')
)
```

## Inside your components

When you want access to the current breakpoint inside a component you import the `withBreakpoints` function, wrapping your component when you export it. This will give you access to `props.currentBreakpoint` which updates whenever you resize your window or your device orientation changes.

```js
import { withBreakpoints } from 'react-breakpoints'

class Navigation extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.currentBreakpoint > 3
            ? <DesktopNavigation />
            : <TouchNavigation />
        }
      </div>
    )
  }
}

export default withBreakpoints(MyComponent)
```

It works the exact same way in stateless components, here is a more extensive example:

```js
import { withBreakpoints } from 'react-breakpoints'

const List = props => {
  let renderList
  if (props.currentBreakpoint <= 2) {
    renderList = <MobileList />
  }
  else if (props.currentBreakpoint >= 3 && props.currentBreakpoint <= 4) {
    renderList = <TabletList />
  }
  else if (props.currentBreakpoint >= 5) {
    renderList = <DesktopList />
  }
  return (
    <div>
      <label>Select from the list below:</label>
      {renderList}
    </div>
  )
}
  
export default withBreakpoints(ListComponent)
```

## Server side rendering
**WARNING:** This feature is experimental.

```js
// server.js

const breakpoints = [
  320,
  375,
  768,
  992,
  1200,
  1560 
]

const guessedBreakpoint = 0 // create your own logic to generate this number

const markup = renderToString(
  <BreakpointsProvider guessedBreakpoint={guessedBreakpoint} breakpoints={breakpoints}>
    <App/>
  <BreakpointsProvider />
)
```

## With ES7 decorators

```js
import { withBreakpoints } from 'react-breakpoints'

@withBreakpoints
class Navigation extends React.Component {
  render() {
    return this.props.currentBreakpoint > 3
      ? <DesktopNavigation />
      : <TouchNavigation />
  }
}
```