import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    width: getWp(48),
    height: getHp(48),
    backgroundColor: COLORS.picturePasswordBdr,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selected: {
    borderColor: COLORS.red,
    borderRadius: 10,
    borderWidth: 2,
  },
});
