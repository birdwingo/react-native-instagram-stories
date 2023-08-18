import { ReactNode } from 'react';
import { ScrollViewProps, TextStyle, ViewStyle } from 'react-native';

export interface StoryItemProps {
  id: string;
  imgUrl: string;
  renderContent?: () => ReactNode;
}

export interface InstagramStoryProps {
  id: string;
  imgUrl: string;
  name: string;
  stories: StoryItemProps[];
}

export interface InstagramStoriesProps {
  stories: InstagramStoryProps[];
  saveProgress?: boolean;
  preloadImages?: boolean;
  avatarBorderColors?: string[];
  avatarSeenBorderColors?: string[];
  avatarSize?: number;
  storyAvatarSize?: number;
  listContainerStyle?: ScrollViewProps['contentContainerStyle'];
  listContainerProps?: ScrollViewProps;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  animationDuration?: number;
  backgroundColor?: string;
  showName?: boolean;
  nameTextStyle?: TextStyle;
  onShow?: ( id: string ) => void;
  onHide?: ( id: string ) => void;
}

export type InstagramStoriesPublicMethods = {
  spliceStories: ( stories: InstagramStoryProps[], index?: number ) => void;
  spliceUserStories: ( stories: StoryItemProps[], user: string, index?: number ) => void;
  setStories: ( stories: InstagramStoryProps[] ) => void;
  clearProgressStorage: () => void;
  hide: () => void;
};
