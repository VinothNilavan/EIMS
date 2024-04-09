import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderBottomRightRadius: getWp(20.7),
    borderBottomLeftRadius: getWp(20.7),
    height: getHp(100),
  },

  headerContainer: {
    flexDirection: 'row',
    height: getHp(100),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  RTLHeaderContainer: {
    flexDirection: 'row-reverse',
    height: getHp(100),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  closeButtonContainer: {
    width: getWp(67),
    height: getHp(59),
    borderRadius: getWp(9),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.white,
    textAlign: 'center',
  },

  titleText: {
    flex: 1,
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },

  secondarButtonContainer: {
    width: getWp(67),
    height: getHp(59),
    borderRadius: getWp(9),
    backgroundColor: COLORS.blue,
    marginRight: getWp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
