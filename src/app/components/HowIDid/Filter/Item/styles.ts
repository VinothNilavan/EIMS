import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';


const styles = (isActive = false) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isActive ? COLORS.filterActiveBackgroundColor : COLORS.inactiveBackground,
      borderRadius: 10,
    },
    innerContainer: {
      flexDirection: 'row',
      marginVertical: getHp(7),
    },
    leftContent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getWp(10),
      borderRightWidth: 1,
      borderRightColor: isActive ? COLORS.white : COLORS.blackBorder,
    },
    rightContent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getWp(10),
    },
    textStyle: {
      fontSize: TEXTFONTSIZE.Text16,
      color: isActive ? COLORS.white : COLORS.blackText,
    },
    leftSvgStyle: {
      width: getWp(20),
      height: getWp(20),
    },
  });

export default styles;
