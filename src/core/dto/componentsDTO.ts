import { SharedValue } from 'react-native-reanimated';
import {
  ImageProps, ImageStyle, TextProps, TextStyle, ViewStyle,
} from 'react-native';
import { ReactNode } from 'react';
import { InstagramStoriesProps, InstagramStoryProps, StoryItemProps } from './instagramStoriesDTO';
import { ProgressStorageProps } from './helpersDTO';

export interface StoryAvatarListProps {
  stories: InstagramStoryProps[];
  loadingStory: StoryAvatarProps['loadingStory'];
  seenStories: StoryAvatarProps['seenStories'];
  colors: StoryAvatarProps['colors'];
  seenColors: StoryAvatarProps['seenColors'];
  size: StoryAvatarProps['size'];
  showName: InstagramStoriesProps['showName'];
  nameTextStyle: InstagramStoriesProps['nameTextStyle'];
  nameTextProps: InstagramStoriesProps['nameTextProps'];
  avatarListContainerStyle: InstagramStoriesProps['avatarListContainerStyle'];
  avatarListContainerProps: InstagramStoriesProps['avatarListContainerProps'];
  avatarBorderRadius?: number;
  onPress: ( id: string ) => void;
}

export interface StoryAvatarProps extends InstagramStoryProps {
  loadingStory: SharedValue<string | undefined>;
  seenStories: SharedValue<ProgressStorageProps>;
  onPress: () => void;
  colors: string[];
  seenColors: string[];
  size: number;
  showName?: boolean;
  nameTextStyle?: TextStyle;
  nameTextProps?: TextProps;
  avatarBorderRadius?: number;
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
  progressActiveColor?: string;
  progressColor?: string;
  modalAnimationDuration?: number;
  storyAnimationDuration?: number;
  mediaContainerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
  imageProps?: ImageProps;
  footerComponent?: ReactNode;
  hideElementsOnLongPress?: boolean;
  hideOverlayViewOnLongPress?: boolean;
  loopingStories?: 'none' | 'all' | 'onlyLast';
  statusBarTranslucent?: boolean;
  onLoad: () => void;
  onShow?: ( id: string ) => void;
  onHide?: ( id: string ) => void;
  onSeenStoriesChange: ( user: string, value: string ) => void;
  onSwipeUp?: ( userId?: string, storyId?: string ) => void;
  onStoryStart?: ( userId?: string, storyId?: string ) => void;
  onStoryEnd?: ( userId?: string, storyId?: string ) => void;
}

export type StoryModalPublicMethods = {
  show: ( id: string ) => void;
  hide: () => void;
  pause: () => void;
  resume: () => void;
  goToPreviousStory: () => void;
  goToNextStory: () => void;
  getCurrentStory: () => { userId?: string, storyId?: string };
  goToSpecificStory: ( userId: string, index?: number ) => void;
};

export type GestureContext = {
  x: number,
  pressedX: number,
  pressedAt: number,
  moving: boolean,
  vertical: boolean,
  userId?: string,
};

export interface AnimationProps {
  children: React.ReactNode;
  x: SharedValue<number>;
  index: number;
}

export interface StoryImageProps {
  stories: InstagramStoryProps['stories'];
  activeStory: SharedValue<string | undefined>;
  defaultStory?: StoryItemProps;
  isDefaultVideo: boolean;
  paused: SharedValue<boolean>;
  videoProps?: any;
  mediaContainerStyle?: ViewStyle;
  isActive: SharedValue<boolean>;
  imageStyles?: ImageStyle;
  imageProps?: ImageProps;
  videoDuration?: number;
  onImageLayout: ( height: number ) => void;
  onLoad: ( duration?: number ) => void;
}

export interface StoryProgressProps {
  progress: SharedValue<number>;
  active: SharedValue<boolean>;
  activeStory: SharedValue<number>;
  length: number;
  progressActiveColor?: string;
  progressColor?: string;
  progressContainerStyle?: ViewStyle;
}

export interface StoryProgressItemProps extends Omit<StoryProgressProps, 'length'> {
  index: number;
  width: number;
}

export interface StoryHeaderProps {
  avatarSource: ImageProps['source'];
  name?: string;
  avatarSize: number;
  textStyle?: TextStyle;
  closeColor: string;
  headerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  onClose: () => void;
  renderStoryHeader?: () => ReactNode;
  onStoryHeaderPress?: () => void;
}

export interface IconProps {
  color: string;
}

export interface StoryContentProps {
  stories: InstagramStoryProps['stories'];
  active: SharedValue<boolean>;
  activeStory: SharedValue<string | undefined>;
}

export interface StoryListProps extends InstagramStoryProps, StoryHeaderProps {
  index: number;
  x: SharedValue<number>;
  activeUser: SharedValue<string | undefined>;
  activeStory: SharedValue<string | undefined>;
  progress: SharedValue<number>;
  seenStories: SharedValue<ProgressStorageProps>;
  paused: SharedValue<boolean>;
  videoProps?: any;
  progressActiveColor?: string;
  progressColor?: string;
  mediaContainerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
  imageProps?: ImageProps;
  progressContainerStyle?: ViewStyle;
  imageOverlayView?: ReactNode;
  hideElements: SharedValue<boolean>;
  hideOverlayViewOnLongPress?: boolean;
  videoDuration?: number;
  onLoad: ( duration?: number ) => void;
}

export interface StoryVideoProps {
  source: ImageProps['source'];
  paused: SharedValue<boolean>;
  isActive: SharedValue<boolean>;
  onLoad: ( duration: number ) => void;
  onLayout: ( height: number ) => void;
}
