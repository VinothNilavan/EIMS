import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  dragContainQuestionParentView: {
    marginTop: getHp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },

  RTLDragContainQuestionParentView: {
    marginTop: hp(3),
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },

  sortListAnswerContainer: {
    zIndex: -10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    marginBottom: hp(1),
  },

  RTLSortListAnswerContainer: {
    zIndex: -10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    marginBottom: hp(5),
  },

  separateView: {
    height: getWp(0.5),
    width: getWp(390),
    marginTop: getWp(20),
    marginBottom: getWp(20),
    backgroundColor: COLORS.sortListSeparateColor,
  },
  webViewContainer: {
    marginTop:10,
    minHeight:150,
    flex:1,
    width: getWp(380),
    marginLeft: getWp(-10),
  }
});
