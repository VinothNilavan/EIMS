import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '@constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%'),
    borderColor: COLORS.infoContainerBdr,
    borderWidth: wp('1.4'),
    borderRadius: 25,
    paddingHorizontal: wp('5.7'),
    paddingTop: hp('3.1'),
    paddingBottom: hp(8.2),
    backgroundColor: COLORS.white,
  },
  svgContainer: {
    marginBottom: getHp(40),
    width: getWp(232),
    height: getHp(109),
    alignItems: 'center',
  },
  svgTextContainer: {
    flex: 1,
    width: wp('45'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgText: {
    fontSize: wp('7.4'),
    color: COLORS.infoPopupTitle,
    textAlign: 'center',
    lineHeight: hp('4'),
    paddingTop: hp('4'),
  },
  text: {
    fontSize: wp('4.8'),
    color: COLORS.trustedDeviceBrown,
    lineHeight: Platform.isPad ? hp('4.2') : hp('3.1'),
    marginBottom: getHp(66),
  },
  btn: {
    width: getWp(180),
    height: getHp(56),
  },
  btnContainer: {
    position: 'absolute',
    bottom: -hp('3.3'),
    borderRadius: wp('6'),
  },
  actionBtnText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: wp('5.3'),
  },
  cancelBtnText: {
    color: COLORS.cardUpperTag,
  },
  mrgnBtm17: {
    marginBottom: getHp(17),
  },
});
