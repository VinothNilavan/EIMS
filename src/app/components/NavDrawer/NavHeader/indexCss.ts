import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { getHp, getWp } from '@utils';
import { TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: getWp(16),
    marginBottom: getHp(16),
  },
  profileDescription: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: getHp(30),
  },
  bgPurpleRec: {
    width: '100%',
    height: getHp(80),
    backgroundColor: COLORS.bgProfileBlue,
    borderRadius: getWp(50),
  },
  name: {
    marginTop: getHp(9),
    marginLeft: getHp(10),
    color: COLORS.secondaryBlack,
  },
  profileTitle: {
    minHeight: Platform.OS === 'ios' ? getHp(25) : getHp(20),
    width: getWp(140),
  },

  profileImgContainer: {
    position: 'absolute',
    left: getWp(60),
    bottom: -getHp(10),
    borderRadius: getWp(29),
    borderWidth: getWp(1),
    borderColor: 'white',
  },

  leftImageContainer: {
    width: getWp(90),
    height: getWp(90),
    borderRadius: getWp(90),
    alignItems: 'flex-start',
    flex: 1,
    marginRight: getWp(5),
  },

  leftImageStyle: {
    width: getWp(90),
    height: getWp(90),
  },

  iconContainer: {
    height: getWp(23),
    width: getWp(23),
    borderRadius: getWp(23),
  },

  profilePicture: {
    justifyContent: 'center',
    position: 'absolute',
    overflow: 'hidden',
    padding: 10
  },
  progressAndSparky: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flex: 4,
  },
  progressLabel: {
    fontSize: getWp(13),
    alignSelf: 'flex-start',
    color: COLORS.secondaryBlack,
  },
  progressView: { flexDirection: 'row', alignItems: 'center' },
  customProgressCommonStyle: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 30,
    height: getHp(5.3),
  },
  customProgressContainerStyle: {
    height: getHp(36),
  },
  customProgressBarStyle: {
    backgroundColor: COLORS.disabledGray,
    width: getWp(112),
  },
  percentageLabel: {
    fontSize: getWp(13),
    marginStart: getWp(5),
    marginBottom: getWp(4),
    color: COLORS.orangeBg,
  },
  sparkyContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sparkyPts: {
    color: COLORS.secondaryBlack,
    marginStart: getWp(4),
    fontSize: getWp(20),
  },
  profileImg: {
    height: getWp(90),
    width: getWp(90),
    borderRadius: getWp(90),
    alignSelf: 'center'
  },
  profileImgWithBanner: {
    height: 70,
    width: 70,
    borderRadius: getWp(90),
    alignSelf: 'center',
  },
  thumbIcon: { height: getWp(29), width: getWp(29) },
  sparkieImgContainer: {
    width: getWp(40),
    height: getHp(40),
  },
  sparkieImg: { height: '100%', width: '100%', alignSelf: 'center' },
  profileTitleText: { fontSize: TEXTFONTSIZE.Text16 },
  profileNameTitleContainer: {
    marginLeft: getWp(95),
  },
  changeSubjectContainer: {
    flexDirection: 'row',
    marginTop: getHp(4)
  },
  changeSubjectBtn: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: COLORS.blueBtn,
    borderRadius: 10,
  },
  changeSubjectTxt: {
    color: COLORS.blueBtn,
    fontSize: getWp(20),
  },
  crownContainer: {
    position: 'absolute',
    top: -10,
    left: -5,
    zIndex: 100
  },
  bannerContainer: {
    position: 'absolute',
    marginTop: -10,
    zIndex: 100,
    left: -1,
  }
});
