
jest.mock('react-native-reanimated', () => {

  const View = require('react-native').View;

  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: (props) => <View {...props} />,
    createAnimatedComponent: (cb) => cb,
    Extrapolate: { CLAMP: jest.fn() },
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
    useSharedValue: jest.fn(),
    useDerivedValue: (a) => ({ value: a() }),
    useAnimatedScrollHandler: () => () => {},
    useAnimatedGestureHandler: ({onStart, onActive, onFinish}) => ({onStart, onActive, onFinish}),
    useAnimatedStyle: (cb) => cb(),
    useAnimatedRef: () => ({ current: null }),
    useAnimatedReaction: jest.fn(),
    useAnimatedProps: (cb) => cb(),
    withTiming: (toValue, _, cb) => {
      cb && cb(true);
      return toValue;
    },
    withSpring: (toValue, _, cb) => {
      cb && cb(true);
      return toValue;
    },
    withDecay: (_, cb) => {
      cb && cb(true);
      return 0;
    },
    withDelay: (_, animationValue) => {
      return animationValue;
    },
    withSequence: (..._animations) => {
      return 0;
    },
    withRepeat: (animation, _, __, cb) => {
      cb?.();
      return animation;
    },
    cancelAnimation: () => {},
    measure: () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    }),
    Easing: {
      linear: (cb) => cb(),
      ease: (cb) => cb(),
      quad: (cb) => cb(),
      cubic: (cb) => cb(),
      poly: (cb) => cb(),
      sin: (cb) => cb(),
      circle: (cb) => cb(),
      exp: (cb) => cb(),
      elastic: (cb) => cb(),
      back: (cb) => cb(),
      bounce: (cb) => cb(),
      bezier: () => ({ factory: (cb) => cb() }),
      bezierFn: (cb) => cb(),
      steps: (cb) => cb(),
      in: (cb) => cb(),
      out: (cb) => cb(),
      inOut: (cb) => cb(),
    },
    Extrapolation: {
      EXTEND: 'extend',
      CLAMP: 'clamp',
      IDENTITY: 'identity',
    },
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
  };
});

jest.mock('react-native-gesture-handler', () => {

  const View = require('react-native').View;
  const createGesture = () => {

    const gesture = {
      _onStart: undefined,
      _onUpdate: undefined,
      _onFinalize: undefined,
      onStart( cb ) {

        this._onStart = cb;
        return this;

      },
      onUpdate( cb ) {

        this._onUpdate = cb;
        return this;

      },
      onFinalize( cb ) {

        this._onFinalize = cb;
        return this;

      },
    };

    return gesture;

  };

  return {
    PanGestureHandler: ({onGestureEvent, children}) => (
      <View
        onResponderStart={( ...args ) => onGestureEvent.onStart?.( ...args )} 
        onResponderEnd={( ...args ) => onGestureEvent.onFinish?.( ...args )} 
        onResponderMove={( ...args ) => onGestureEvent.onActive?.( ...args )}
        testID="gestureContainer"
      >
        {children}
      </View>
    ),
    Gesture: {
      Pan: () => createGesture(),
    },
    GestureDetector: ({ gesture, children }) => (
      <View
        onResponderStart={( ...args ) => gesture?._onStart?.( ...args )}
        onResponderMove={( ...args ) => gesture?._onUpdate?.( ...args )}
        onResponderEnd={( ...args ) => gesture?._onFinalize?.( ...args )}
        testID="gestureContainer"
      >
        {children}
      </View>
    ),
    GestureHandlerRootView: ({ children, ...props }) => <View {...props}>{children}</View>,
    gestureHandlerRootHOC: (Component) => Component,
  };

});

jest.mock('./src/core/helpers/storage', () => ({
  clearProgressStorage: () => {},
  getProgressStorage: jest.fn(),
  setProgressStorage: jest.fn(),
}));

jest.mock('./src/components/Image/video', () => {

  const React = require('react');
  const { View } = require('react-native');

  return ( props ) => {
  
    const { onLoad, onLayout } = props;

    onLoad?.(10000);
    onLayout?.({ nativeEvent: { layout: { width: 100, height: 100 } } });

    return <View testID="storyVideo" />;
  };
});

jest.mock('@shopify/flash-list', () => {

  const React = require('react');
  const { ScrollView } = require('react-native');

  return {FlashList: ({ data, renderItem, ...props }) => {

    return (
      <ScrollView {...props}>
        {data.map(( item, index ) => renderItem({ item, index }))}
      </ScrollView>
    )

  }};

});