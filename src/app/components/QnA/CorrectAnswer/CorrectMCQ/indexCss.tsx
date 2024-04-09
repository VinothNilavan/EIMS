import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    maxWidth: wp('100'),
    height: hp('9'),
    borderWidth: wp('0.7'),
    borderRadius: wp('6'),
    marginTop: hp('1'),
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLORS.secondaryBlack,
    paddingHorizontal: wp('2')
  },

  RTLContainer: {
    width: wp('60'),
    height: hp('9'),
    borderWidth: wp('0.7'),
    borderRadius: wp('6'),
    marginTop: hp('1'),
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    borderColor: COLORS.secondaryBlack,
  },

  text: { fontSize: TEXTFONTSIZE.Text24, alignSelf: 'center' },

  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: wp('2'),
    marginEnd: wp('2'),
    borderRadius: wp('7'),
    width: wp('7'),
    alignSelf: 'center',
    height: wp('7'),
    backgroundColor: COLORS.explanationGreen,
  },

  optionText: {
    color: COLORS.white,
  },

  displayAnswerText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.titleDarkBlue,
  },

  RTLDisplayAnswerText: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'right',
  },
  webViewContainer: {
    width: getWp(350),
  },
});
