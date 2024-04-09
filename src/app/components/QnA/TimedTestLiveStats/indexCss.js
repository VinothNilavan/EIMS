import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: COLORS.statBoxBorder,
    borderWidth: 1,
    borderRadius: getWp(10),
    marginTop: getHp(15),
  },

  itemContainer: {
    alignItems: 'center',
    width: getWp(80),
    paddingTop: getHp(10),
    paddingBottom: getHp(5),
  },

  itemContainerBorder: {
    borderRightColor: COLORS.statBoxBorder,
    borderRightWidth: 1,
  },

  titleStyle: {
    marginBottom: -getHp(10),
    fontSize: TEXTFONTSIZE.Text12,
  },

  textStyle: {
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text16,
  },

  attemptedColor: {
    color: COLORS.pedagogyColor,
  },
  correctColor: {
    color: COLORS.correctStatColor,
  },
  totalColor: {
    color: COLORS.secondaryBlack,
  },
});
