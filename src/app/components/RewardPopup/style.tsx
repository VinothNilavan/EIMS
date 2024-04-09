import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp, getHp, deviceInfo, isTablet } from '@utils';
const device = deviceInfo();
const felxValue = device === 'AndroidPhone' ? 0.68 : 0.65;
export default StyleSheet.create({
  container: {
    flex: isTablet() ? 0.7 : felxValue,
    width: '95%',
    borderRadius: 20,
    JustifyContent: 'center',
    alignItems: 'center'
  },
  btnGroupStyle: {
    position: 'relative',
    height: getHp(48),
    marginTop: isTablet() ? getWp(-20) : getWp(25),
  },
  innerBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupTwoBtn: {
    marginLeft: isTablet() ? getWp(60) : getWp(25),
    flexDirection: 'row',
  },
  pdfContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    AspectRatio: 'vertical',
  },
  btnStyle: {
    height: getHp(48),
    width: getHp(48),
    backgroundColor: COLORS.orange,
    borderWidth: getHp(2),
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  crossBtn: {
    marginRight: isTablet() ? getWp(50) : getWp(20)
  },
  webViewContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden'
  },
  webView: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  innerContainer: {
    flex: 1,
    borderRadius: 20,
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    marginTop: isTablet() ? getHp(10) : getHp(-50)
  }
});
