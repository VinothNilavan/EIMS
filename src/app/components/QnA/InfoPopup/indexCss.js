import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import DeviceInfo from 'react-native-device-info';

import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    height:  DeviceInfo.isTablet()  ? getWp(190) :getHp(179)
  },
  svgContainer: {
    marginBottom: getHp(16),
    width: getWp(232.6),
    height:  DeviceInfo.isTablet()  ? getHp(140) : getHp(108.4),
    alignItems: 'center',
  },
  svgTextContainer: {
    flex: 1,
    width: getWp(196),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgText: {
    fontSize: DeviceInfo.isTablet() ? TEXTFONTSIZE.Text32 : TEXTFONTSIZE.Text28,
    color: COLORS.infoPopupTitle,
    textAlign: 'center',
    lineHeight: DeviceInfo.isTablet() ? getHp(42) : getHp(36),
    paddingTop: DeviceInfo.isTablet() ? getHp(28) : getHp(32),
  },
  text:  DeviceInfo.isTablet() ? {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.trustedDeviceBrown,
    lineHeight: getHp(36),
    textAlign: 'center',
     top:-100
     
  } : {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.trustedDeviceBrown,
    lineHeight: getHp(28),
    textAlign: 'center'
  } ,
  highlightText: {
    color: COLORS.orange,
  },
});
