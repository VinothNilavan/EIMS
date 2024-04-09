import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { getHp } from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: getHp(10),
    marginBottom: getHp(50),
  },
  itemContainer: { flex: 1, alignItems: 'center' },
  svgTextStyle: { color: COLORS.white },
});
