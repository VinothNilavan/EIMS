import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    marginBottom: getHp(9),
  },

  errorText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
    alignSelf: 'center',
    textAlign: 'center'
  },

  bottomView: {
    marginBottom: getHp(45)
  },
  searchIcon: {
    alignSelf: 'center',
    top: getWp(40),
    right: 5
  },
  goHomeBtnContainer: {
    borderRadius: getWp(0),
    alignSelf: 'center',
    marginTop: getWp(10)
  },
  flexOne: {
    flex: 1
  }
});
