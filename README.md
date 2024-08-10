# @birdwingo/react-native-instagram-stories

![npm downloads](https://img.shields.io/npm/dm/%40birdwingo/react-native-instagram-stories)
![npm version](https://img.shields.io/npm/v/%40birdwingo/react-native-instagram-stories)
![github release](https://github.com/birdwingo/react-native-instagram-stories/actions/workflows/release.yml/badge.svg?event=pull_request)
![npm release](https://github.com/birdwingo/react-native-instagram-stories/actions/workflows/public.yml/badge.svg?event=release)

## Features 🌟

📸 Capture Moments: Easily integrate Instagram-like stories in your React Native app to let users share their favorite moments.

✨ Inspired by Instagram: Crafted with inspiration from the real Instagram stories feature, capturing its essence and style.

📱 Mobile-Friendly: Designed with mobile users in mind, providing a smooth and responsive experience on all devices.

💾 Using Async Storage: Utilize Async Storage to save the progress of users and load them whenever they want.

🛠️ Developer Friendly: Well-documented and easy to set up, making the developer's life a breeze.

🚀 High Performance: Optimized for speed, ensuring a lag-free experience for users.

💡 Rich Features: Support for video, images, and text, plus more – all in one powerful package!

🎉 Community Support: Join a growing community of developers and users, eager to help and share their experiences.

## About

`react-native-instagram-stories` component is a versatile React Native component designed to display a horizontal scrollable list of user stories, similar to the stories feature found in the Instagram app. It provides a visually appealing way to showcase stories with various customizable options. It is used in the [Birdwingo mobile app](https://www.birdwingo.com) for **Birdwingo Academy** which allows users to learn the basics of investing in stocks and ETFs.

<img src="./src/assets/images/demo.gif" width="300">

## Installation

```bash
npm install react-native-svg
npm install react-native-reanimated
npm install react-native-gesture-handler
npm install @birdwingo/react-native-instagram-stories
```

## Integration with Storage and Video

The component offers an option to save and track the progress of seen stories using `saveProgress`. If you use `saveProgress`, please make sure you have `@react-native-async-storage/async-storage` installed.

If you use video in your stories, please make sure you have `react-native-video` installed.

## Usage

To use the `InstagramStories` component, you need to import it in your React Native application and include it in your JSX code. Here's an example of how to use it:

```jsx
import React, { useRef } from 'react';
import { View } from 'react-native';
import InstagramStories, { InstagramStoriesPublicMethods } from '@birdwingo/react-native-instagram-stories';

const YourComponent = () => {

  // to use public methods:
  const ref = useRef( null ); // if using typescript - useRef<InstagramStoriesPublicMethods>( null )
  
  const stories = [{
    id: 'user1',
    name: 'User 1',
    imgUrl: 'user1-profile-image-url',
    stories: [
      { id: 'story1', source: { uri: 'story1-image-url' } },
      { id: 'story2', source: { uri: 'story1-video-url' }, mediaType: 'video' },
      // ...
    ]}, // ...
  ];

  // usage of public method
  const setStories = () => ref.current?.setStories( stories );
  
  return (
    <View>
      <InstagramStories
        ref={ref}
        stories={stories}
        // ...
      />
     <Pressable onPress={setStories}>{...}</Pressable>
    </View>
  );
};

export default YourComponent;
```

## Props

 Name                       | Type                                         | Default value                              | Description       
----------------------------|----------------------------------------------|--------------------------------------------|---------------------
 `stories`                  | [InstagramStoryProps](#instagramstoryprops)[]| **required**                               | An array of stories.
 `saveProgress`             | boolean                                      | false                                      | A boolean indicating whether to save and track the progress of seen stories.
 `avatarBorderColors`       | string[]                                     | [DEFAULT_COLORS](#default-gradient-colors) | An array of string colors representing the border colors of story avatars.
 `avatarSeenBorderColors`   | string[]                                     | [ '#2A2A2C' ]                              | An array of string colors representing the border colors of seen story avatars.
 `avatarSize`               | number                                       | 60                                         | The size of the story avatars.
 `storyAvatarSize`          | number                                       | 25                                         | The size of the avatars shown in the header of each story.
 `avatarListContainerStyle` | ScrollViewProps['contentContainerStyle']     |                                            | Additional styles for the avatar scroll list container.
 `avatarListContainerProps` | ScrollViewProps                              |                                            | Props to be passed to the avatar list ScrollView component.
 `containerStyle`           | ViewStyle                                    |                                            | Additional styles for the story container.
 `textStyle`                | TextStyle                                    |                                            | Additional styles for text elements.
 `animationDuration`        | number                                       | 10000                                      | The duration of the story animations in ms.
 `videoAnimationMaxDuration`| number                                       |                                            | The max duration of the video story animations in ms. If is this property not provided, the whole video will be played.
 `backgroundColor`          | string                                       | '#000000'                                  | The background color of story container.
 `showName`                 | boolean                                      | false                                      | Whether you want to show user name under avatar in avatar list.
 `nameTextStyle`            | TextStyle                                    | { width: `avatarSize` + 10 }               | Additional styles for name text elements.
 `nameTextProps`            | TextProps                                    |                                            | Props to be passed to the name Text component.
 `videoProps`               | [react-native-video](https://www.npmjs.com/package/react-native-video?activeTab=readme#configurable-props)| | Additional props for video component. For more information, follow `react-native-video`.
 `closeIconColor`           | string                                       | '#00000099'                                | The color of story close icon.
 `progressColor`            | string                                       | '#00000099'                                | Background color of progress bar item in inactive state
 `progressActiveColor`      | string                                       | '#FFFFFF'                                  | Background color of progress bar item in active state
 `modalAnimationDuration`   | number                                       | 800                                        | Duration of modal animation in ms (showing/closing instagram stories)
 `storyAnimationDuration`   | number                                       | 800                                        | Duration of story animation (animation when swiping to the left/right)
 `mediaContainerStyle`      | ViewStyle                                    |                                            | Additional styles for media (video or image) container
 `imageStyles`              | ImageStyle                                   | { width: WIDTH, aspectRatio: 0.5626 }      | Additional styles image component
 `imageProps`               | ImageProps                                   |                                            | Additional props applied to image component
 `isVisible`                | boolean                                      | false                                      | A boolean indicating whether to show modal on load (modal will be show with first story item)
 `headerStyle`              | ViewStyle                                    |                                            | Additional styles for the story header
 `headerContainerStyle`     | ViewStyle                                    |                                            | Additional styles for the story header container
 `progressContainerStyle`   | ViewStyle                                    |                                            | Additional styles for the story progress container
 `hideAvatarList`           | boolean                                      | false                                      | A boolean indicating whether to hide avatar scroll list
 `hideElementsOnLongPress`  | boolean                                      | false                                      | A boolean indicating whether to hide all elements when story is paused by long press
 `loopingStories`           | `'none'` | `'onlyLast'` | `'all'`            | `'none'`                                   | A string indicating whether to continue stories after last story was shown. If set to `'none'` modal will be closed after all stories were played, if set to `'onlyLast'` stories will loop on last user only after all stories were played. If set to `'all'` stories will play from beginning after all stories were played.
 `statusBarTranslucent`     | boolean                                      | false                                      | A property passed to React native Modal component
 `footerComponent`          | ReactNode                                    |                                            | A custom component, such as a floating element, that can be added to the modal.
 `imageOverlayView`         | ReactNode                                    |                                            | Image overlay compontent
 `onShow`                   | ( id: string ) => void                       |                                            | Callback when a story is shown.
 `onHide`                   | ( id: string ) => void                       |                                            | Callback when a story is hidden.
 `onSwipeUp`                | ( userId?: string, storyId?: string ) => void|                                            | Callback when user swipes up.
 `onStoryStart`             | ( userId?: string, storyId?: string ) => void|                                            | Callback when story started
 `onStoryEnd`               | ( userId?: string, storyId?: string ) => void|                                            | Callback when story ended

## Public Methods

 Name                  | Type                                                                                             | Description
---------------------- |--------------------------------------------------------------------------------------------------|---------------------------
 `spliceStories`       | ( stories: [InstagramStoryProps](#instagramstoryprops)[], index?: number ) => void               | Insert new stories at a specific index. If you don't provide `index` property, stories will be pushed to the end of array.
 `spliceUserStories`   | ( stories: [InstagramStoryProps](#instagramstoryprops)[], user: string, index?: number ) => void | Insert new stories for a specific user at a specific index. If you don't provide `index` property, stories will be pushed to the end of array
 `setStories`          | ( stories: [InstagramStoryProps](#instagramstoryprops)[] ) => void                               | Replace the current stories with a new set of stories.
 `clearProgressStorage`| () => void                                                                                       | Clear the progress storage for seen stories.
 `hide`                | () => void                                                                                       | Hide stories if currently visible
 `show`                | ( id?: string ) => void                                                                          | Show stories modal with provided story `id`. If `id` is not provided, will be shown first story
 `pause`               | () => void                                                                                       | Pause story
 `resume`              | () => void                                                                                       | Resume story
 `goToPreviousStory`   | () => void                                                                                       | Goes to previous story item
 `goToNextStory`       | () => void                                                                                       | Goes to next story item
 `getCurrentStory`     | () => {userId?: string, storyId?: string}                                                        | Returns current userId and storyId

## Types

### InstagramStoryProps

 Parameter             | Type                                   | Required
-----------------------|----------------------------------------|----------------
 `id`                  | string                                 | true
 `avatarSource`        | ImageProps['source']                   | false
 `renderAvatar`        | () => ReactNode                        | false
 `renderStoryHeader`   | () => ReactNode                        | false
 `onStoryHeaderPress`  | () => void                             | false
 `name`                | string                                 | false
 `stories`             | [StoryItemProps](#storyitemprops)[]    | true

**Please note that id parameter must be unique for every user**

### StoryItemProps

 Parameter             | Type                                     | Required
-----------------------|------------------------------------------|-------------------
 `id`                  | string                                   | true
 `source`              | ImageProps['source']                     | true
 `mediaType`           | 'video' \| 'image' (default: `'image'`)  | false
 `animationDuration`   | number                                   | false
 `renderContent`       | () => ReactNode                          | false
 `renderFooter`        | () => ReactNode                          | false

**Please note that id parameter must be unique for every story**

### Default Gradient Colors
Default colors for avatar gradient are the same as on Instagram - `[ '#F7B801', '#F18701', '#F35B04', '#F5301E', '#C81D4E', '#8F1D4E' ]`

## Sponsor

**react-native-instagram-stories** is sponsored by [Birdwingo](https://www.birdwingo.com).\
Download Birdwingo mobile app to see react-native-instagram-stories in action!
