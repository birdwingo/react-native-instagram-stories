import { View } from 'react-native';
import React, { FC, memo, useState } from 'react';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { StoryContentProps } from '../../core/dto/componentsDTO';
import ContentStyles from './Content.styles';

const StoryContent: FC<StoryContentProps> = ( { stories, active, activeStory } ) => {

  const [ storyIndex, setStoryIndex ] = useState( 0 );
  const { content } = stories[storyIndex];

  const onChange = async () => {

    if ( active.value ) {

      runOnJS( setStoryIndex )( stories.findIndex( ( item ) => item.id === activeStory.value ) );

    }

  };

  useAnimatedReaction(
    () => activeStory.value,
    ( res, prev ) => res !== prev && onChange,
    [ activeStory.value ],
  );

  return content ? <View style={ContentStyles.container}>{content}</View> : null;

};

export default memo( StoryContent );
