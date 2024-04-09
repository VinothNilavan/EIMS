import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  headerSec: {
    height: getHp(70),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.correctWrongLabelBackgroundColor,
    width: '100%',
    borderTopLeftRadius: getWp(10),
    borderTopRightRadius: getWp(10),
  },

  errorView: {
    width: '90%',
    borderRadius: getWp(10),
    backgroundColor: COLORS.white,
    paddingBottom: getWp(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subContainer: {
    paddingHorizontal: getWp(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  textStyle: {
    fontSize: TEXTFONTSIZE.Text20,
  },

  secondaryTextStyle: {
    paddingVertical: getHp(24),
    textAlign: 'center',
  },

  secondaryErrorStyle: {
    paddingBottom: 12,
    fontSize: TEXTFONTSIZE.Text12,
    textAlign: 'center',
  },

  rowCenterSpace: {
    width: getWp(260),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  secondayButton: {
    color: COLORS.orange,
  },
});
