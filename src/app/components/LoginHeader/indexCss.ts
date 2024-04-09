import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: getHp(200),
    backgroundColor: COLORS.white,
  },

  lottieContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(414),
  },

  lottie: {
    width: '100%',
    height: '100%',
    padding: 0,
    marginStart: 0,
    marginEnd: 0,
  },
  roundBtn: { position: 'absolute', top: getHp(30), left: getWp(32) },
  newRoundBtn: {
    position: 'absolute',
    top: getHp(99),
    left: getWp(62),
  },
  backgroundFigure: {
    marginTop: getHp(35),
  },

  leaves: {
    position: 'absolute',
    top: getHp(82),
    left: getWp(-25),
  },
  logo: {
    position: 'absolute',
    top: getHp(75),
    left: getWp(113),
    height: '45%',
    width: '47%',
  },
  students: {
    position: 'absolute',
    top: getHp(45),
    right: getWp(12),
  },

  NeedHelpContainer: {
    borderRadius: 20,
    backgroundColor: '#FF6100',
    width: 25,
    height: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    marginTop: 20,
    marginRight: 20
  },
  NeedHelpTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: TEXTFONTSIZE.Text12
  }
});
