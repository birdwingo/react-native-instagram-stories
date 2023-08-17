# @birdwingo/react-native-instagram-stories

![npm downloads](https://img.shields.io/npm/dm/%40birdwingo/react-native-instagram-stories)
![npm version](https://img.shields.io/npm/v/%40birdwingo/react-native-instagram-stories)
![github release](https://github.com/birdwingo/react-native-instagram-stories/actions/workflows/release.yml/badge.svg?event=pull_request)
![npm release](https://github.com/birdwingo/react-native-instagram-stories/actions/workflows/public.yml/badge.svg?event=release)

## About

`react-native-instagram-stories` component is a versatile React Native component designed to display a horizontal scrollable list of user stories, similar to the stories feature found in the Instagram app. It provides a visually appealing way to showcase stories with various customizable options. It is used in the [Birdwingo mobile app](https://www.birdwingo.com) for **Birdwingo Academy** which allows users to learn the basics of investing in stocks and ETFs.

## Installation

```bash
npm install react-native-svg
npm install react-native-reanimated
npm install react-native-gesture-handler
npm install @birdwingo/react-native-instagram-stories
```

## Integration with Storage and Preloading

The component offers an option to save and track the progress of seen stories using `saveProgress`. If you use `saveProgress` please make sure you have `@react-native-async-storage/async-storage` installed.
Additionally, the component preloads images to improve performance when navigating between stories using `preloadImages`. If you use `preloadImages` please make sure you have `react-native-blob-util` installed.

## Usage

To use the `InstagramStories` component, you need to import it in your React Native application and include it in your JSX code. Here's an example of how to use it:

```jsx
import React from 'react';
import { View } from 'react-native';
import InstagramStories from '@birdwingo/react-native-instagram-stories';

const YourComponent = () => {
  
  const stories = [{
    id: 'user1',
    name: 'User 1',
    imgUrl: 'user1-profile-image-url',
    stories: [
      { id: 'story1', imgUrl: 'story1-image-url' },
      // ...
    ]}, // ...
  ];
  
  return (
    <View>
      <InstagramStories
        stories={stories}
        // ...
      />
    </View>
  );
};

export default YourComponent;
```

## Props

 Name                    | Type                                         | Default value                              | Description       
-------------------------|----------------------------------------------|--------------------------------------------|---------------------
 `stories`               | [InstagramStoryProps](#instagramstoryprops)[]| **required**                               | An array of stories
 `saveProgress`          | boolean                                      | false                                      | A boolean indicating whether to save and track the progress of seen stories
 `avatarBorderColors`    | string[]                                     | [DEFAULT_COLORS](#default-gradient-colors) | An array of string colors representing the border colors of story avatars.
 `avatarSeenBorderColors`| string[]                                     | [ '#2A2A2C' ]                              | An array of string colors representing the border colors of seen story avatars.
 `avatarSize`            | number                                       | 60                                         | The size of the story avatars.
 `storyAvatarSize`       | number                                       | 25                                         | The size of the avatars shown in the header of each story
 `listContainerStyle`    | ScrollViewProps['contentContainerStyle']     |                                            | Additional styles for the list container.
 `listContainerProps`    | ScrollViewProps                              |                                            | Props to be passed to the underlying ScrollView component.
 `containerStyle`        | ViewStyle                                    |                                            | Additional styles for the story container.
 `textStyle`             | TextStyle                                    |                                            | Additional styles for text elements.
 `animationDuration`     | number                                       | 10000                                      | The duration of the story animations in ms.
 `backgroundColor`       | string                                       | '#000000'                                  | The background color of story container.
 `onShow`                | ( id: string ) => void                       |                                            | Callback when a story is shown.
 `onHide`                | ( id: string ) => void                       |                                            | Callback when a story is hidden.

## Public Methods

 Name                  | Type                                                                                            | Description
---------------------- |-------------------------------------------------------------------------------------------------|---------------------------
 `spliceStories`       | ( stories: [InstagramStoryProps](#instagramstoryprops)[], index: number ) => void               | Insert new stories at a specific index.
 `spliceUserStories`   | ( stories: [InstagramStoryProps](#instagramstoryprops)[], user: string, index: number ) => void | Insert new stories for a specific user at a specific index.
 `setStories`          | ( stories: [InstagramStoryProps](#instagramstoryprops)[] ) => void                              | Replace the current stories with a new set of stories.
 `clearProgressStorage`| () => void                                                                                      | Clear the progress storage for seen stories.
 `hide`                | () => void                                                                                      | Hide stories if currently visible

## Types

### InstagramStoryProps

 Parameter             | Type
-----------------------|---------------------
 `id`                  | string
 `imgUrl`              | string
 `name`                | string
 `stories`             | [StoryItemProps](#storyitemprops)[]

**Please note that id parameter must be unique for every user**

### StoryItemProps

 Parameter             | Type
-----------------------|---------------------
 `id`                  | string
 `imgUrl`              | string
 `renderContent`       | () => ReactNode

**Please note that id parameter must be unique for every story**

### Default Gradient Colors
Default colors for avatar gradient are the same as on Instagram - `[ '#F7B801', '#F18701', '#F35B04', '#F5301E', '#C81D4E', '#8F1D4E' ]`

## Sponsor

**react-native-instagram-stories** is sponsored by [Birdwingo](https://www.birdwingo.com).\
Download Birdwingo mobile app to see react-native-instagram-stories in action!