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
    flexDirection: 'row',
    alignItems: 'center',
  },

  column: {
    flex: 1,
  },

  title: {
    color: COLORS.infoMessageGray,
    fontSize: TEXTFONTSIZE.Text14,
  },

  field: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
    height: getHp(40),
    padding: 0,
  },

  disabledField: {
    color: COLORS.infoMessageGray,
  },

  errorField: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text12,
  },

  selected: {
    position: 'absolute',
    top: 0,
    right: 4,
  },
});
