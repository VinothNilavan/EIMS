import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  btnContainer: {
    backgroundColor: COLORS.btnColor,
  },
  text: {
    color: 'white',
    fontFamily: 'BalooThambi-Regular',
    fontSize: wp('3.1'),
  },
  icon: { color: 'white', fontSize: wp('3.6') },
});
