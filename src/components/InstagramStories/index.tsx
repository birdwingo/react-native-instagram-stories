import React, {
  forwardRef, useImperativeHandle, useState, useEffect, useRef, memo,
} from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import StoryAvatar from '../Avatar';
import { clearProgressStorage, getProgressStorage, setProgressStorage } from '../../core/helpers/storage';
import { InstagramStoriesProps, InstagramStoriesPublicMethods } from '../../core/dto/instagramStoriesDTO';
import { ProgressStorageProps } from '../../core/dto/helpersDTO';
import {
  ANIMATION_DURATION, DEFAULT_COLORS, SEEN_LOADER_COLORS,
  STORY_AVATAR_SIZE, AVATAR_SIZE, BACKGROUND_COLOR,
} from '../../core/constants';
import StoryModal from '../Modal';
import { StoryModalPublicMethods } from '../../core/dto/componentsDTO';
import { preloadStories } from '../../core/helpers/image';

const InstagramStories = forwardRef<InstagramStoriesPublicMethods, InstagramStoriesProps>( ( {
  stories,
  saveProgress = false,
  preloadImages = false,
  avatarBorderColors = DEFAULT_COLORS,
  avatarSeenBorderColors = SEEN_LOADER_COLORS,
  avatarSize = AVATAR_SIZE,
  storyAvatarSize = STORY_AVATAR_SIZE,
  listContainerStyle,
  listContainerProps,
  animationDuration = ANIMATION_DURATION,
  backgroundColor = BACKGROUND_COLOR,
  showName = false,
  nameTextStyle,
  videoAnimationMaxDuration,
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

    if ( preloadImages ) {

      await preloadStories( data, seenStories.value );

    }

    loadedStories.value = true;

    if ( loadingStory.value ) {

      onPress( loadingStory.value );

    }

  };

  const onSeenStoriesChange = async ( user: string, value: string ) => {

    if ( !saveProgress ) {

      return;

    }

    if ( seenStories.value[user] ) {

      const userData = data.find( ( story ) => story.id === user );
      const oldIndex = userData?.stories.findIndex(
        ( story ) => story.id === seenStories.value[user],
      );
      const newIndex = userData?.stories.findIndex( ( story ) => story.id === value );

      if ( oldIndex! > newIndex! ) {

        return;

      }

    }

    seenStories.value = await setProgressStorage( user, value );

  };

  useImperativeHandle(
    ref,
    () => ( {
      spliceStories: ( newStories, index ) => {

        if ( index === undefined ) {

          setData( [ ...data, ...newStories ] );

        } else {

          const newData = [ ...data ];
          newData.splice( index, 0, ...newStories );
          setData( newData );

        }

      },
      spliceUserStories: ( newStories, user, index ) => {

        const userData = data.find( ( story ) => story.id === user );

        if ( !userData ) {

          return;

        }

        const newData = index === undefined
          ? [ ...userData.stories, ...newStories ]
          : [ ...userData.stories ];

        if ( index !== undefined ) {

          newData.splice( index, 0, ...newStories );

        }

        setData( data.map( ( value ) => ( value.id === user ? {
          ...value,
          stories: newData,
        } : value ) ) );

      },
      setStories: ( newStories ) => {

        setData( newStories );

      },
      clearProgressStorage,
      hide: () => modalRef.current?.hide(),
    } ),
    [ data ],
  );

  useEffect( () => {

    onStoriesChange();

  }, [ data ] );

  useEffect( () => {

    setData( stories );

  }, [ stories ] );

  return (
    <>
      <ScrollView horizontal {...listContainerProps} contentContainerStyle={listContainerStyle} testID="storiesList">
        {data.map( ( story ) => (
          <StoryAvatar
            {...story}
            loadingStory={loadingStory}
            seenStories={seenStories}
            onPress={() => onPress( story.id )}
            colors={avatarBorderColors}
            seenColors={avatarSeenBorderColors}
            size={avatarSize}
            showName={showName}
            nameTextStyle={nameTextStyle}
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
        backgroundColor={backgroundColor}
        preloadImages={preloadImages}
        videoDuration={videoAnimationMaxDuration}
        {...props}
      />
    </>
  );

} );

export default memo( InstagramStories );
