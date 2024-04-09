import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  main: {
    flex: 1,
    width: getWp(306),
    height: getHp(720),
    marginTop: getHp(40),
    borderRadius: getWp(25),
  },
  parentWhite: {
    width: '100%',
    borderRadius: getWp(25),
    backgroundColor: COLORS.white,
  },

  NavHeader: {
    marginTop: getHp(25),
    backgroundColor: 'transparent',
  },

  parentBlue: {
    height: getHp(600),
    width: '100%',
    borderRadius: getWp(25),
  },
  scrollViewStyle: {
    width: '100%',
    height: getHp(529),
    marginBottom: getHp(70),
    paddingTop: getHp(10),
  },
  yellowFooter: {
    backgroundColor: COLORS.yellow,
    position: 'absolute',
    bottom: 0,
    width: getWp(306),
    height: getHp(18),
    borderBottomLeftRadius: getWp(25),
    borderBottomRightRadius: getHp(25),
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  btmRightAnimContainer: {
    width: '50%',
    position: 'absolute',
    bottom: 0,
    right: getWp(16),
  },
});
