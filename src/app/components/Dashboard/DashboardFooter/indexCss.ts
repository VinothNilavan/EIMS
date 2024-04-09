import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '../../../constants';
import { deviceInfo } from '@utils';

const isTablet = (deviceInfo() == 'Tablet' || 'Ipad') ? true : false;

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: getHp(isTablet ? 145 : 120),
  },

  lottie: {
    width: '100%',
    height: '100%',
    padding: 0,
    marginStart: 0,
    marginEnd: 0,
  },

  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: getHp(22),
    paddingBottom: getHp(25),
    paddingHorizontal: getWp(24),
  },

  RTLInnerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: getHp(22),
    paddingBottom: getHp(25),
    paddingHorizontal: getWp(24),
  },

  title: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
  },

  leftImageContainer: {
    width: getWp(70),
    height: getWp(70),
    borderRadius: getWp(70),
    alignItems: 'flex-end',
    flex: 1,
    marginRight: getWp(5),
  },

  leftImageStyle: {
    width: getWp(70),
    height: getWp(70),
  },

  iconContainer: {
    height: getWp(23),
    width: getWp(23),
    borderRadius: getWp(23),
  },

  textContainer: { flex: 3, alignItems: 'flex-start', marginLeft: getWp(10) },

  RTLtextContainer: { flex: 3, alignItems: 'flex-end', marginRight: getWp(5) },

  rightImageContainer: { alignItems: 'flex-end' },

  svgStyle: {
    width: getWp(70),
    height: isTablet ? getWp(80) : getHp(70),
  },
  profileTitle: {
    minHeight: Platform.OS === 'ios' ? getHp(25) : getHp(20),
    // marginStart: getWp(80),
    width: getWp(140),
  },
  profileTitleText: { fontSize: TEXTFONTSIZE.Text16 },
  profileImgContainer: {
    position: 'absolute',
    left: getWp(45),
    bottom: -getHp(10),
    borderRadius: getWp(29),
    borderWidth: getWp(1),
    borderColor: 'white',
  },
  crownContainer: {
    position: 'absolute',
    left: isTablet ? -10 : -15,
    zIndex: 10,
    top: -5,
    marginTop: -5,

  },
  bannerContainer: {
    position: 'absolute',
    left: getWp(-8),
    marginTop: getWp(-10),
    zIndex: 100,
  }
});
