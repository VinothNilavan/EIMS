import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  btmLeftAnimContainer: {
    width: getWp(113),
    position: 'absolute',
    bottom: getHp(56),
    left: 0,
  },
  btmRightAnimContainer: {
    width: getWp(110),
    position: 'absolute',
    bottom: getHp(52),
    right: 0,
  },
  topRightAnimContainer: {
    position: 'absolute',
    top: getHp(320),
    right: 0,
    width: getWp(100),
  },
  topLeftAnimContainer: {
    position: 'absolute',
    top: getHp(320),
    left: 0,
    width: getWp(100),
  },
  footerContainerStyle: {
    height: getHp(60),
  },
  headerContainer: { flex: 1, marginTop: 0 }
});
