import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftStarContainer: {
    justifyContent: 'center',
    position: 'absolute',
    left: -getWp(41.4),
  },
  leftStarLottie: { height: getWp(67) },
  finishFlag: { alignSelf: 'center' },
  imgContainer: {
    width: getWp(67),
    height: getWp(67),
    borderRadius: getWp(67),
    backgroundColor: COLORS.mapTextDarkBlue,
    justifyContent: 'center',
  },
  image: {
    height: getWp(67),
    width: getWp(67),
    borderRadius: getWp(67),
    alignSelf: 'center',
  },
  activeImgContainer: {
    backgroundColor: COLORS.white,
  },
  activeImg: {
    color: COLORS.mapTextDarkBlue,
  },
  rightStarContainer: {
    justifyContent: 'center',
    position: 'absolute',
    right: -getWp(45.5),
  },
  rightStarLottie: {
    height: getWp(67),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
});
