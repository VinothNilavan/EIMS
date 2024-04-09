import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { getWp, getHp } from '@utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  RTLsubContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  profileNumberContainer: { marginTop: getHp(18) },
  edgeContainer: {
    width: getWp(248.4),
    backgroundColor: 'transparent',
    marginStart: -getWp(26),
  },
  edgeStyle: { width: getWp(248.4) },

  RTLrightRenderContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginStart: getWp(20.7),
    marginTop: getHp(10),
  },

  rightRenderContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginStart: getWp(20.7),
    marginTop: getHp(0),
  },

  RTLrightTopArrowContainer: {
    width: getWp(245),
    height: getHp(45),
    backgroundColor: 'transparent',
    marginStart: -getWp(29),
    marginBottom: getHp(0),
  },

  rightTopArrowContainer: {
    width: getWp(260),
    height: getHp(45),
    backgroundColor: 'transparent',
    marginStart: -getWp(29),
    paddingTop: getHp(9),
    marginBottom: getHp(18),
  },
  RTLrightTopEdge: {
    width: getWp(290.4),
    marginLeft: getWp(-10),
    bottom: 10
  },
  rightTopEdge: {
    width: getWp(248.4)
  },
  isRTLInitialPosition: {
    width: wp('60'),
    backgroundColor: 'transparent',
    marginStart: wp('-6.3'),
    marginTop: hp('0'),
    position: 'absolute'
  },
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  innerContainer : {
    flexDirection: 'row',
    justifyContent: 'center',
    marginStart: wp('0'),
    backgroundColor: 'transparent',
    paddingBottom: hp('0')
  },
  mapContainer : {
    marginTop: hp(2)
  },

  initialPositionStyle: {
    width: wp('60'),
    backgroundColor: 'transparent',
    marginStart: wp('-6.3'),
    marginTop: hp('0'),
    position: 'relative'
  },
  titleContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginStart: getWp(0),
    marginEnd: getWp(8.2),
  },
  title: {
    color: COLORS.white,
    fontSize: getHp(16),
    lineHeight: getWp(16),
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    width: getWp(207),
    paddingTop: getHp(6)
  },
  rightProNumContainer: {
    paddingTop: getHp(9),
    marginStart: -getWp(8.2),
    marginBottom: -getHp(14.3),
  },
  rightProfileContainer: {
    paddingStart: getWp(0),
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  rightNumContainer: { paddingStart: getWp(0) },
  rightBtmArrowContainer: {
    width: getWp(256.6),
    height: getHp(45),
    backgroundColor: 'transparent',
    marginStart: -getWp(16.5),
    marginBottom: getHp(30.4),
  },
  rightBtmEdge: { width: getWp(248.4) },

  //left side style
  leftRenderContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  leftTopArrowContainer: {
    width: getWp(260),
    height: getHp(45),
    backgroundColor: 'transparent',
    marginStart: -getWp(8.2),
    marginBottom: getHp(13.4),
  },
  leftTopEdge: { width: getWp(260) },
  leftTitleContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: getWp(8.2),
  },
  leftProNumContainer: {
    marginTop: getHp(0),
    marginStart: -getWp(25),
    marginBottom: -getHp(9),
  },
  leftProfileContainer: {
    paddingStart: getWp(0),
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  // leftNumContainer: {paddingStart: getWp(0)},
  leftBtmArrowContainer: {
    width: getWp(248.4),
    height: getHp(45),
    backgroundColor: 'transparent',
    marginBottom: getHp(27),
  },
  leftBtmEdge: { width: getWp(248.4) },
  proNumTitleContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
  },
});
