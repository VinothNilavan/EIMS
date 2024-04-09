import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  carousel: {
    width: wp(100),
    height: hp(10),
  },
  slider: {
    paddingBottom: 0,
  },
  sliderContentContainer: { },
  paginationContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  paginationDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 1,
  },
  sliderHeight: hp(50),
});
