import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  titleStyle: {
    fontSize: TEXTFONTSIZE.Text27,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: getHp(25),
    marginBottom: getHp(24),
  },

  filterItemStyle: {
    borderColor: COLORS.white,
    borderWidth: getWp(3),
    borderRadius: getHp(16),
    backgroundColor: COLORS.white,
    marginRight: getWp(18),
    alignItems: 'center',
  },

  textStyle: {
    color: COLORS.leaderBoardTitleColor,
    fontSize: TEXTFONTSIZE.Text18,
    paddingHorizontal: getWp(18),
    paddingVertical: getHp(10),
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  listContainerStyle: {
    alignItems: 'center',
    marginLeft: getWp(18),
  },

  selectedFilterItemStyle: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.orangeBg,
  },

  selectedTextStyle: {
    color: COLORS.white,
  },

  footerContainerStyle: {
    height: 0,
  },

  emptyMessageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyMessageText: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: getWp(20)
  }
});
