import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subContainer: {
    alignSelf: 'center',
    marginTop: getHp(12),
    alignItems: 'center',
  },

  titleText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    // marginTop: getWp(-5),
    textAlign: 'center',
  },

  countTextContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
  },

  optionText: {
    fontSize: TEXTFONTSIZE.Text12,
    paddingTop: getWp(5),
    color: COLORS.screenTestDescriptionTextColor,
  },
});
