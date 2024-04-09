import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp, isTablet } from '@utils';

const headerHeight = isTablet() ? getHp(100) : getHp(100);
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? getHp(100) : getHp(104),
    width: '100%',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: Platform.OS === 'ios' ? headerHeight : getHp(94),
    position: 'relative',
  },

  hamBurger: {
    position: 'absolute',
    alignItems: 'center', 
    alignContent: 'center',
    justifyContent: 'center',
    bottom: getHp(20),
    left: getWp(5),
  },

  logo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: getHp(20),
  },

  logoutButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(67),
    height: getWp(59),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderRadius: getWp(9),
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '5%',
    //marginTop: '2%',
    textAlign: 'center',
    paddingHorizontal: getWp(60),
    alignSelf: 'center',
  },

  titleMargin : {
    marginBottom: isTablet() ? 0 : getHp(-15),
  },

  logoutText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.white,
  },

  titleText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  description: {
    color: COLORS.infoMessageGray,
    fontSize: TEXTFONTSIZE.Text12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  topicIcon: {
    width: getWp(40),
    height: getHp(40),
  },
  svgContainer: {
    marginBottom: getHp(3),
  },

  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(67),
    height: getWp(59),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderRadius: getWp(9),
  },
  rightContainer: {
    alignSelf: 'flex-end',
    bottom: getHp(20),
    position: 'absolute',
  },
  searchQuestionContainer: {
    width: getWp(60),
    height: getWp(40),
    borderRadius: getWp(10),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 20
  },
  feedbackContainer: {
    overflow: 'hidden',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchQuestionText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.white,
    textAlign: 'center',
  },
});
