import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  attemptsHeading: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
    textAlign: 'center',
  },

  listContainerStyle: {
    marginBottom: getHp(120),
  },

  headerFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getHp(26),
    marginStart: getWp(12),
    marginEnd: getWp(12),
    marginBottom: getHp(12),
  },
  attemptsHeadingEmpty: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: getWp(10),
    bottom: getWp(0) 
  },
  searchIcon: {
    alignSelf: 'center',
    right: 5
  },
  warningText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
});
