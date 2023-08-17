import { SharedValue } from 'react-native-reanimated';
import { TextStyle, ViewStyle } from 'react-native';
import { InstagramStoryProps } from './instagramStoriesDTO';
import { ProgressStorageProps } from './helpersDTO';

export interface StoryAvatarProps extends InstagramStoryProps {
  loadingStory: SharedValue<string | undefined>;
  seenStories: SharedValue<ProgressStorageProps>;
  onPress: () => void;
  colors?: string[];
  seenColors?: string[];
  size?: number;
}

export interface StoryLoaderProps {
  loading: SharedValue<boolean>;
  color: SharedValue<string[]>;
  size?: number;
}

export interface StoryModalProps {
  stories: InstagramStoryProps[];
  seenStories: SharedValue<ProgressStorageProps>;
  duration: number;
  storyAvatarSize: number;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  preloadImages: boolean;
  onLoad: () => void;
  onShow?: ( id: string ) => void;
  onHide?: ( id: string ) => void;
  onSeenStoriesChange: ( user: string, value: string ) => void;
}

export type StoryModalPublicMethods = {
  show: ( id: string ) => void;
  hide: () => void;
};

export type GestureContext = {
  x: number,
  pressedX: number,
  pressedAt: number,
  moving: boolean,
  vertical: boolean,
};

export interface AnimationProps {
  children: React.ReactNode;
  x: SharedValue<number>;
  index: number;
}

export interface StoryImageProps {
  stories: InstagramStoryProps['stories'];
  active: SharedValue<boolean>;
  activeStory: SharedValue<string>;
  defaultImage: string;
  preloadImages: boolean;
  onImageLayout: ( height: number ) => void;
  onLoad: () => void;
}

export interface StoryProgressProps {
  progress: SharedValue<number>;
  active: SharedValue<boolean>;
  activeStory: SharedValue<number>;
  length: number;
}

export interface StoryProgressItemProps extends Omit<StoryProgressProps, 'length'> {
  index: number;
  width: number;
}

export interface StoryHeaderProps {
  imgUrl: string;
  name: string;
  avatarSize: number;
  textStyle?: TextStyle;
  buttonHandled: SharedValue<boolean>;
  onClose: () => void;
}

export interface IconProps {
  color: string;
}

export interface StoryContentProps {
  stories: InstagramStoryProps['stories'];
  active: SharedValue<boolean>;
  activeStory: SharedValue<string>;
}

export interface StoryListProps extends InstagramStoryProps, StoryHeaderProps {
  index: number;
  x: SharedValue<number>;
  activeUser: SharedValue<string>;
  activeStory: SharedValue<string>;
  progress: SharedValue<number>;
  seenStories: SharedValue<ProgressStorageProps>;
  preloadImages: boolean;
  onLoad: () => void;
}
