import { createRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import * as Reanimated from 'react-native-reanimated';
import { Platform, View } from 'react-native';
import InstagramStories from '../src';
import { WIDTH } from '../src/core/constants';
import StoryAvatar from '../src/components/Avatar';
import StoryImage from '../src/components/Image';
import Loader from '../src/components/Loader';
import * as Storage from '../src/core/helpers/storage';

const reactions = new Map();

const sleep = async ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ?? 250 ) );
jest.spyOn( Reanimated, 'useAnimatedReaction' ).mockImplementation( ( value, cb ) => {

  if ( reactions.has( `${cb}` ) && reactions.get( `${cb}` ) === value() ) {

    return;

  }

  reactions.set( `${cb}`, value() );
  cb( value(), '' );

} );
jest.spyOn( Reanimated, 'useSharedValue' ).mockImplementation( ( value ) => ( { value } ) );
jest.spyOn( Storage, 'getProgressStorage' ).mockImplementation( () => ( {} ) );
jest.spyOn( Storage, 'setProgressStorage' ).mockImplementation( () => ( {} ) );

const stories = [ {
  id: '1',
  name: 'John Doe',
  imgUrl: 'https://picsum.photos/200/300',
  stories: [ {
    id: '1',
    sourceUrl: 'https://picsum.photos/200/300',
    renderContent: () => <View />,
  } ],
} ];

const stories2 = [ {
  id: '1',
  name: 'John Doe',
  imgUrl: 'https://picsum.photos/200/300',
  stories: [ {
    id: '1',
    sourceUrl: 'https://picsum.photos/200/300',
  } ],
}, {
  id: '2',
  name: 'John Doe 2',
  imgUrl: 'https://picsum.photos/200/300',
  stories: [ {
    id: '1',
    sourceUrl: 'https://picsum.photos/200/300',
  } ],
} ];

const stories3 = [ {
  id: '1',
  name: 'John Doe',
  imgUrl: 'https://picsum.photos/200/300',
  stories: [ {
    id: '1',
    sourceUrl: 'https://picsum.photos/200/300',
  }, {
    id: '2',
    sourceUrl: 'https://picsum.photos/200/300',
  } ],
} ];

const stories4 = [ {
  id: '1',
  name: 'John Doe',
  imgUrl: 'https://picsum.photos/200/300',
  stories: [ {
    id: '1',
    sourceUrl: 'https://picsum.photos/200/300',
    mediaType: 'video',
  } ],
}, {
  id: '2',
  name: 'John Doe 2',
  imgUrl: 'https://picsum.photos/200/300',
  stories: [ {
    id: '1',
    sourceUrl: 'https://picsum.photos/200/300',
    mediaType: 'video',
  } ],
} ];

