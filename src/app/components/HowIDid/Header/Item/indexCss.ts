import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';

import { getHp, getWp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: getHp(98.5),
    paddingHorizontal: getWp(10.3),
  },
  text: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.white,
    lineHeight: getHp(22.4),
    paddingTop: getHp(13.4),
    textAlign: 'center',
  },
  svgStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  svgText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
    textAlign: 'center',
  },
  accuracyPerVal: {
    fontSize: TEXTFONTSIZE.Text10,
  },
  containerUpper: { flex: 3 },
  containerLower: { flex: 2 },
  svgContainer: {
    width: DeviceInfo.isTablet() ? getWp(40) : getWp(60),
    height: DeviceInfo.isTablet() ? getWp(40) : getWp(60),
  },
  svgBgStyle: {
    width: '100%',
    height: '100%',
  },
});
