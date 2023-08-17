
import { BackHandler, Dimensions } from 'react-native';

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
    useAnimatedGestureHandler: () => () => {},
    useAnimatedStyle: (cb) => cb(),
    useAnimatedRef: () => ({ current: null }),
    useAnimatedReaction: (value, cb) => cb(value(), ''),
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
      cb();
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
  const ScrollView = require('react-native').ScrollView;

  return {
    GestureDetector: ({gesture, children}) => (
      <View
        onResponderStart={gesture.onStart} 
        onResponderEnd={gesture.onEnd} 
        onResponderMove={gesture.onUpdate}
        testID="gestureContainer"
      >
        {children}
      </View>
    ),
    ScrollView
  };

});