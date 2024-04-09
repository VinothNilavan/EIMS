import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
    textAlign: 'center',
    padding: 0,
    marginTop: getHp(40),
    marginBottom: getHp(18),
  },

  container: {
    flex: 1,
    paddingHorizontal: getWp(16),
    top: getHp(25),
  },

  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: Platform.OS === 'ios' ? null : getHp(50),
    padding: 0,
  },

  messageListContainer: {
    flex: 1,
    backgroundColor: COLORS.boderColor,
    marginTop: getWp(20),
    borderTopLeftRadius: getWp(10),
    borderTopRightRadius: getWp(10),
    marginBottom : getWp(20)
  },

  searchHeader: {
    paddingLeft: getWp(24),
    paddingRight: getWp(18),
    backgroundColor: COLORS.messagesSearchBg,
    borderTopLeftRadius: getWp(10),
    borderTopRightRadius: getWp(10),
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: getHp(50),
  },

  searchText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text14,
    marginLeft: getWp(12),
    flex: 1,
  },

  filterContainer: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWp(14),
    height: getHp(30),
  },

  filerTitle: {
    color: COLORS.lightBlue,
    fontSize: TEXTFONTSIZE.Text14,
    textAlign: 'center',
  },

  searchCountStyle: {
    color: COLORS.infoMessageGray,
    fontSize: TEXTFONTSIZE.Text14,
    marginVertical: getHp(10),
    textAlign: 'center',
    bottom: getWp(50),
    paddingHorizontal: getWp(20)
  },
  footerContainerStyle: {
    height: 0,

  },
  btnStyle: {
    width: '100%',
    height: getHp(70),
  },
  searchIconStyle: {
    width: getWp(16),
    height: getWp(16),
  },
  emptyStateIcon: {
    alignSelf: 'center'
  }
});
