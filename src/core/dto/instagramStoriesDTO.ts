import { ReactNode } from 'react';
import {
  ImageProps,
  ImageStyle,
  ScrollViewProps, TextStyle, ViewStyle, TextProps,
} from 'react-native';
import { FlashListProps } from '@shopify/flash-list';

export interface StoryItemProps {
  id: string;
  source: ImageProps['source'];
  mediaType?: 'image' | 'video';
  animationDuration?: number;
  renderContent?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

export interface InstagramStoryProps {
  id: string;
  avatarSource: ImageProps['source'];
  renderAvatar?: ( seen: boolean ) => ReactNode;
  renderStoryHeader?: () => ReactNode;
  onStoryHeaderPress?: () => void;
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
  avatarListContainerStyle?: ScrollViewProps['contentContainerStyle'];
  avatarListContainerProps?: ScrollViewProps | Partial<FlashListProps<InstagramStoryProps>>;
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
  imageProps?: Omit<ImageProps, 'source'>;
  isVisible?: boolean;
  headerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  progressContainerStyle?: ViewStyle;
  hideAvatarList?: boolean;
  imageOverlayView?: ReactNode;
  hideElementsOnLongPress?: boolean;
  hideOverlayViewOnLongPress?: boolean;
  loopingStories?: 'none' | 'all' | 'onlyLast';
  statusBarTranslucent?: boolean;
  footerComponent?: ReactNode;
  avatarBorderRadius?: number;
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
  goToSpecificStory: ( userId: string, index?: number ) => void;
};
