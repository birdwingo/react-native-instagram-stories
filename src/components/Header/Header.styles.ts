import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 16,
    top: 32,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    borderWidth: 1.5,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
} );
