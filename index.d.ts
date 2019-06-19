export interface ReactBreakpointsProps {
  /**
   * Your breakpoints object.
   */
  breakpoints: { [k: string]: number };
  /**
   * The type of unit that your breakpoints should use - px or em.
   */
  breakpointUnit?: 'px' | 'em';
  /**
   * When rendering on the server, you can do your own magic with for example UA
   * to guess which viewport width a user probably has.
   */
  guessedBreakpoint?: number;
  /**
   * In case you don't want to default to mobile on SSR and no guessedBreakpoint
   * is passed, use defaultBreakpoint to set your own value.
   */
  defaultBreakpoint?: number;
  /**
   * If you don't want the resize listener to be debounced, set to false. Defaults to false
   * when snapMode is true.
   */
  debounceResize?: boolean;
  /**
   * Set a custom delay for how long the debounce timeout should be.
   */
  debounceDelay?: number;
  /**
   * Replaces breakpoints.current with screenWidth, disabling re-render only
   * when breakpoint changes, instead potentially re-rendering when 
   * calculateCurrentBreakpoint returns a new value.
   */
  snapMode?: boolean;
}

/**
 * Pass in the keys of your breakpoints as K
 */
export interface WithBreakpointsProps<K> {
  breakpoints: { [key in K]: number };
  currentBreakpoint?: K;
  screenWidth?: number;
}

/**
 * HOC for providing breakpoints as props
 */
export declare function withBreakpoints<P = any>(C: React.ComponentType<P>): React.ComponentType<P>;

// Media Component unfortunately can't use Abstract types like in
// the withBreakPoints because it's type is React.Consumer and it only
// accepts 1 Abstract type for the props. So using generic types
// is the only sane solution for now.

/**
 * React Component providing breakpoints using Render Props
 */
export declare const Media: React.Consumer<{
  breakpoints: { [key: string]: number };
  currentBreakpoint?: string;
  screenWidth?: number;
}>;


declare const ReactBreakpoints: React.ComponentClass<ReactBreakpointsProps>;

export default ReactBreakpoints;