import RNFetchBlob from 'react-native-blob-util';
import { STORAGE_KEY } from '../constants';
import { InstagramStoryProps } from '../dto/instagramStoriesDTO';
import { ProgressStorageProps } from '../dto/helpersDTO';

const getDownloadConfig = ( url: string, name: string ) => ( {
  path: `${RNFetchBlob.fs.dirs.DocumentDir}/${STORAGE_KEY}/${name}${url}`,
} );

const downloadFile = async (
  url: string,
  name: string,
): Promise<string> => new Promise( ( resolve ) => {

  const fetchData = async () => {

    RNFetchBlob.config( getDownloadConfig( url, name ) ).fetch( 'GET', url ).then( ( res ) => {

      resolve( res.path() );

    } ).catch( () => {

      setTimeout( fetchData, 1000 );

    } );

  };

  fetchData();

} );

export const loadImage = async ( url: string, name: string ) => {

  if ( await RNFetchBlob.fs.exists( getDownloadConfig( url, name ).path ) ) {

    return getDownloadConfig( url, name ).path;

  }

  return downloadFile( url, name );

};

export const preloadStories = async (
  stories: InstagramStoryProps[],
  seen: ProgressStorageProps,
) => {

  const promises = stories.map( ( story ) => {

    const seenStoryIndex = story.stories.findIndex( ( item ) => item.id === seen[story.id] );
    const seenStory = story.stories[seenStoryIndex + 1] || story.stories[0];

    return loadImage( seenStory.imgUrl, seenStory.id );

  } );

  await Promise.all( promises );

};
