import React, {
  forwardRef, memo, useEffect, useImperativeHandle, useState,
} from 'react';
import { GestureResponderEvent, Modal, Pressable } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation, interpolate, runOnJS, useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue, useSharedValue, withTiming,
} from 'react-native-reanimated';
import {
  HEIGHT, LONG_PRESS_DURATION, STORY_ANIMATION_DURATION, WIDTH,
} from '../../core/constants';
import { GestureContext, StoryModalProps, StoryModalPublicMethods } from '../../core/dto/componentsDTO';
import StoryList from '../List';
import ModalStyles from './Modal.styles';

const StoryModal = forwardRef<StoryModalPublicMethods, StoryModalProps>( ( {
  stories, seenStories, duration, videoDuration, storyAvatarSize, textStyle, containerStyle,
  backgroundColor, videoProps, closeIconColor, modalAnimationDuration = STORY_ANIMATION_DURATION,
  storyAnimationDuration = STORY_ANIMATION_DURATION, hideElementsOnLongPress, loopingStories = 'none',
  statusBarTranslucent, loaderColor, loaderBackgroundColor, onLoad, onShow, onHide,
  onSeenStoriesChange, onSwipeUp, onStoryStart, onStoryEnd, footerComponent, ...props
}, ref ) => {

  const [ visible, setVisible ] = useState( false );

  const x = useSharedValue( 0 );
  const y = useSharedValue( HEIGHT );
  const animation = useSharedValue( 0 );
  const currentStory = useSharedValue( stories[0]?.stories[0]?.id );
  const paused = useSharedValue( false );
  const durationValue = useSharedValue( duration );
  const isLongPress = useSharedValue( false );
  const hideElements = useSharedValue( false );
  const lastViewed = useSharedValue<{ [key: string]:number }>( {} );
  const firstRender = useSharedValue( true );

  const userIndex = useDerivedValue( () => Math.round( x.value / WIDTH ) );
  const storyIndex = useDerivedValue( () => stories[userIndex.value]?.stories.findIndex(
    ( story ) => story.id === currentStory.value,
  ) );
  const userId = useDerivedValue( () => stories[userIndex.value]?.id );
  const previousUserId = useDerivedValue( () => stories[userIndex.value - 1]?.id );
  const nextUserId = useDerivedValue( () => stories[userIndex.value + 1]?.id );
  const previousStory = useDerivedValue( () => ( storyIndex.value !== undefined
    ? stories[userIndex.value]?.stories[storyIndex.value - 1]?.id
    : undefined ) );
  const nextStory = useDerivedValue( () => ( storyIndex.value !== undefined
    ? stories[userIndex.value]?.stories[storyIndex.value + 1]?.id
    : undefined ) );

  const animatedStyles = useAnimatedStyle( () => ( { top: y.value } ) );
  const backgroundAnimatedStyles = useAnimatedStyle( () => ( {
    opacity: interpolate( y.value, [ 0, HEIGHT ], [ 1, 0 ] ),
    backgroundColor,
  } ) );

  const gestureContext = useSharedValue<GestureContext>( {
    x: 0,
    pressedX: 0,
    pressedAt: 0,
    moving: false,
    vertical: false,
    userId: undefined,
  } );

  const onClose = () => {

    'worklet';

    y.value = withTiming(
      HEIGHT,
      { duration: modalAnimationDuration },
      () => runOnJS( setVisible )( false ),
    );
    lastViewed.value = {};
    cancelAnimation( animation );

  };

  const stopAnimation = () => {

    'worklet';

    cancelAnimation( animation );

  };

  const startAnimation = ( resume = false, newDuration?: number ) => {

    'worklet';

    if ( newDuration ) {

      durationValue.value = newDuration;

    } else {

      newDuration = durationValue.value;

    }

    if ( resume ) {

      newDuration -= animation.value * newDuration;

    } else {

      animation.value = 0;

      if ( userId.value !== undefined && currentStory.value !== undefined ) {

        runOnJS( onSeenStoriesChange )( userId.value, currentStory.value );

      }

      if ( userId.value !== undefined && storyIndex.value! >= 0 ) {

        lastViewed.value = { ...lastViewed.value, [userId.value]: storyIndex.value ?? 0 };

      }

    }

    animation.value = withTiming( 1, { duration: newDuration } );

  };

  const scrollTo = (
    id: string,
    animated = true,
    sameUser = false,
    previousUser?: string,
    index?: number,
  ) => {

    'worklet';

    const newUserIndex = stories.findIndex( ( story ) => story.id === id );
    const newX = newUserIndex * WIDTH;

    x.value = animated ? withTiming( newX, { duration: storyAnimationDuration } ) : newX;

    if ( sameUser ) {

      startAnimation( true );

      return;

    }

    if ( onStoryEnd && animated ) {

      runOnJS( onStoryEnd )( previousUser ?? userId.value, currentStory.value );

    }

    const newStoryIndex = lastViewed.value[id] !== undefined
      ? lastViewed.value[id]!
      : ( ( stories[newUserIndex]?.stories.findIndex(
        ( story ) => story.id === seenStories.value[id],
      ) ?? 0 ) + 1 );
    const userStories = stories[newUserIndex]?.stories;
    const newStory = userStories?.[index ?? newStoryIndex]?.id ?? userStories?.[0]?.id;
    currentStory.value = newStory;

    if ( onStoryStart ) {

      runOnJS( onStoryStart )( id, newStory );

    }

  };

  const toNextStory = ( value = true ) => {

    'worklet';

    if ( !value ) {

      return;

    }

    if ( !nextStory.value ) {

      if ( nextUserId.value ) {

        scrollTo( nextUserId.value );

      } else if ( stories[0]?.id && loopingStories === 'all' ) {

        scrollTo( stories[0].id, false );

      } else if ( userId.value && loopingStories === 'onlyLast' ) {

        scrollTo( userId.value, false, undefined, undefined, 0 );

      } else {

        onClose();

      }

    } else {

      if ( onStoryEnd ) {

        runOnJS( onStoryEnd )( userId.value, currentStory.value );

      }

      if ( onStoryStart ) {

        runOnJS( onStoryStart )( userId.value, nextStory.value );

      }

      animation.value = 0;
      currentStory.value = nextStory.value;

    }

  };

  const toPreviousStory = () => {

    'worklet';

    if ( !previousStory.value ) {

      if ( previousUserId.value ) {

        scrollTo( previousUserId.value );

      } else {

        return false;

      }

    } else {

      if ( onStoryEnd ) {

        runOnJS( onStoryEnd )( userId.value, currentStory.value );

      }

      if ( onStoryStart ) {

        runOnJS( onStoryStart )( userId.value, previousStory.value );

      }

      animation.value = 0;
      currentStory.value = previousStory.value;

    }

    return true;

  };

  const show = ( id: string ) => {

    setVisible( true );
    scrollTo( id, false );

  };

  const onGestureEvent = Gesture.Pan()
    .onStart ( _ => {

      gestureContext.value.x = x.value;
      gestureContext.value.userId = userId.value;
      paused.value = true;

    } )
    .onUpdate ( e => {

      if ( gestureContext.value.x === x.value
        && ( gestureContext.value.vertical || ( Math.abs( e.velocityX ) < Math.abs( e.velocityY ) ) ) ) {

        gestureContext.value.vertical = true;
        y.value = e.translationY / 2;

      } else {

        gestureContext.value.moving = true;
        x.value = Math.max(
          0,
          Math.min( gestureContext.value.x + -e.translationX, WIDTH * ( stories.length - 1 ) ),
        );

      }

    } )
    .onFinalize ( e => {

      if ( gestureContext.value.vertical ) {

        if ( e.translationY > 100 ) {

          onClose();

        } else {

          if ( e.translationY < -100 && onSwipeUp ) {

            runOnJS( onSwipeUp )(
              stories[userIndex.value]?.id,
              stories[userIndex.value]?.stories[storyIndex.value ?? 0]?.id,
            );

          }

          y.value = withTiming( 0 );
          startAnimation( true );

        }

      } else if ( gestureContext.value.moving ) {

        const diff = x.value - gestureContext.value.x;
        let newX;

        if ( Math.abs( diff ) < WIDTH / 4 ) {

          newX = gestureContext.value.x;

        } else {

          newX = diff > 0
            ? Math.ceil( x.value / WIDTH ) * WIDTH
            : Math.floor( x.value / WIDTH ) * WIDTH;

        }

        const newUserId = stories[Math.round( newX / WIDTH )]?.id;
        if ( newUserId !== undefined ) {

          scrollTo(
            newUserId,
            true,
            newUserId === gestureContext.value.userId,
            gestureContext.value.userId,
          );

        }

      }

      gestureContext.value.moving = false;
      gestureContext.value.vertical = false;
      gestureContext.value.userId = undefined;
      hideElements.value = false;
      paused.value = false;

    } );

  const onPressIn = () => {

    stopAnimation();
    paused.value = true;

  };

  const onLongPress = () => {

    isLongPress.value = true;
    hideElements.value = hideElementsOnLongPress ?? false;

  };

  const onPressOut = () => {

    if ( !isLongPress.value ) {

      return;

    }

    hideElements.value = false;
    isLongPress.value = false;
    paused.value = false;
    startAnimation( true );

  };

  const onPress = ( { nativeEvent: { locationX } }: GestureResponderEvent ) => {

    hideElements.value = false;

    if ( isLongPress.value ) {

      onPressOut();

      return;

    }

    if ( locationX < WIDTH / 2 ) {

      const success = toPreviousStory();

      if ( !success ) {

        startAnimation( true );

      }

    } else {

      toNextStory();

    }

    paused.value = false;

  };

  useImperativeHandle( ref, () => ( {
    show,
    hide: onClose,
    pause: () => {

      stopAnimation();
      paused.value = true;

    },
    resume: () => {

      startAnimation( true );
      paused.value = false;

    },
    isPaused: () => paused.value,
    getCurrentStory: () => ( { userId: userId.value, storyId: currentStory.value } ),
    goToPreviousStory: toPreviousStory,
    goToNextStory: toNextStory,
    goToSpecificStory: ( newUserId, index ) => scrollTo( newUserId, true, false, undefined, index ),
  } ) );

  useEffect( () => {

    if ( visible ) {

      if ( currentStory.value !== undefined ) {

        onShow?.( currentStory.value );

      }
      onLoad?.();

      y.value = withTiming( 0, { duration: modalAnimationDuration } );

    } else if ( currentStory.value !== undefined && !firstRender.value ) {

      onHide?.( currentStory.value );

    }

    firstRender.value = false;

  }, [ visible ] );

  useAnimatedReaction(
    () => animation.value,
    ( res, prev ) => res !== prev && toNextStory( res === 1 ),
  );

  return (
    <Modal statusBarTranslucent={statusBarTranslucent} visible={visible} transparent animationType="none" testID="storyRNModal" onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={onGestureEvent}>
          <Animated.View style={ModalStyles.container} testID="storyModal">
            <Pressable
              onPressIn={onPressIn}
              onPress={onPress}
              onLongPress={onLongPress}
              onPressOut={onPressOut}
              delayLongPress={LONG_PRESS_DURATION}
              style={ModalStyles.container}
            >
              <Animated.View style={[ ModalStyles.bgAnimation, backgroundAnimatedStyles ]} />
              <Animated.View style={[ ModalStyles.absolute, animatedStyles, containerStyle ]}>
                {stories?.map( ( story, index ) => (
                  <StoryList
                    {...story}
                    index={index}
                    x={x}
                    activeUser={userId}
                    activeStory={currentStory}
                    progress={animation}
                    seenStories={seenStories}
                    onClose={onClose}
                    onLoad={( value ) => {

                      onLoad?.();
                      startAnimation(
                        undefined,
                        value !== undefined ? value : duration,
                      );

                    }}
                    avatarSize={storyAvatarSize}
                    textStyle={textStyle}
                    paused={paused}
                    videoProps={videoProps}
                    closeColor={closeIconColor}
                    hideElements={hideElements}
                    videoDuration={videoDuration}
                    loaderColor={loaderColor}
                    loaderBackgroundColor={loaderBackgroundColor}
                    key={story.id}
                    {...props}
                  />
                ) )}
              </Animated.View>
            </Pressable>
            {footerComponent && footerComponent}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );

} );

export default memo( StoryModal );
