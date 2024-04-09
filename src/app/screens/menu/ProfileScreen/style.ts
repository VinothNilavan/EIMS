import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { isTablet } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text24,
    textAlign: 'center',
    padding: 0,
    paddingBottom: 5,
  },

  shadowContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: getHp(143),
  },

  shadowSubContainer: {
    height: getHp(15),
    backgroundColor: COLORS.progressBlue,
    opacity: 0.9,
  },

  contentStyle: {
    flex: 1,
    //alignItems: 'center',
    marginHorizontal: '5%',//getWp(16),
    marginTop: '5%',//getHp(42),
    //width:'100%'
  },

  profileContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: getWp(20),
    paddingVertical: getHp(30),
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },

  profilePicContainer: {
    height: getHp(100),
    width: getHp(100),
    borderRadius: getWp(50),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgProfileGreen,
  },
  
  container: {
    height: '30%',//getHp(100),
    width: '25%',//getHp(100),
    //alignItems: 'flex-end',
    flex: 1,
    marginRight: getWp(5)
  },

  profileImage: {
    height: getHp(75),
    width: getHp(75),
  },

  userInfoContainer: {
    width: '70%',
    marginLeft: getWp(10),
    alignItems: 'flex-start',
  },

  parentCodeTitle: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    height: Platform.OS == 'ios' ? null : getHp(50),
    padding: 0,
  },

  parentCodeStyle: {
    color: COLORS.parentCodeColor,
    fontSize: TEXTFONTSIZE.Text24,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  copyButton: {
    marginLeft: getWp(16),
  },

  cameraButtonStyle: {
    position: 'absolute',
    top: getHp(60),
    right: isTablet() ? getWp(15) : getHp(0),
    alignSelf: 'flex-end',
  },

  titleStyle: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.secondaryBlack,
  },

  pointStyle: {
    fontSize: TEXTFONTSIZE.Text28,
    color: COLORS.secondaryBlack,
  },

  sparkeyContainer: {
    position: 'absolute',
    //bottom : DeviceInfo.isTablet ? getHp(-100) : getHp(-40),
    borderColor: COLORS.white,
    borderRadius: getWp(20),
    borderWidth: getWp(2),
    backgroundColor: COLORS.profileSparkeyBg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getWp(24),
    paddingVertical: getHp(12),
  },

  sparkeyParentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '3%'
  },

  iconStyle: {
    width: '100%',
    height: '100%',
  },

  pointsContainer: {
    marginLeft: getWp(10),
  },

  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    lineHeight: Platform.OS == 'ios' ? getWp(24) : getWp(20), //getWp(22),
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: Platform.OS == 'ios' ? null : getHp(60),
    position: 'relative',
    padding: 0,
  },

  saveWhiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  orangeTextButton: {
    color: COLORS.orange,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    padding: 0,
    height: Platform.OS == 'ios' ? null : getHp(60),
    lineHeight: Platform.OS == 'ios' ? getWp(24) : getWp(20),//getWp(22),
    textAlign: 'center',
    textAlignVertical: 'bottom',
    width: '100%'
  },

  mainButtonContainer: {
    flexDirection: 'row',
    marginTop: Platform.isPad ? getHp(150) : isTablet() ? getHp(120) : Platform.OS === 'ios' ? getHp(95) : getHp(105),
    paddingHorizontal: getWp(5),
    justifyContent: 'space-evenly',
  },

  profileTitle: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
    textAlign: 'center',
    padding: 0,
    marginTop: getHp(58),
  },

  progressLabel: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
    textAlign: 'left',
  },

  progressContainer: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: getHp(15),
  },

  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  customProgressCommonStyle: {
    borderRadius: 30,
  },

  customProgressBarStyle: {
    backgroundColor: COLORS.disabledGray,
    borderColor: Colors.white,
    borderWidth: getHp(1),
    height: getHp(10),
    width: getWp(122),
  },

  percentageLabel: {
    marginLeft: getWp(15),
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
    textAlign: 'left',
  },

  genderContainer: {
    flexDirection: 'row',
    marginTop: getHp(24),
    position: 'relative',
    width: getWp(370),
    justifyContent: 'center'
  },

  marginLeft12: {
    marginLeft: getWp(12),
  },

  marginTop24: {
    marginTop: getWp(24),
  },

  genderTitle: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: getHp(100),
    marginRight: getWp(12),
  },

  saveButtonStyle: {
    alignSelf: 'center',
    marginBottom: getHp(12),
  },

  parentsDetailsContainer: {
    width: getWp(370),
    marginTop: getHp(32),
  },

  subscriptionContainer: {
    width: getWp(370),
    height: getHp(135),
    backgroundColor: COLORS.white,
    borderRadius: getWp(12),
    marginVertical: getHp(24),
    justifyContent: 'center',
    padding: getHp(25),
    flex: 1,
    // flexWrap: 'wrap',
  },

  subscriptionTitle: {
    color: COLORS.infoMessageGray,
    fontSize: TEXTFONTSIZE.Text14,
  },

  subscriptionValue: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text14,
    marginHorizontal: getWp(5),
  },

  subscriptionMessage: {
    color: COLORS.red,
    fontSize: TEXTFONTSIZE.Text14,
    flex: 1,
  },
  footerContainerStyle: {
    height: 0,
  },
  sparkieContainer: {
    width: getWp(64),
    height: getHp(64),
  },

  notificationSettingContainer: {
    flexDirection: 'column',
    marginBottom: getHp(0),
  },

  separateView: {
    marginTop: getWp(15),
  },

  trustedDeviceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: getHp(30),
  },
  markTrustedContainer: {
    width: '100%'
  },
  trustedDeviceSubTitle: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: getHp(5),
    marginLeft: getWp(16),
    marginRight: getWp(16),
  },

  currentDeviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getHp(24),
  },

  currentDeviceTitleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginStart: getWp(24),
  },

  currentDevicetitleText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
  },

  currentDeviceText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
    marginTop: getHp(-5),
  },

  trustedDeviceButtonContainer: {
    padding: getWp(5),
    backgroundColor: COLORS.orangeBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getWp(5),
    marginRight: getWp(16),
  },

  trustedDeviceButtonText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.white,
  },

  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: getHp(24),
    // minHeight: getWp(50)
  },

  emptyText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text18,
    textAlign: 'center',
    paddingHorizontal: getWp(20),
    bottom: 20,
    marginTop: '5%'
  },

  trustedDeviceIcon: {
    alignSelf: 'center',
    right: 5
  },
  profileImgContainer: {
    position: 'absolute',
    left: getWp(45),
    bottom: -getHp(10),
    borderRadius: getWp(29),
    borderWidth: getWp(1),
    borderColor: 'white',
  },
  crownContainer: {
    position: 'absolute',
    left: isTablet() ? getWp(-2) : 1,
    zIndex: 10,
    marginTop: getHp(-10)
  },
  bannerContainer: {
    position: 'absolute',
    marginTop: isTablet() ? getHp(2) : getHp(6),
    zIndex: 100,
  },
  ImageContainer: {
    position: 'absolute',
    zIndex: 10,
    left: -5,
    marginTop: isTablet() ? getHp(-15) : -5
  }
});