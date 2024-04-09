import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/COLORS';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: COLORS.statBoxBorder,
    borderWidth: 1,
    borderRadius: getWp(10),
  },
  itemContainer: {flex: 1, alignItems: 'center', paddingTop: getHp(5)},
  itemContainerBorder: {
    borderRightColor: COLORS.statBoxBorder,
    borderRightWidth: 1,
  },
});
