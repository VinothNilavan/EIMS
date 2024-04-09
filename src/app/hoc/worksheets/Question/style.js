import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  parentContainer: {
    flexDirection: 'column',
    paddingVertical: getHp(24),
    flex: 1,
  },

  orderOptionContainer: {
    marginLeft: getWp(0),
  },

  container: {
    flexDirection: 'row',
    flex: 1,
  },

  questionNumber: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.blackText,
  },

  webViewStyle: {
    width: wp('75%'),
    minHeight: getHp(50),
    marginTop: getHp(2),
    marginLeft: getWp(5),
    marginBottom: getHp(20),
  },

  matchQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
    width: '95%',
    marginStart: wp(2),
    marginBottom: hp(2),
  },
  answerContainer: {
    flexDirection: 'column',
  },
});
