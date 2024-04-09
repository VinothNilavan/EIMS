import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
    //backgroundColor:'green'
  },
  innerContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideMenuContainer: {
    // flex: 1,
    width: getWp(93),
  },
  contentContainer: { flex: 1 },
  buddy: { position: 'absolute', right: getWp(16), top: getHp(18) },
  bgSvgStyle: {
    width: '100%',
    height: '100%',
  },
  btmLeftAnimContainer: {
    width: getWp(113),
    position: 'absolute',
    bottom: getHp(113),
    // left: getWp(16),
  },
  leftNavStyle: {
    position: 'absolute',
    left: 0,
    width: getWp(93),
  },
  renewCallout: {
    backgroundColor: COLORS.calloutBgColor,
    padding: getHp(5),
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
