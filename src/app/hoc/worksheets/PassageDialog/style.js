import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: getWp(20),
    marginTop: getHp(100),
    marginBottom: getHp(30),
    overflow: 'hidden',
    borderRadius: getWp(16),
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  RTLTitleContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleText: {
    flex: 1,
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.screenTestDescriptionTextColor,
  },

  closeText: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
  },
});
