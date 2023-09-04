import React, { FC, memo } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { PROGRESS_COLOR, WIDTH } from '../../core/constants';
import HeaderStyles from './Header.styles';
import { StoryHeaderProps } from '../../core/dto/componentsDTO';
import Close from '../Icon/close';

const StoryHeader: FC<StoryHeaderProps> = ( {
  imgUrl, name, onClose, avatarSize, textStyle, buttonHandled,
} ) => {

  const styles = { width: avatarSize, height: avatarSize, borderRadius: avatarSize };
  const width = WIDTH - HeaderStyles.container.left * 2;

  return (
    <View style={[ HeaderStyles.container, { width } ]}>
      <View style={HeaderStyles.left}>
      </View>
      <TouchableOpacity
        onPress={onClose}
        hitSlop={16}
        testID="storyCloseButton"
        onPressIn={() => {

          buttonHandled.value = true;

        }}
      >
        <Close color={PROGRESS_COLOR} />
      </TouchableOpacity>
    </View>
  );

};

export default memo( StoryHeader );