describe( 'Instagram Stories test', () => {

  beforeEach( () => {

    reactions.clear();

  } );

  it( 'Should render the stories list', () => {

    const { getByTestId } = render( <InstagramStories stories={stories} /> );

    expect( getByTestId( 'storiesList' ) ).toBeTruthy();

  } );

  it( 'Should open story on press', async () => {

    const { getByTestId } = render( <InstagramStories stories={stories} showName /> );

    const story = getByTestId( '1StoryAvatar1Story' );
    expect( story ).toBeTruthy();

    await act( async () => {

      fireEvent( story, 'click' );
      await sleep();
      expect( getByTestId( 'storyModal' ) ).toBeTruthy();

    } );

  } );

  it( 'Should work with saveProgress', async () => {

    jest.spyOn( Storage, 'getProgressStorage' ).mockImplementation( () => ( { 1: '1' } ) );
    const { getByTestId, getAllByTestId } = render(
      <InstagramStories
        stories={stories2}
        saveProgress
      />,
    );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar1Story' ), 'click' );
      await sleep();

      getAllByTestId( 'storyAvatarImage' ).forEach( ( element ) => {

        element.props.onLoad();

      } );
      getAllByTestId( 'storyImageComponent' ).forEach( ( element ) => {

        element.props.onLoad();

      } );
      getAllByTestId( 'storyImageComponent' ).forEach( ( element ) => {

        element.props.onLayout( { nativeEvent: { layout: { height: 100 } } } );

      } );
      getAllByTestId( 'storyCloseButton' ).forEach( ( element ) => {

        fireEvent( element.parent, 'onPressIn', { nativeEvent: { locationX: 0, locationY: 0 } } );

      } );

    } );

  } );

  it( 'Should work if new seen story is older than saved', async () => {

    jest.spyOn( Storage, 'getProgressStorage' ).mockImplementation( () => ( { 1: '2' } ) );
    const { getByTestId } = render(
      <InstagramStories
        stories={stories3}
        saveProgress
      />,
    );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar2Story' ), 'click' );
      await sleep();

    } );

  } );

  it( 'Should work with public methods', async () => {

    const ref = createRef();

    const { getByTestId, queryByTestId } = render(
      <InstagramStories
        stories={stories}
        ref={ref}
        saveProgress
      />,
    );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar1Story' ), 'click' );
      await sleep();
      expect( getByTestId( 'storyModal' ) ).toBeTruthy();

    } );

    await act( async () => {

      ref.current.clearProgressStorage();

      ref.current.hide();

      await sleep();
      expect( queryByTestId( 'storyModal' ) ).toBeFalsy();

      ref.current.spliceStories( [ {
        id: '2',
        name: 'John Doe 2',
        imgUrl: 'https://picsum.photos/200/300',
        stories: [ {
          id: '1',
          sourceUrl: 'https://picsum.photos/200/300',
        } ],
      } ] );

      await sleep();

      ref.current.spliceStories( [ {
        id: '3',
        name: 'John Doe 3',
        imgUrl: 'https://picsum.photos/200/300',
        stories: [ {
          id: '1',
          sourceUrl: 'https://picsum.photos/200/300',
        } ],
      } ], -1 );

      await sleep();

      ref.current.spliceUserStories( [ {
        id: '2',
        sourceUrl: 'https://picsum.photos/200/300',
      } ], '1' );

      await sleep();

      ref.current.spliceUserStories( [ {
        id: '2',
        sourceUrl: 'https://picsum.photos/200/300',
      } ], '2', 2 );

      ref.current.spliceUserStories( [ {
        id: '2',
        sourceUrl: 'https://picsum.photos/200/300',
      } ], '20', 2 );

      await sleep();

      expect( getByTestId( '1StoryAvatar2Story' ) ).toBeTruthy();
      expect( getByTestId( '2StoryAvatar2Story' ) ).toBeTruthy();
      expect( getByTestId( '3StoryAvatar1Story' ) ).toBeTruthy();

      ref.current.setStories( stories );

      await sleep();

      expect( getByTestId( '1StoryAvatar1Story' ) ).toBeTruthy();

      ref.current.show();
      ref.current.show('1');

    } );

  } );

  it( 'Should not open if empty array', async () => {

    const ref = createRef();

    const { queryByTestId } = render(
      <InstagramStories
        stories={[]}
        ref={ref}
        saveProgress
      />,
    );

    await act( async () => {

      ref.current.show();

      await sleep();

      expect( queryByTestId( 'storyModal' ) ).toBeFalsy();

    } );

  } );

  it( 'Should work animations', async () => {

    const { getByTestId, queryByTestId } = render( <InstagramStories stories={stories} /> );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar1Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderStart', { x: 0 }, {} );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderMove', {
        x: 0, velocityX: 0, velocityY: 10, translationY: 10,
      }, { x: 0 } );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderMove', {
        x: 0, velocityX: 10, velocityY: 0, translationX: 10,
      }, { x: 0 } );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', { translationY: 10 }, { vertical: true } );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, { moving: true, x: 10 } );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, { moving: true, x: 300 } );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, { moving: true, x: -300 } );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', { translationY: 200 }, { vertical: true } );
      await sleep();

      expect( queryByTestId( 'gestureContainer' ) ).toBeFalsy();

    } );

  } );

  it( 'Should not continue if button pressed', async () => {

    jest.spyOn( Reanimated, 'useSharedValue' ).mockImplementation( ( value ) => ( { value: value === false ? true : value } ) );
    const { getByTestId } = render( <InstagramStories stories={stories} /> );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar1Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, {} );
      await sleep();

    } );

  } );

  it( 'Should close with swipe down', async () => {

    jest.spyOn( Reanimated, 'useSharedValue' ).mockImplementation( ( value ) => ( { value } ) );
    const { getByTestId, queryByTestId } = render( <InstagramStories stories={stories} /> );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar1Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', { translationY: 200 }, { vertical: true } );
      await sleep();

      expect( queryByTestId( 'gestureContainer' ) ).toBeFalsy();

    } );

  } );

  it( 'Should go to next story', async () => {

    const { getByTestId } = render( <InstagramStories stories={stories3} /> );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar2Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, {} );
      await sleep();

    } );

  } );

  it( 'Should go to next user', async () => {

    const { getByTestId } = render( <InstagramStories stories={stories2} /> );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar1Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, {} );
      await sleep();

    } );

  } );

  it( 'Should go to previous story', async () => {

    jest.spyOn( Reanimated, 'useSharedValue' ).mockImplementation( ( value ) => ( { value: value === '1' ? '2' : value } ) );

    const { getByTestId } = render( <InstagramStories stories={stories3} /> );

    await act( async () => {

      fireEvent( getByTestId( '1StoryAvatar2Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, { pressedX: 0, pressedAt: Date.now() } );
      await sleep();

    } );

  } );

  it( 'Should go to previous user + work for android', async () => {

    Platform.OS = 'android';
    jest.spyOn( Reanimated, 'useSharedValue' ).mockImplementation( ( value ) => ( { value: value === 0 ? 500 : value } ) );
    jest.spyOn( Reanimated, 'interpolate' ).mockImplementation( () => WIDTH );

    const { getByTestId } = render( <InstagramStories stories={stories2} /> );

    await act( async () => {

      fireEvent( getByTestId( '2StoryAvatar1Story' ), 'click' );
      await sleep();

      fireEvent( getByTestId( 'gestureContainer' ), 'responderEnd', {}, { pressedX: 0, pressedAt: Date.now() } );
      await sleep();

    } );

  } );

  it( 'Should work with video', async () => {

    const { getByTestId } = render( <InstagramStories stories={stories4} /> );

    await act( async () => {

      fireEvent( getByTestId( '2StoryAvatar1Story' ), 'click' );
      await sleep();

    } );

  } );

  it( 'Should work with empty array', async () => {

    render( <InstagramStories stories={[ {
      id: '1',
      name: 'John Doe',
      imgUrl: 'https://picsum.photos/200/300',
      stories: [],
    } ]} /> );

  } );

  it( 'Should work with video & default duration', async () => {

    const { getByTestId } = render( <InstagramStories stories={stories4} videoAnimationMaxDuration={1000} /> );

    await act( async () => {

      fireEvent( getByTestId( '2StoryAvatar1Story' ), 'click' );
      await sleep();

    } );

  } );

} );

