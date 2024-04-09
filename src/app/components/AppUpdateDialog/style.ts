import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: getWp(6),
    width: getWp(370),
    overflow: 'hidden',
  },

  titleContainer: {
    width: getWp(370),
    height: getHp(68),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.modalHeaderColor,
  },

  titleText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.Cinder,
  },

  childContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(30),
    marginBottom: getWp(30),
  },

  descriptionText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.VulcanColor,
    marginTop: getWp(30),
    textAlign: 'center',
  },

  buttonMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(30),
  },

  buttonContainer: {
    backgroundColor: COLORS.modalButtonColor,
    borderRadius: getWp(2),
    width: getWp(130),
    height: getWp(36),
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonContainer: {
    backgroundColor: COLORS.white,
    borderWidth: getWp(1),
    borderColor: COLORS.modalButtonColor,
    borderRadius: getWp(2),
    width: getWp(130),
    height: getWp(36),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getWp(16),
  },

  buttonText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
  },

  secondaryButtonText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.modalButtonColor,
  },
});
