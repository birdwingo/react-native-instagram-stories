import React, { FC, memo } from 'react';
import { View } from 'react-native';
import ProgressItem from './item';
import { PROGRESS_ACTIVE_COLOR, PROGRESS_COLOR, WIDTH } from '../../core/constants';
import ProgressStyles from './Progress.styles';
import { StoryProgressProps } from '../../core/dto/componentsDTO';

const Progress: FC<StoryProgressProps> = ( {
  progress, active, activeStory, length,
  progressActiveColor = PROGRESS_ACTIVE_COLOR, progressColor = PROGRESS_COLOR,
} ) => {

  const width = ( (
    WIDTH - ProgressStyles.container.left * 2 ) - ( length - 1 )
    * ProgressStyles.container.gap ) / length;

  return (
    <View style={[ ProgressStyles.container, { width: WIDTH } ]}>
      {[ ...Array( length ).keys() ].map( ( val ) => (
        <ProgressItem
          active={active}
          activeStory={activeStory}
          progress={progress}
          index={val}
          width={width}
          key={val}
          progressActiveColor={progressActiveColor}
          progressColor={progressColor}
        />
      ) )}
    </View>
  );

};

export default memo( Progress );
