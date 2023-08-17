import { StyleSheet } from 'react-native';
import { PROGRESS_COLOR } from '../../core/constants';

export default StyleSheet.create( {
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
    height: 2,
    flexDirection: 'row',
    gap: 4,
  },
  item: {
    height: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemActive: {
    backgroundColor: '#FFF',
  },
  itemInactive: {
    backgroundColor: PROGRESS_COLOR,
  },
} );
