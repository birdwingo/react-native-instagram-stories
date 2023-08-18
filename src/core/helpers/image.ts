/* eslint-disable global-require */
import { STORAGE_KEY } from '../constants';
import { InstagramStoryProps } from '../dto/instagramStoriesDTO';
import { ProgressStorageProps } from '../dto/helpersDTO';

const convertPath = ( path: string ) => `file://${path}`;

const getDownloadConfig = ( url: string ) => {

  try {

    const RNFetchBlob = require( 'react-native-fetch-blob' ).default;

    return { path: `${RNFetchBlob.fs.dirs.DocumentDir}/${STORAGE_KEY}/${url}` };

  } catch ( error ) {

    return { path: url };

  }

};

const downloadFile = async ( url: string ): Promise<string> => new Promise( ( resolve ) => {

  const fetchData = async () => {

    try {

      const RNFetchBlob = require( 'react-native-fetch-blob' ).default;
      RNFetchBlob.config( getDownloadConfig( url ) ).fetch( 'GET', url ).then( ( res: any ) => {

        resolve( convertPath( res.path() ) );

      } ).catch( () => {

        setTimeout( fetchData, 1000 );

      } );

    } catch ( error ) {

      resolve( url );

    }

  };

  fetchData();

} );

export const loadImage = async ( url: string ) => {

  try {

    const RNFetchBlob = require( 'react-native-fetch-blob' ).default;
    if ( await RNFetchBlob.fs.exists( getDownloadConfig( url ).path ) ) {

      return convertPath( getDownloadConfig( url ).path );

    }

    return await downloadFile( url );

  } catch ( error ) {

    return url;

  }

};

export const preloadStories = async (
  stories: InstagramStoryProps[],
  seen: ProgressStorageProps,
) => {

  const promises = stories.map( ( story ) => {

    const seenStoryIndex = story.stories.findIndex( ( item ) => item.id === seen[story.id] );
    const seenStory = story.stories[seenStoryIndex + 1] || story.stories[0];

    return loadImage( seenStory.imgUrl );

  } );

  await Promise.all( promises );

};
