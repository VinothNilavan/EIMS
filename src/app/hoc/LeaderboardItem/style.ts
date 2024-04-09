import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  
  titleStyle: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.leaderBoardTitleColor,
  },

  pointStyle: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.leaderBoardTitleColor,
    padding: 0,
    marginLeft: getWp(4),
  },

  sparkeyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconStyle: {
    width: getWp(27),
    height: getWp(27),
  },

  row: {
    flexDirection: 'row',
  },
  whiteTextColor: {
    color: COLORS.white,
  },
  renderTitleContainer: {
    backgroundColor: "#1db6e8",
    paddingHorizontal: getWp(7),
    paddingVertical: getHp(2)
  },
  titleTextStyle: {
    fontSize: TEXTFONTSIZE.Text11,
    color: Colors.white,
    position: 'absolute',
    lineHeight: 11,
    textAlign: "center",
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%'
  },
});