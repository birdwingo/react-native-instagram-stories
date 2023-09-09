import { SharedValue } from 'react-native-reanimated';
import { TextStyle, ViewStyle } from 'react-native';
import { InstagramStoryProps } from './instagramStoriesDTO';
import { ProgressStorageProps } from './helpersDTO';

export interface StoryAvatarProps extends InstagramStoryProps {
  loadingStory: SharedValue<string | undefined>;
  seenStories: SharedValue<ProgressStorageProps>;
  onPress: () => void;
  colors: string[];
  seenColors: string[];
  size: number;
  showName?: boolean;
  nameTextStyle?: TextStyle;
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
  videoDuration?: number;
  storyAvatarSize: number;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  videoProps?: any;
  closeIconColor: string;
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
  isDefaultVideo: boolean;
  paused: SharedValue<boolean>;
  videoProps?: any;
  onImageLayout: ( height: number ) => void;
  onLoad: ( duration?: number ) => void;
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
  imgUrl?: string;
  name?: string;
  avatarSize: number;
  textStyle?: TextStyle;
  buttonHandled: SharedValue<boolean>;
  closeColor: string;
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
  paused: SharedValue<boolean>;
  videoProps?: any;
  onLoad: ( duration?: number ) => void;
}

export interface StoryVideoProps {
  uri: string;
  paused: SharedValue<boolean>;
  onLoad: ( duration: number ) => void;
  onLayout: ( height: number ) => void;
}
