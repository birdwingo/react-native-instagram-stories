import React, { FC, memo, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useAnimatedReaction } from 'react-native-reanimated';
import { StoryVideoProps } from '~/core/dto/componentsDTO';

const StoryVideo: FC<StoryVideoProps> = ( {
  uri, paused, onLoad, onLayout,
} ) => {

  try {

    const Video = require( 'react-native-video' ).default;

    const [ pausedValue, setPausedValue ] = useState( !paused.value );

    useAnimatedReaction(
      () => paused.value,
      ( res, prev ) => res !== prev && setPausedValue( !res ),
      [ paused.value ],
    );

    return (
      <Video
        source={{ uri }}
        paused={!pausedValue}
        fullscreen
        controls={false}
        repeat={false}
        onLoad={( _: any, duration: number ) => onLoad( duration )}
        onLayout={( e: LayoutChangeEvent ) => onLayout( e.nativeEvent.layout.height )}
      />
    );

  } catch ( error ) {

    return null;

  }

};

export default memo( StoryVideo );
