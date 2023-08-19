import { Image, View } from 'react-native';
import React, {
  FC, memo, useState, useEffect, useRef,
} from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { StoryImageProps } from '../../core/dto/componentsDTO';
import Loader from '../Loader';
import { HEIGHT, LOADER_COLORS, WIDTH } from '../../core/constants';
import ImageStyles from './Image.styles';
import { loadImage } from '../../core/helpers/image';
import StoryVideo from './video';

const StoryImage: FC<StoryImageProps> = ( {
  stories, active, activeStory, defaultImage, isDefaultVideo, preloadImages, paused,
  onImageLayout, onLoad,
} ) => {

  const [ data, setData ] = useState<{ uri: string, isVideo?: boolean }>( { uri: '' } );

  const loading = useSharedValue( true );
  const color = useSharedValue( LOADER_COLORS );

  const storyImgUrl = useRef( '' );

  const onImageChange = async () => {

    if ( !active.value ) {

      return;

    }

    const story = stories.find( ( item ) => item.id === activeStory.value )!;

    if ( !story ) {

      return;

    }

    if ( storyImgUrl.current === story.sourceUrl ) {

      onLoad();

      if ( preloadImages ) {

        const nextStory = stories[stories.indexOf( story ) + 1];

        if ( nextStory ) {

          loadImage( nextStory.sourceUrl );

        }

      }

      return;

    }

    loading.value = true;

    if ( preloadImages ) {

      setData( { uri: '', isVideo: false } );

      const uri = await loadImage( story.sourceUrl );

      setData( { uri, isVideo: story.mediaType === 'video' } );

      storyImgUrl.current = story.sourceUrl;

    } else {

      storyImgUrl.current = story.sourceUrl;
      setData( { uri: story?.sourceUrl, isVideo: story?.mediaType === 'video' } );

    }

  };

  const setDefaultImage = async () => {

    if ( preloadImages ) {

      const uri = await loadImage( defaultImage );
      setData( { uri, isVideo: isDefaultVideo } );
      storyImgUrl.current = defaultImage;

    } else {

      setData( { uri: defaultImage, isVideo: isDefaultVideo } );

    }

  };

  useAnimatedReaction(
    () => activeStory.value,
    ( res, prev ) => res !== prev && runOnJS( onImageChange )(),
    [ activeStory.value ],
  );

  const onContentLoad = ( duration?: number ) => {

    loading.value = false;
    onLoad( duration );

  };

  useEffect( () => {

    setDefaultImage();

  }, [] );

  return (
    <>
      <View style={ImageStyles.container}>
        <Loader loading={loading} color={color} size={50} />
      </View>
      {data.uri && (
        data.isVideo ? (
          <StoryVideo
            onLoad={onContentLoad}
            onLayout={onImageLayout}
            uri={data.uri}
            paused={paused}
          />
        ) : (
          <Image
            source={{ uri: data.uri }}
            style={{ width: WIDTH, aspectRatio: 0.5626 }}
            resizeMode="contain"
            testID="storyImageComponent"
            onLayout={( e ) => onImageLayout( Math.min( HEIGHT, e.nativeEvent.layout.height ) )}
            onLoad={() => onContentLoad()}
          />
        )
      )}
    </>
  );

};

export default memo( StoryImage );
