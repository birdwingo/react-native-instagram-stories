import React, {
  forwardRef, useImperativeHandle, useState, useEffect, useRef, memo,
} from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import StoryAvatar from '../Avatar';
import { clearProgressStorage, getProgressStorage, setProgressStorage } from '../../core/helpers/storage';
import { InstagramStoriesProps, InstagramStoriesPublicMethods } from '../../core/dto/instagramStoriesDTO';
import { ProgressStorageProps } from '../../core/dto/helpersDTO';
import { preloadStories } from '../../core/helpers/image';
import { ANIMATION_DURATION, STORY_AVATAR_SIZE } from '../../core/constants';
import StoryModal from '../Modal';
import { StoryModalPublicMethods } from '../../core/dto/componentsDTO';

const InstagramStories = forwardRef<InstagramStoriesPublicMethods, InstagramStoriesProps>( ( {
  stories,
  saveProgress = false,
  avatarBorderColors,
  avatarSeenBorderColor,
  avatarSize,
  storyAvatarSize = STORY_AVATAR_SIZE,
  listContainerStyle,
  listContainerProps,
  animationDuration = ANIMATION_DURATION,
  ...props
}, ref ) => {

  const [ data, setData ] = useState( stories );

  const seenStories = useSharedValue<ProgressStorageProps>( {} );
  const loadedStories = useSharedValue( false );
  const loadingStory = useSharedValue<string | undefined>( undefined );

  const modalRef = useRef<StoryModalPublicMethods>( null );

  const onPress = ( id: string ) => {

    'wokrlet';

    loadingStory.value = id;

    if ( loadedStories.value ) {

      modalRef.current?.show( id );

    }

  };

  const onLoad = () => {

    'wokrlet';

    loadingStory.value = undefined;

  };

  const onStoriesChange = async () => {

    'wokrlet';

    seenStories.value = await ( saveProgress ? getProgressStorage() : {} );

    await preloadStories( data, seenStories.value );

    loadedStories.value = true;

    if ( loadingStory.value ) {

      onPress( loadingStory.value );

    }

  };

  const onSeenStoriesChange = async ( user: string, value: string ) => {

    seenStories.value = await setProgressStorage( user, value );

  };

  useImperativeHandle(
    ref,
    () => ( {
      spliceStories: ( newStories, index ) => {

        setData( data.splice( index, 0, ...newStories ) );

      },
      spliceUserStories: ( newStories, user, index ) => {

        const userIndex = data.findIndex( ( story ) => story.id === user );

        if ( !userIndex || !data[userIndex] ) {

          return;

        }

        const newData = {
          ...data[userIndex],
          stories: data[userIndex].stories.splice( index, 0, ...newStories ),
        };

        setData( data.map( ( value, i ) => ( i === userIndex ? newData : value ) ) );

      },
      setStories: ( newStories ) => {

        setData( newStories );

      },
      clearProgressStorage,
    } ),
    [],
  );

  useEffect( () => {

    onStoriesChange();

  }, [ data ] );

  return (
    <>
      <ScrollView horizontal {...listContainerProps} contentContainerStyle={listContainerStyle}>
        {stories.map( ( story ) => (
          <StoryAvatar
            {...story}
            loadingStory={loadingStory}
            seenStories={seenStories}
            onPress={() => onPress( story.id )}
            colors={avatarBorderColors}
            seenColors={avatarSeenBorderColor}
            size={avatarSize}
            key={`avatar${story.id}`}
          />
        ) )}
      </ScrollView>
      <StoryModal
        ref={modalRef}
        stories={data}
        seenStories={seenStories}
        duration={animationDuration}
        storyAvatarSize={storyAvatarSize}
        onLoad={onLoad}
        onSeenStoriesChange={onSeenStoriesChange}
        {...props}
      />
    </>
  );

} );

export default memo( InstagramStories );
