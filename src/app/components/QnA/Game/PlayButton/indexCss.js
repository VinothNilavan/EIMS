import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWp(37),
    backgroundColor: COLORS.white,
    width: getWp(37),
    height: getWp(37),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  svg: {
    width: getWp(16),
    height: getHp(20)
  },
});
