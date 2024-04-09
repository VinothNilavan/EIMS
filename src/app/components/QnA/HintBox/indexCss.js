import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.hintBg,
    flexDirection: 'row',
    flex: 1,
    marginTop: hp('0%'),
    justifyContent: 'space-evenly',
  },
  prevBtnContainer: { flex: 1, flexDirection: 'row' },
  chevronIcon: {
    backgroundColor: 'transparent',
    color: COLORS.white,
  },
  chevronPrevIconContainer: {
    height: wp('7'),
    width: wp('7'),
    backgroundColor: COLORS.blue,
    borderRadius: wp('7'),
  },
  nextBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  prevNextTextContainer: { justifyContent: 'center', marginStart: wp('1') },
  prevNextStyle: { fontSize: wp('3.5') },
  chevronNextIconContainer: {
    height: wp('7'),
    width: wp('7'),
    paddingRight: wp('3'),
    backgroundColor: COLORS.blue,
    borderRadius: wp('7'),
    marginStart: wp('1'),
  },
  hintBtnContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  hintBtnTextStyle: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: getWp('14'),
  },
  hintBtnContainerStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  positionAbsolute: {
    position: 'absolute',
    top: -15,
    elevation: 3,
  },
  hintCard: {
    borderRadius: 10,
    width: wp('80%'),
    borderColor: COLORS.infoContainerBdr,
    borderWidth: getHp('2'),
    backgroundColor: COLORS.hintBg,
    shadowColor: COLORS.gray,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 1,
    overflow: 'scroll',
    marginTop: getWp(2),
    alignSelf: 'center',
  },
  closeIcon: {
    top: getWp(5),
    right: getWp(5),
    alignSelf: 'flex-end',
    color: COLORS.blue,
    position: 'absolute',
  },
  hintTextContainer: {
    marginTop: hp('5.5'),
    marginBottom: hp('5'),
    marginStart: wp('5'),
    marginEnd: wp('5'),
  },
  hintWebView: {
    marginStart: wp('3%'),
    marginEnd: wp('3%'),
    marginBottom: hp('0%'),
    width: wp('65%'),
    backgroundColor: COLORS.hintBg,
  },
});
