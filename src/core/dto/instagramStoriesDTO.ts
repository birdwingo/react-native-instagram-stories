import { ReactNode } from 'react';
import { ScrollViewProps, TextStyle, ViewStyle } from 'react-native';

export interface StoryItemProps {
  id: string;
  sourceUrl: string;
  mediaType?: 'image' | 'video';
  renderContent?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

export interface InstagramStoryProps {
  id: string;
  imgUrl?: string;
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
  listContainerStyle?: ScrollViewProps['contentContainerStyle'];
  listContainerProps?: ScrollViewProps;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  animationDuration?: number;
  videoAnimationMaxDuration?: number;
  backgroundColor?: string;
  showName?: boolean;
  nameTextStyle?: TextStyle;
  videoProps?: any;
  closeIconColor?: string;
  progressActiveColor?: string;
  progressColor?: string;
  modalAnimationDuration?: number;
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
  getCurrentStory: () => { userId?: string, storyId?: string };
};
