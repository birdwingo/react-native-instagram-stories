import React, { FC, memo } from 'react';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, useDerivedValue, withTiming,
} from 'react-native-reanimated';
import { StoryAvatarProps } from '../../core/dto/componentsDTO';
import AvatarStyles from './Avatar.styles';
import Loader from '../Loader';
import { AVATAR_OFFSET } from '../../core/constants';

const AnimatedImage = Animated.createAnimatedComponent( Image );

const StoryAvatar: FC<StoryAvatarProps> = ( {
  id,
  imgUrl,
  name,
  stories,
  loadingStory,
  seenStories,
  onPress,
  colors,
  seenColors,
  size,
  showName,
  nameTextStyle,
} ) => {

  const loaded = useSharedValue( false );
  const isLoading = useDerivedValue( () => loadingStory.value === id || !loaded.value );
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
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} testID={`${id}StoryAvatar${stories.length}Story`}>
          <Loader loading={isLoading} color={loaderColor} size={size + AVATAR_OFFSET * 2} />
          <AnimatedImage
            source={{ uri: imgUrl }}
            style={[
              AvatarStyles.avatar,
              imageAnimatedStyles,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
            testID="storyAvatarImage"
            onLoad={onLoad}
          />
        </TouchableOpacity>
      </View>
      {Boolean( showName ) && <Text style={nameTextStyle}>{name}</Text>}
    </View>
  );

};

export default memo( StoryAvatar );
