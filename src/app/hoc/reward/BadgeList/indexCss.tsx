import { StyleSheet , Dimensions } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { isTablet } from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: getWp(376),
    backgroundColor: `#022A4B`,
    borderTopLeftRadius: getWp(13),
    borderTopRightRadius: getWp(13),
    paddingBottom: getWp(30),
  },
  gradientStyle: {
    height: getHp(41),
    justifyContent: 'center',
    opacity: 0.17,
    position: 'absolute',
    width: '100%',
  },
  gradientContainerStyle: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientViewButtonStyle: {
    color: `#F8651F`,
    fontSize: TEXTFONTSIZE.Text13,
  },
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: getHp(20),
  },
  gradientTextStyle: {
    color: 'white',
    opacity: 1,
    fontSize: TEXTFONTSIZE.Text15,
  },
  subContainer: {
    alignItems: 'center',
  },

  titleText: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text27,
    color: `#00A2F1`,
    marginTop: getWp(15),
  },

  badgeListContainer: {
    flex: 1,
    marginLeft: '2%',
    marginVertical: getHp(5),
    flexDirection: 'column',
    marginBottom: getHp(45),
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },

  buttonListContainer: {
    marginLeft: getWp(15),
  },

  buttonItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getWp(16),
  },

  badgeItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },

  badgeItemText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text14,
    marginTop: getHp(15),
    textAlign: 'center',
  },

  emptyBadgeContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },

  emptyBadgeText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text18,
    textAlign: 'center',
    bottom: isTablet() ? getWp(40) : getWp(90),
  },
  checkMarkConatiner: {
    marginTop: getHp(5),
  },
  badgeElementStyle: {
    marginTop: getHp(25),
    width: Dimensions.get('screen').width / 3 - 15,
    paddingLeft: '5%',
  },
  searchIcon: {
    alignSelf: 'center',
    bottom: getWp(40),
    right: 5,
  },

  selectedBadgeSVGContainer: {
    position: 'absolute',
    top: isTablet() ? getHp(50) : getHp(10)
  },
});
