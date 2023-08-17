import { ReactNode } from 'react';
import { ScrollViewProps } from 'react-native';

export interface StoryItemProps {
  id: string;
  imgUrl: string;
  content: ReactNode;
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
  avatarBorderColors?: string[];
  avatarSeenBorderColor?: string[];
  avatarSize?: number;
  storyAvatarSize?: number;
  listContainerStyle?: ScrollViewProps['contentContainerStyle'];
  listContainerProps?: ScrollViewProps;
  animationDuration?: number;
  onShow?: ( id: string ) => void;
  onHide?: ( id: string ) => void;
}

export type InstagramStoriesPublicMethods = {
  spliceStories: ( stories: InstagramStoryProps[], index: number ) => void;
  spliceUserStories: ( stories: StoryItemProps[], user: string, index: number ) => void;
  setStories: ( stories: InstagramStoryProps[] ) => void;
  clearProgressStorage: () => void;
};
