import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
    marginTop: getHp(35),
    textAlign: 'center',
  },

  filterView: {
    marginBottom: getHp(5),
  },

  headerTitileStyle: {
  },
  headerFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getHp(26),
    marginStart: getWp(12),
    marginEnd: getWp(12),
    marginBottom: 10
  },
});
