import { STORAGE_KEY } from '../constants';
import { ProgressStorageProps } from '../dto/helpersDTO';

export const clearProgressStorage = () => {

  // eslint-disable-next-line global-require
  const AsyncStorage = require( '@react-native-async-storage/async-storage' ).default;

  AsyncStorage.removeItem( STORAGE_KEY );

};

export const getProgressStorage = async (): Promise<ProgressStorageProps> => {

  // eslint-disable-next-line global-require
  const AsyncStorage = require( '@react-native-async-storage/async-storage' ).default;

  const progress = await AsyncStorage.getItem( STORAGE_KEY );

  return progress ? JSON.parse( progress ) : {};

};

export const setProgressStorage = async ( user: string, lastSeen: string ) => {

  const progress = await getProgressStorage();
  progress[user] = lastSeen;

  // eslint-disable-next-line global-require
  const AsyncStorage = require( '@react-native-async-storage/async-storage' ).default;

  await AsyncStorage.setItem( STORAGE_KEY, JSON.stringify( progress ) );

  return progress;

};
