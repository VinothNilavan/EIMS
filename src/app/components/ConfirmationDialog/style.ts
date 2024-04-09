import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(10),
  },

  titleText: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.statTextColor,
    marginTop: getWp(15),
    textAlign: 'center',
  },

  descriptionText: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.screenTestDescriptionTextColor,
    marginTop: getWp(30),
    marginRight: getWp(15),
    marginLeft: getWp(15),
    marginBottom: getWp(30),
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getWp(15),
  },

  buttonText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.white,
    marginLeft: '5%',
    marginRight: '5%'
  },
});
