import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },

  childContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: getHp(20),
  },

  badgeContainer: {
    width: getWp(101),
    height: getWp(101),
    borderRadius: getWp(50.5),
    borderWidth: getWp(6),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeCountContainer: {
    width: getWp(30),
    height: getWp(30),
    borderRadius: getWp(15),
  },

  badgeCountText: {
    fontSize: TEXTFONTSIZE.Text20,
  },

  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: getWp(34),
    marginLeft: getWp(24),
    marginRight: getWp(24),
  },

  titleText: {
    fontSize: TEXTFONTSIZE.Text25,
    color: COLORS.white,
  },

  captionText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: getHp(30),
  },
  footerContainerStyle: {
    height: 0,
  },
  btnStyle: {
    width: getWp(214),
    height: getHp(60),
  },
  badgeWidth: getWp(95),
  rewardShowCaseSection: {
    flex: 1.4, 
  },
  rewardContentSection: {
    flex: 1.25,
    backgroundColor: `#022A4B`,
    borderTopLeftRadius: getHp(18),
    borderTopRightRadius: getHp(18),
    width: "100%"
  },
  rewardContentFlatListStyle: {
    width: "90%",
    alignSelf: "center",
    marginTop: getHp(10), 
  },
  tabContainerStyle: {
    width: getWp(100),
    height: getHp(50),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FEDB31",
  },
  tabContainerTextStyle: {
    fontSize: TEXTFONTSIZE.Text19,
    color: `#FFFFFF`
  },
  lottieAnimationLeftContainer: {
    top: getHp(350),
    position: 'absolute',
    width: "30%",
    opacity: .7
  },
  lottieAnimationRightContainer: {
    top: getHp(300),
    position: 'absolute',
    width: getWp(100),
    opacity: .7,
    right: getWp(5)
  }
});
