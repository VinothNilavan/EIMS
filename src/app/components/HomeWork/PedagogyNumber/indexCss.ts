import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pedagogyColor,
    borderRadius: 50,
    paddingHorizontal: wp('3.1'),
    paddingVertical: hp('0.4'),
  },
  text: {
    fontSize: wp('4.3'),
    color: COLORS.white,
  },
});
