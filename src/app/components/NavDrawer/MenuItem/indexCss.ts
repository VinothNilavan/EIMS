import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getHp(9),
    marginEnd: getWp(20.7),
    paddingTop: DeviceInfo.isTablet() ? getHp(6) : getHp(9),
    paddingBottom: DeviceInfo.isTablet() ? getHp(6) : getHp(9),
    paddingEnd: getWp(8.2),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingStart: getWp(20.7),
    borderRadius: getHp(18),
  },

  containerActive: {
    flex: 1,
    marginTop: getHp(9),
    marginStart: getWp(20.7),
    marginEnd: getWp(20.7),
    paddingTop: DeviceInfo.isTablet() ? getHp(6) : getHp(9),
    paddingBottom: DeviceInfo.isTablet() ? getHp(6) : getHp(9),
    paddingEnd: getWp(8.2),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingStart: getWp(20.7),
    borderRadius: getHp(18),
    backgroundColor: COLORS.yellow,
  },
  text: {
    fontSize: DeviceInfo.isTablet() ? TEXTFONTSIZE.Text18 : TEXTFONTSIZE.Text20,
    color: COLORS.white,
    marginStart: getWp(15),
    flex: 1,
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
  textActive: {
    fontSize: DeviceInfo.isTablet() ? TEXTFONTSIZE.Text18 : TEXTFONTSIZE.Text20,
    textAlign: 'left',
    color: COLORS.secondaryBlack,
    marginStart: getWp(15),
    flex: 1,
  },
  countContainer: {
    width: getWp(16),
    height: getWp(16),
    borderRadius: getWp(8),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '5%',
    top: getHp(1),
    borderColor: 'white'
  },
  countText: {
    fontSize: TEXTFONTSIZE.Text11,
    color: COLORS.white,
  },
});
