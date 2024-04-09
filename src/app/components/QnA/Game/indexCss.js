import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default (isActive = true) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: getWp(213),
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRadius: getWp(20),
      backgroundColor: COLORS.gameCompBdr,
      width: '100%',
    },
    imageContainer: {
      width: '100%',
      height: getHp(122),
    },
    textContainer: {
      paddingHorizontal: getWp(15.7),
      paddingTop: getHp(14.3),
      paddingBottom: getHp(29.5),
      backgroundColor: 'white',
      borderBottomLeftRadius: getWp(25),
      borderBottomRightRadius: getWp(25),
      borderBottomColor: COLORS.gameCompBdr,
      borderBottomWidth: getWp(6),
      width: '100%',
      minHeight: getHp(122),
    },
    title: {
      fontSize: TEXTFONTSIZE.Text18,
      color: COLORS.topicCardTitle,
      textAlign: 'left',
      marginBottom: -getHp(9),
      opacity: isActive ? 1 : 0.28,
      lineHeight: getHp(20),
      paddingTop: getHp(15),
    },
    desc: {
      fontSize: TEXTFONTSIZE.Text12,
      color: COLORS.topicCardTitle,
      textAlign: 'left',
      opacity: isActive ? 0.5 : 0.28,
      lineHeight: getHp(15),
      paddingTop: getHp(18),
    },
    imageBackgroundStyle: {
      width: '100%',
      height: '100%',
      opacity: isActive ? 1 : 0.5,
    },
    imageStyle: {
      borderTopLeftRadius: getWp(20),
      borderTopRightRadius: getWp(20),
    },
    playButtonContainer: {
      position: 'absolute',
      right: 0,
      top: getHp(105),
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginEnd: getWp(12),
    },
  });
