import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
      minHeight: getHp(840),
      marginBottom: 10,
    },
  
    header: { marginBottom: getHp(42) },
    innerContainer: {
      paddingHorizontal: getWp(33),
      paddingVertical: getHp(50),
      width: '100%',
    },
    errorMessage: {
      color: COLORS.errorMessage,
      fontSize: TEXTFONTSIZE.Text16,
      textAlign: 'center',
    },
    instructionStyle: {
      textAlign: 'center',
      marginTop: getHp(30),
      fontSize: TEXTFONTSIZE.Text18,
      color: COLORS.sortListSeparateColor,
      marginHorizontal: getWp(16)
    },
    subTitle: {
      fontSize: TEXTFONTSIZE.Text22,
      color: COLORS.orange,
      textAlign: 'center',
    },
    otpExpiry: {
      color: COLORS.inputHeaderColor,
      marginTop: getHp(30),
    },
    otpTimer: {
      fontSize: TEXTFONTSIZE.Text18,
    },
    otpInputContainer: {
      marginTop: getHp(35),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnContainer: {
      marginTop: getHp(60)
    },
    resendOtp: {
      fontSize: TEXTFONTSIZE.Text20,
      color: COLORS.orange,
      marginTop: getHp(30),
    },
    footerText: {
      fontSize: TEXTFONTSIZE.Text20,
    },
    link: {
      fontSize: TEXTFONTSIZE.Text20,
      color: '#b91e1e',
    },
    footerContainer: {
      marginTop: getHp(40),
    }
  });

  export default styles