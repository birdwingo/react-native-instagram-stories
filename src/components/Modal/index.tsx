import React, {
  forwardRef, memo, useEffect, useImperativeHandle, useState,
} from 'react';
import { Modal } from 'react-native';
import Animated, {
  cancelAnimation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue, useSharedValue, withTiming,
} from 'react-native-reanimated';
import {
  ANIMATION_CONFIG, HEIGHT, LONG_PRESS_DURATION, WIDTH,
} from '../../core/constants';
import { GestureContext, StoryModalProps, StoryModalPublicMethods } from '../../core/dto/componentsDTO';
import GestureHandler from './gesture';
import StoryList from '../List';
import ModalStyles from './Modal.styles';

const StoryModal = forwardRef<StoryModalPublicMethods, StoryModalProps>( ( {
  stories, seenStories, duration, videoDuration, storyAvatarSize, textStyle, containerStyle,
  backgroundColor, videoProps, closeIconColor, onLoad, onShow, onHide, onSeenStoriesChange,
}, ref ) => {

  const [ visible, setVisible ] = useState( false );

  const x = useSharedValue( 0 );
  const y = useSharedValue( HEIGHT );
  const animation = useSharedValue( 0 );
  const currentStory = useSharedValue( stories[0]?.stories[0]?.id );
  const buttonHandled = useSharedValue( false );
  const paused = useSharedValue( false );
  const durationValue = useSharedValue( duration );

  const userIndex = useDerivedValue( () => Math.round( x.value / WIDTH ) );
  const storyIndex = useDerivedValue( () => stories[userIndex.value]?.stories.findIndex(
    ( story ) => story.id === currentStory.value,
  ) );
  const userId = useDerivedValue( () => stories[userIndex.value]?.id );
  const previousUserId = useDerivedValue( () => stories[userIndex.value - 1]?.id );
  const nextUserId = useDerivedValue( () => stories[userIndex.value + 1]?.id );
  const previousStory = useDerivedValue(
    () => stories[userIndex.value]?.stories[storyIndex.value - 1]?.id,
  );
  const nextStory = useDerivedValue(
    () => stories[userIndex.value]?.stories[storyIndex.value + 1]?.id,
  );

  const animatedStyles = useAnimatedStyle( () => ( { top: y.value } ) );
  const backgroundAnimatedStyles = useAnimatedStyle( () => ( {
    opacity: interpolate( y.value, [ 0, HEIGHT ], [ 1, 0 ] ),
    backgroundColor,
  } ) );

  const onClose = () => {

    'worklet';

    y.value = withTiming(
      HEIGHT,
      ANIMATION_CONFIG,
      () => runOnJS( setVisible )( false ),
    );

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
      runOnJS( onSeenStoriesChange )( userId.value, currentStory.value );

    }

    animation.value = withTiming( 1, { duration: newDuration } );

  };

  const scrollTo = ( id: string, animated = true ) => {

    'worklet';

    const newUserIndex = stories.findIndex( ( story ) => story.id === id );
    const newX = newUserIndex * WIDTH;

    x.value = animated ? withTiming( newX, ANIMATION_CONFIG ) : newX;
    const newStoryIndex = stories[newUserIndex]?.stories.findIndex(
      ( story ) => story.id === seenStories.value[id],
    );
    const userStories = stories[newUserIndex]?.stories;
    currentStory.value = userStories[newStoryIndex + 1]?.id ?? userStories[0]?.id;

  };

  const toNextStory = ( value = true ) => {

    'worklet';

    if ( !value ) {

      return;

    }

    if ( !nextStory.value ) {

      if ( nextUserId.value ) {

        scrollTo( nextUserId.value );

      } else {

        onClose();

      }

    } else {

      animation.value = 0;
      currentStory.value = nextStory.value;

    }

  };

  const toPreviousStory = () => {

    'worklet';

    if ( !previousStory.value ) {

      if ( previousUserId.value ) {

        scrollTo( previousUserId.value );

      }

    } else {

      animation.value = 0;
      currentStory.value = previousStory.value;

    }

  };

  const show = ( id: string ) => {

    setVisible( true );
    scrollTo( id, false );

  };

  const onGestureEvent = useAnimatedGestureHandler( {
    onStart: ( e, ctx: GestureContext ) => {

      ctx.x = x.value;
      ctx.pressedX = e.x;
      ctx.pressedAt = Date.now();
      stopAnimation();
      paused.value = true;

    },
    onActive: ( e, ctx ) => {

      if ( ctx.x === x.value
        && ( ctx.vertical || ( Math.abs( e.velocityX ) < Math.abs( e.velocityY ) ) ) ) {

        ctx.vertical = true;
        y.value = Math.max( 0, e.translationY / 2 );

      } else {

        ctx.moving = true;
        x.value = Math.max(
          0,
          Math.min( ctx.x + -e.translationX, WIDTH * ( stories.length - 1 ) ),
        );

      }

    },
    onFinish: ( e, ctx ) => {

      if ( ctx.vertical ) {

        if ( e.translationY > 100 ) {

          onClose();

        } else {

          y.value = withTiming( 0 );
          startAnimation();

        }

      } else if ( ctx.moving ) {

        const diff = x.value - ctx.x;
        let newX;

        if ( Math.abs( diff ) < WIDTH / 4 ) {

          newX = ctx.x;

        } else {

          newX = diff > 0
            ? Math.ceil( x.value / WIDTH ) * WIDTH
            : Math.floor( x.value / WIDTH ) * WIDTH;

        }

        const newUserId = stories[Math.round( newX / WIDTH )]?.id;
        scrollTo( newUserId );

      } else if ( ctx.pressedAt + LONG_PRESS_DURATION < Date.now() ) {

        startAnimation( true );

      } else if ( ctx.pressedX < WIDTH / 2 ) {

        toPreviousStory();

      } else if ( !buttonHandled.value ) {

        toNextStory();

      }

      ctx.moving = false;
      ctx.vertical = false;
      buttonHandled.value = false;
      paused.value = false;

    },
  } );

  useImperativeHandle( ref, () => ( { show, hide: onClose } ) );

  useEffect( () => {

    if ( visible ) {

      onShow?.( currentStory.value );
      onLoad?.();

      y.value = withTiming( 0, ANIMATION_CONFIG );

    } else {

      onHide?.( currentStory.value );

    }

  }, [ visible ] );

  useAnimatedReaction(
    () => animation.value,
    ( res, prev ) => res !== prev && toNextStory( res === 1 ),
    [ animation.value ],
  );

  return (
    <Modal visible={visible} transparent animationType="none" testID="storyRNModal">
      <GestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={ModalStyles.container} testID="storyModal">
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
                    value !== undefined ? ( videoDuration ?? value ) : duration,
                  );

                }}
                avatarSize={storyAvatarSize}
                textStyle={textStyle}
                buttonHandled={buttonHandled}
                paused={paused}
                videoProps={videoProps}
                closeColor={closeIconColor}
                key={story.id}
              />
            ) )}
          </Animated.View>
        </Animated.View>
      </GestureHandler>
    </Modal>
  );

} );

export default memo( StoryModal );
