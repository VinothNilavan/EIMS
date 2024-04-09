import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  TextStyle: {
    color: COLORS.teacherTextColor,
    fontSize: TEXTFONTSIZE.Text16,
  },
  SourceSansProRegTextView: {
    fontFamily: 'SourceSansPro-Regular',
  },
  SourceSansProSemiBoldTextView: {
    fontFamily: 'SourceSansPro-SemiBold',
  },
  SourceSansProBoldTextView: {
    fontFamily: 'SourceSansPro-Bold',
  },
  RobotoBoldTextView: {
    fontFamily: 'Roboto-Bold',
  },
  RobotoRegTextView: {
    fontFamily: 'Roboto-Regular',
  },
  RobotoMediumTextView: {
    fontFamily: 'Roboto-Medium',
  },
  BalooThambiBoldTextView: {
    fontFamily: 'BalooThambi-Regular',
  },
  BalooThambiRegTextView: {
    fontFamily: 'BalooThambi-Regular',
  },
  BalooThambiMediumTextView: {
    fontFamily: 'BalooThambi-Regular',
  },
});
