import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWp(10),
    backgroundColor: COLORS.white,
    paddingHorizontal: getWp(18),
    paddingBottom: getHp(12),
    shadowRadius: getWp(12.4),
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.5,
    elevation: 2,
  },
  innerContainer: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.explanationGreen,
    marginBottom: -getHp(10),
  },
  critical: {
    color: 'red',
  },

  label: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.screenTestDescriptionTextColor,
  },
  separator: {
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: -getHp(10),
  },
  separatorContainer: {
    paddingHorizontal: getWp(8),
  },
});
