import React, { FC, memo } from 'react';
import { View, Image, Text } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, useDerivedValue, withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StoryAvatarProps } from '../../core/dto/componentsDTO';
import AvatarStyles from './Avatar.styles';
import Loader from '../Loader';
import {
  AVATAR_OFFSET, AVATAR_SIZE, DEFAULT_COLORS, SEEN_LOADER_COLORS,
} from '../../core/constants';

const AnimatedImage = Animated.createAnimatedComponent( Image );

const StoryAvatar: FC<StoryAvatarProps> = ( {
  id,
  imgUrl,
  name,
  stories,
  loadingStory,
  seenStories,
  onPress,
  colors = DEFAULT_COLORS,
  seenColors = SEEN_LOADER_COLORS,
  size = AVATAR_SIZE,
  showName = false,
  nameTextStyle,
} ) => {

  const loaded = useSharedValue( false );
  const isLoading = useDerivedValue( () => loadingStory.value === name || !loaded.value );
  const loaderColor = useDerivedValue( () => (
    seenStories.value[id] === stories[stories.length - 1]?.id
      ? seenColors
      : colors
  ) );

  const onLoad = () => {

    loaded.value = true;

  };

  const imageAnimatedStyles = useAnimatedStyle( () => (
    { opacity: withTiming( isLoading.value ? 0.5 : 1 ) }
  ) );

  return (
    <View style={AvatarStyles.name}>
      <View style={AvatarStyles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
          <Loader loading={isLoading} color={loaderColor} size={size + AVATAR_OFFSET * 2} />
          <AnimatedImage
            source={{ uri: imgUrl }}
            style={[
              AvatarStyles.avatar,
              imageAnimatedStyles,
              { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
            ]}
            onLoad={onLoad}
          />
        </TouchableOpacity>
      </View>
      {showName && <Text style={nameTextStyle}>{name}</Text>}
    </View>
  );

};

export default memo( StoryAvatar );
