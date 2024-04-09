import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
    marginBottom: getHp(42),
  },

  childContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  UpperPagination: {
    justifyContent: 'flex-end',
    marginLeft: getHp(30),
    alignSelf: 'flex-end',
  },
  paginationButtonStyle: {
    marginTop: getHp(26),
    justifyContent: 'flex-end',
    marginLeft: getHp(30),
    alignSelf: 'flex-end',
  },

  filterStyle: {
    marginTop: getHp(26),
    justifyContent: 'flex-start',
    marginLeft: getHp(12),
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
    marginTop: getHp(35),
    marginStart: getWp(5),
    marginEnd: getWp(5),
    textAlign: 'center',
  },

  filterView: {
    marginBottom: getHp(5),
    flexDirection: 'row',
  },
});
