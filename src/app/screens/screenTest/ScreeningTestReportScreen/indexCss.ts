import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getHp(101),
  },

  questionCountText: {
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.white,
    marginTop: getHp(120),
    textAlign: 'center',
  },

  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(24),
  },

  RTLCountContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(24),
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getWp(20),
    marginTop: heightPercentageToDP('10'),
  },

  RTLButtonContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getWp(20),
    marginTop: heightPercentageToDP('10'),
  },

  logoutButton: {
    color: COLORS.orange,
  },

  separateView: {
    width: getWp(34),
  },

  headerContainer: { 
    alignItems: 'center',
    alignself: 'center', 
  }
});
