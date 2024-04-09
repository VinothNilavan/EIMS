import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(13),
    paddingVertical: getHp(8),
    paddingHorizontal: getWp(16),
    marginBottom: getHp(20),
  },

  title: {
    color: COLORS.infoMessageGray,
    fontSize: TEXTFONTSIZE.Text14,
  },

  field: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
    textAlignVertical: 'bottom',
    height: getHp(40),
  },

  inputStyle: {
    height: getHp(40),
  },

  disabledField: {
    color: COLORS.infoMessageGray,
  },

  selected: {
    position: 'absolute',
    top: 0,
    right: 4,
  },

  errorField: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text12,
  },
});
