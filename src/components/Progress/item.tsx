import React, { FC, memo } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StoryProgressItemProps } from '../../core/dto/componentsDTO';
import ProgressStyles from './Progress.styles';

const AnimatedView = Animated.createAnimatedComponent( View );

const ProgressItem: FC<StoryProgressItemProps> = ( {
  progress, active, activeStory, index, width,
} ) => {

  const animatedStyle = useAnimatedStyle( () => {

    if ( !active.value || activeStory.value < index ) {

      return { width: 0 };

    }

    if ( activeStory.value > index ) {

      return { width };

    }

    return { width: width * progress.value };

  } );

  return (
    <View style={[ ProgressStyles.item, ProgressStyles.itemInactive, { width } ]}>
      <AnimatedView style={[ ProgressStyles.item, ProgressStyles.itemActive, animatedStyle ]} />
    </View>
  );

};

export default memo( ProgressItem );
