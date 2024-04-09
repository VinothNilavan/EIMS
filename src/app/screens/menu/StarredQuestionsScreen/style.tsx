import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({

  dropDownContainer: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: getWp(13),
    paddingVertical: getHp(10),
    paddingHorizontal: getWp(16),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: getHp(55),
    marginBottom: getWp(15)
  },

  arrowDownStyle: {
    position: 'absolute',
    right: 25,
  },

  flexOne: {
    flex: 1,
  },
  filterStyle: {
    marginTop: getHp(26),
  },
  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    padding: 0,
    marginBottom: getWp(10),
  },

  desc: {
    fontSize: TEXTFONTSIZE.Text20,
    marginBottom: getWp(2),
  },

  contentStyle: {
    alignItems: 'center',
    marginHorizontal: getWp(16),
    marginTop: getHp(10),
  },
  footerContainerStyle: {
    height: getHp(79),
  },
  listContainerStyle: {
    marginBottom: getHp(120),
    // top: 15
  },
  searchIcon: {
    alignSelf: 'center',
    right: 5
  },

  emptyStateBottomSixty: {
    bottom: 60
  },

  goHomeBtnContainer: {
    marginTop: getWp(25),
    borderRadius: getWp(0),
    alignSelf: 'center',
    bottom: getWp(50)
  },

  emptyStateContainer: {
    textAlign: 'center',
    paddingHorizontal: 10,
    color: 'white',
    bottom: 50
  }
});