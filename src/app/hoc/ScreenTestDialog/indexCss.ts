import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
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
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(43),
    borderWidth: getWp(5),
    borderColor: COLORS.infoContainerBdr,
    alignItems: 'center',
    width: getWp(375),
    alignSelf: 'center',
    paddingBottom: getHp(40),
  },

  titleContainer: {
    flexDirection: 'row',
    width: getWp(271),
    height: getHp(128),
    marginTop: getWp(45),
    alignItems: 'center',
    justifyContent: 'center',
  },

  svgBackgroundImage: {
    position: 'absolute',
  },

  titleText: {
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.statTextColor,
  },

  descriptionText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'center',
    marginLeft: getWp(24),
    marginRight: getWp(24),
    marginTop: getHp(30),
    marginBottom: getHp(40),
  },

  soundIconContainer: {
    width: getWp(56),
    height: getWp(56),
    borderRadius: getWp(15),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: getWp(-28),
    right: getWp(28),
    zIndex: 1,
  },
});
