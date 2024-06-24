import { ReactNode } from 'react';
import {
  ImageProps,
  ImageStyle,
  ScrollViewProps, TextStyle, ViewStyle,
} from 'react-native';
import { TextProps } from 'react-native-svg';

export interface StoryItemProps {
  id: string;
  /**
    * @deprecated Use {@link source} instead (set source to {uri: 'your url'}).
  */
  sourceUrl?: string;
  source: ImageProps['source'];
  mediaType?: 'image' | 'video';
  animationDuration?: number;
  renderContent?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

export interface InstagramStoryProps {
  id: string;
  imgUrl?: string;
  renderAvatar?: () => ReactNode;
  renderStoryHeader?: () => ReactNode;
  name?: string;
  stories: StoryItemProps[];
}

export interface InstagramStoriesProps {
  stories: InstagramStoryProps[];
  saveProgress?: boolean;
  avatarBorderColors?: string[];
  avatarSeenBorderColors?: string[];
  avatarSize?: number;
  storyAvatarSize?: number;
  /**
    * @deprecated Use {@link avatarListContainerStyle} instead.
  */
  listContainerStyle?: ScrollViewProps['contentContainerStyle'];
  avatarListContainerStyle?: ScrollViewProps['contentContainerStyle'];
  /**
    * @deprecated Use {@link avatarListContainerProps} instead.
  */
  listContainerProps?: ScrollViewProps;
  avatarListContainerProps?: ScrollViewProps;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  animationDuration?: number;
  videoAnimationMaxDuration?: number;
  backgroundColor?: string;
  showName?: boolean;
  nameTextStyle?: TextStyle;
  nameTextProps?: TextProps;
  videoProps?: any;
  closeIconColor?: string;
  progressActiveColor?: string;
  progressColor?: string;
  modalAnimationDuration?: number;
  storyAnimationDuration?: number;
  mediaContainerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
  imageProps?: ImageProps;
  isVisible?: boolean;
  headerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  progressContainerStyle?: ViewStyle;
  hideAvatarList?: boolean;
  imageOverlayView?: ReactNode;
  hideElementsOnLongPress?: boolean;
  onShow?: ( id: string ) => void;
  onHide?: ( id: string ) => void;
  onSwipeUp?: ( userId?: string, storyId?: string ) => void;
  onStoryStart?: ( userId?: string, storyId?: string ) => void;
  onStoryEnd?: ( userId?: string, storyId?: string ) => void;
}

export type InstagramStoriesPublicMethods = {
  spliceStories: ( stories: InstagramStoryProps[], index?: number ) => void;
  spliceUserStories: ( stories: StoryItemProps[], user: string, index?: number ) => void;
  setStories: ( stories: InstagramStoryProps[] ) => void;
  clearProgressStorage: () => void;
  hide: () => void;
  show: ( id?: string ) => void;
  pause: () => void;
  resume: () => void;
  goToPreviousStory: () => void;
  goToNextStory: () => void;
  getCurrentStory: () => { userId?: string, storyId?: string };
};
