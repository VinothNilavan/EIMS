import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    borderTopWidth: getHp(4.5),
    marginBottom: getHp(89),
    marginTop: getHp(18),
    width: '100%',
    backgroundColor: COLORS.explanationBg,
  },

  correctWrongLabelContainer: {
    marginStart: getWp(21),
  },

  RTLCorrectWrongLabelContainer: {
    // marginRight: getWp(21),
    alignItems: 'flex-end',
  },

  webviewContainer: {
    marginBottom: getHp(45),
    width: getWp(363),
    // alignSelf: 'center',
    // marginTop: getHp(18),
    marginLeft: getWp(16),
    // backgroundColor: 'red',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getWp(16),
    // marginBottom: getWp(16),
    // marginLeft: getWp(12),
  },

  RTLtitleContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: getWp(16),
    marginBottom: getWp(16),
    // marginLeft: getWp(12),
  },

  titleText: {
    fontSize: TEXTFONTSIZE.Text20,
    alignSelf: 'center',
    color: COLORS.titleDarkBlue,
    marginLeft: getWp(16),
    marginRight: getWp(16),
  },

  correctAnsSubtitleText: {
    fontSize: TEXTFONTSIZE.Text16,
    paddingVertical: 8,
    fontWeight: 'bold',
    color: COLORS.blackText
  },

  soundIconContainer: {
    width: getWp(46),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
