import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: COLORS.subtitleDarkBlue,
    paddingBottom: 0,
  },
  errorView: {
    padding: getWp(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  svgContainer: {
    marginBottom: getHp(30),
  },
  textStyle: {
    color: COLORS.white,
    fontSize: getWp(28),
    paddingTop: 16,
  },
  secondaryTextStyle: {
    color: COLORS.white,
    marginBottom: getHp(16),
    textAlign: 'center',
  },
  secondaryErrorStyle: {
    color: COLORS.white,
    marginBottom: getHp(12),
    fontSize: getWp(12),
    textAlign: 'center',
  },
});
