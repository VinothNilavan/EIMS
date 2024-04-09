import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: getHp(200),
    backgroundColor: COLORS.progressBlue,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  roundBtn: { position: 'absolute', top: getHp(46), left: getWp(32) },
});
