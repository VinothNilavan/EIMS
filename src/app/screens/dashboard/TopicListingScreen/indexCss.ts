import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  shadeTopContainer: {
    width: getWp(321),
    height: getHp(30),
    position: 'absolute',
    top: getHp(85),
    right: 0,
  },
  shadeBottomContainer: {
    width: getWp(321),
    height: getHp(30),
    position: 'absolute',
    bottom: getHp(200),
    right: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    marginVertical: getWp(10),
    padding: getWp(10),
    marginHorizontal: getWp(10),
  },
  textColor: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text20,
  },
  goHomeBtnContainer: {
    marginTop: getWp(15),
    borderRadius: getWp(0),
    alignSelf: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text16,
  },
  emptyStateIcon: {
    top: getWp(60)
  }
});
