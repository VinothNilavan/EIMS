import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp } from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  RTLContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },

  itemContainer: { marginHorizontal: getHp(5.8) },

  svgTextStyle: { color: COLORS.titleDarkestBlue },
});
