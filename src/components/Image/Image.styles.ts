import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 8,
    backgroundColor: '#FAFAFA',
    position: 'absolute',
    borderRadius: 10,
    bottom: 30,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#495BD4',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
} );