describe( 'StoryAvatar test', () => {

  it( 'Should work with seenStories & call onPress', () => {

    jest.spyOn( Reanimated, 'useSharedValue' ).mockImplementation( ( value ) => ( { value: value === false ? true : value } ) );
    const callback = jest.fn();
    const { getByTestId } = render( <StoryAvatar {...stories[0]} seenStories={{ value: { 1: '1' } }} loadingStory={{ value: '2' }} onPress={callback} colors={[ '#FFF' ]} seenColors={[ '#FFF' ]} size={50} /> );

    expect( getByTestId( '1StoryAvatar1Story' ) ).toBeTruthy();

    act( () => {

      fireEvent.press( getByTestId( '1StoryAvatar1Story' ) );
      expect( callback ).toHaveBeenCalled();

    } );

  } );

} );

describe( 'Loader test', () => {

  it( 'Should work with empty stories', () => {

    jest.spyOn( Reanimated, 'useAnimatedReaction' ).mockImplementation( ( value, cb ) => cb( typeof value() !== 'boolean' ? [ '#AAA' ] : value() ) );
    render( <Loader loading={{ value: false }} color={{ value: [ '#FFF' ] }} /> );

  } );

} );

describe( 'Story Image test', () => {

  it( 'Should work with wrong story', () => {

    render( <StoryImage stories={stories[0].stories} active={{ value: true }} activeStory={{ value: '2' }} defaultImage="url" paused={{ value: true }} isActive={{ value: true }} /> );

  } );

  it( 'Should work if story already loaded', async () => {

    jest.spyOn(Reanimated, 'useSharedValue').mockImplementation((value) => ({ value: value === true ? false : value }));

    const onLoad = jest.fn();

    render( <StoryImage
      stories={[ { id: '1', sourceUrl: '' } ]}
      active={{ value: true }}
      activeStory={{ value: '1' }}
      defaultImage="url"
      onLoad={onLoad}
      paused={{ value: true }}
      isActive={{ value: true }}
    /> );

    expect( onLoad ).toHaveBeenCalled();

  } );

} );
