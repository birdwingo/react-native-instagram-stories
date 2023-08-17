import React, { FC, memo } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WIDTH } from '../../core/constants';
import HeaderStyles from './Header.styles';
import { StoryHeaderProps } from '../../core/dto/componentsDTO';
import Close from '../Icon/close';

const StoryHeader: FC<StoryHeaderProps> = ( {
  imgUrl, name, onClose, avatarSize, textStyle,
} ) => {

  const styles = { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 };
  const width = WIDTH - HeaderStyles.container.left * 2;

  return (
    <View style={[ HeaderStyles.container, { width } ]}>
      <View style={HeaderStyles.left}>
        <View style={[ HeaderStyles.avatar, styles ]}>
          <Image source={{ uri: imgUrl }} style={styles} />
        </View>
        <Text style={textStyle}>{name}</Text>
      </View>
      <TouchableOpacity onPress={onClose} hitSlop={16}><Close color="white" /></TouchableOpacity>
    </View>
  );

};

export default memo( StoryHeader );
