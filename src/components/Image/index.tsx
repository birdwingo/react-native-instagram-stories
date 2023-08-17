import { Image, View } from 'react-native';
import React, {
  FC, memo, useState, useEffect,
} from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { StoryImageProps } from '../../core/dto/componentsDTO';
import { loadImage } from '../../core/helpers/image';
import Loader from '../Loader';
import { HEIGHT, LOADER_COLORS, WIDTH } from '../../core/constants';
import ImageStyles from './Image.styles';

const StoryImage: FC<StoryImageProps> = ( {
  stories, active, activeStory, onImageLayout, onLoad,
} ) => {

  const [ uri, setUri ] = useState<string>();

  const loading = useSharedValue( true );
  const color = useSharedValue( LOADER_COLORS );

  const onImageChange = async () => {

    if ( !active.value ) {

      if ( !uri ) {

        const image = await loadImage( stories[0].imgUrl );
        setUri( image );

        return;

      }

    }

    const story = stories.find( ( item ) => item.id === activeStory.value );

    loading.value = true;

    if ( story ) {

      const image = await loadImage( story.imgUrl );
      setUri( image );
      loading.value = false;

      const nextStory = stories[stories.indexOf( story ) ?? 0 + 1];

      if ( nextStory ) {

        loadImage( nextStory.imgUrl );

      }

    }

  };

  useAnimatedReaction(
    () => activeStory.value,
    ( res, prev ) => res !== prev && runOnJS( onImageChange )(),
    [ activeStory.value ],
  );

  useEffect( () => {

    onImageChange();

  }, [] );

  return (
    <>
      <View style={ImageStyles.container}>
        <Loader loading={loading} color={color} size={50} />
      </View>
      <Image
        source={{ uri }}
        style={{ width: WIDTH, aspectRatio: 0.5626 }}
        resizeMode="contain"
        onLayout={( e ) => onImageLayout( Math.min( HEIGHT, e.nativeEvent.layout.height ) )}
        onLoad={onLoad}
      />
    </>
  );

};

export default memo( StoryImage );
