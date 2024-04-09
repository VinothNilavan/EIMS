import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  mainContainer: {
    width: getWp(57),
    height: getWp(57),
    borderRadius: getWp(28.5),
    //borderWidth: getWp(2),
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor: COLORS.rewardBadgeBackgroundColor,
  },

  countContainer: {
    width: getWp(18),
    height: getWp(18),
    borderRadius: getWp(9),
    backgroundColor: COLORS.cardUpperTag,
    borderColor: COLORS.white,
    borderWidth: getWp(2),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: getWp(-5),
    bottom: 0,
  },

  countText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text10,
  },

  checkMarkConatiner: {
    position: 'absolute',
    top: 0,
    right: getWp(-8),
  },
  progressContainerStyle: { position: 'absolute' },
  dotProgressContainerStyle: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  dotProgressStyle: {
    height: getHp(8),
    width: getHp(8),
    backgroundColor: "#FFF",
    borderRadius: getHp(8),
    marginLeft: getHp(4)
  },

});
