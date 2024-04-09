import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import DIMEN from '@constants/DIMEN';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  input: {
    textAlign: 'center',
    color: COLORS.placeholder,
    fontSize: hp(DIMEN.normalText),
    fontFamily: 'BalooThambi-Regular',
  },
});
