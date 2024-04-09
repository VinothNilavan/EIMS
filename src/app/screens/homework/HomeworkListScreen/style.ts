import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  shadeTopContainer: {
    width: getWp(321),
    height: getHp(30),
    position: 'absolute',
    top: getHp(85),
    right: 0,
  },

  shadeBottomContainer: {
    width: getWp(321),
    height: getHp(30),
    position: 'absolute',
    bottom: getHp(200),
    right: 0,
  },

  contentContainer: {
    flex: 1,
    zIndex: 100,

  },
  emptyStateText: {
    textAlign: 'center',
    marginHorizontal: 10,
    fontSize: TEXTFONTSIZE.Text20,
    alignSelf: 'center',
    color: COLORS.white,
  },
  emptyStateIcon: {
    alignSelf: 'center',
    top: 60,
    right: 8,
  },
  emptyContainer: {
    alignSelf: 'center',
    flex: 1,
    marginVertical: getWp(10),
    padding: getWp(10),
    marginHorizontal: getWp(10),
  },
  textColor: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text20,
  },
  goHomeBtnContainer: {
    marginTop: getWp(15),
    borderRadius: getWp(0),
    alignSelf: 'center',
  },
  modalContainerAlertStyle: {
    backgroundColor: COLORS.subtitleDarkBlue,
    paddingBottom: 0,
  },
  errorView: {
    padding: getWp(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: COLORS.white,
    fontSize: getWp(28),
    paddingTop: 16,
  },
  secondaryTextStyle: {
    color: COLORS.white,
    marginBottom: getHp(16),
    textAlign: 'center',
  }

});
