import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getWp, getHp } from '@utils';
import { COLORS } from '@constants';

export default StyleSheet.create({
  dragContainQuestionBucketView: {
    zIndex: -10,
    marginTop: hp(2),
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(3),
  },

  RTLDragContainQuestionBucketView: {
    zIndex: -10,
    marginTop: hp(2),
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    marginBottom: hp(3),
  },

  elevatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(145),
    minHeight: getHp(60),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderWidth: getWp(2),
    borderRadius: getWp(5),
    borderColor: COLORS.dotLineColor,
    borderStyle: 'dotted',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
  },

  dragContainQuestionParentView: {
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },

  RTLDragContainQuestionParentView: {
    zIndex: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },

  styleFlatList: {
    justifyContent: 'center',
  },

  questionAnswerSeprator: {
    marginVertical: 100,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
  },

  separateView: {
    height: getWp(0.5),
    width: getWp(390),
    marginTop: getWp(10),
    // marginBottom: getWp(10),
    backgroundColor: COLORS.sortListSeparateColor,
  },

  webViewContainer: {
    width: getWp(380),
    marginLeft: getWp(-10),
  }
});
