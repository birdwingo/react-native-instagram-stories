import { Image, View } from 'react-native';
import React, {
  FC, memo, useState, useEffect,
} from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { StoryImageProps } from '../../core/dto/componentsDTO';
import Loader from '../Loader';
import { HEIGHT, LOADER_COLORS, WIDTH } from '../../core/constants';
import ImageStyles from './Image.styles';

const StoryImage: FC<StoryImageProps> = ( {
  stories, active, activeStory, defaultImage, preloadImages, onImageLayout, onLoad,
} ) => {

  const [ uri, setUri ] = useState<string>();

  const loading = useSharedValue( true );
  const color = useSharedValue( LOADER_COLORS );

  const onImageChange = async () => {

    if ( !active.value ) {

      return;

    }

    const story = stories.find( ( item ) => item.id === activeStory.value );

    loading.value = true;

    if ( story ) {

      setUri( undefined );

      if ( preloadImages ) {

        const { loadImage } = await import( '../../core/helpers/image' );

        const image = await loadImage( story.imgUrl );
        setUri( image );

        const nextStory = stories[stories.indexOf( story ) ?? 0 + 1];

        if ( nextStory ) {

          loadImage( nextStory.imgUrl );

        }

      } else {

        setUri( story.imgUrl );

      }

    }

  };

  const setDefaultImage = async () => {

    if ( !active.value ) {

      if ( preloadImages ) {

        const { loadImage } = await import( '../../core/helpers/image' );

        const image = await loadImage( defaultImage );
        setUri( image );

      } else {

        setUri( defaultImage );

      }

    }

  };

  useAnimatedReaction(
    () => activeStory.value,
    ( res, prev ) => res !== prev && runOnJS( onImageChange )(),
    [ activeStory.value ],
  );

  useAnimatedReaction(
    () => active.value,
    ( res, prev ) => res !== prev && runOnJS( onImageChange )(),
    [ active.value ],
  );

  useEffect( () => {

    setDefaultImage();

  }, [] );

  return (
    <>
      <View style={ImageStyles.container}>
        <Loader loading={loading} color={color} size={50} />
      </View>
      {uri && (
        <Image
          source={{ uri }}
          style={{ width: WIDTH, aspectRatio: 0.5626 }}
          resizeMode="contain"
          onLayout={( e ) => onImageLayout( Math.min( HEIGHT, e.nativeEvent.layout.height ) )}
          onLoad={() => {

            loading.value = false;
            onLoad();

          }}
        />
      )}
    </>
  );

};

export default memo( StoryImage );
