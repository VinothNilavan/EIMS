import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getWp } from '@utils';

export default StyleSheet.create({
  matchTypeQuestionView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(3),
  },

  RTLMatchTypeQuestionView: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    marginTop: hp(3),
  },

  dragOptionConatainer: {
    marginLeft: hp(1),
  },

  RTLDragOptionConatainer: {
    marginRight: hp(1),
  },

  webViewContainer: {
    width: getWp(380),
    marginLeft: getWp(-10),
  }
});
