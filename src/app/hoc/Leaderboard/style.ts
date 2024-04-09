import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { isTablet } from '@utils';

const isTablets = isTablet();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: getHp(40),
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    borderBottomWidth: 0,
    borderTopLeftRadius: getHp(37),
    borderTopRightRadius: getHp(37),
    marginHorizontal: getWp(18),
  },

  titleContainer: {
    backgroundColor: COLORS.orangeBg,
    borderTopLeftRadius: getHp(34),
    borderTopRightRadius: getHp(34),
    paddingVertical: getHp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: COLORS.yellow,
    fontSize: TEXTFONTSIZE.Text24,
  },

  subTitle: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
  },

  subTitle1: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text14,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.leaderBoardListBGColor,
    paddingHorizontal: getWp(16),
    paddingTop: getWp(18),
    position: 'relative',
    justifyContent: 'flex-end',
  },

  listItemContainer: {
    flex: 1,
    paddingHorizontal: getWp(7),
    paddingVertical: getHp(6),
    backgroundColor: COLORS.white,
    marginBottom: getHp(10),
    borderRadius: getWp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },

  rankContainer: {
    position: 'relative',
    width: '10%',
    height: getHp(32),
    alignItems: 'center',
    justifyContent: 'center',
  },

  medalStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 0,
    flex: 1,
  },

  rankStyle: {
    fontSize: TEXTFONTSIZE.Text19,
    color: COLORS.rankTextColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
  },

  avatar: {
    width: getWp(42),
    height: getWp(42),
    borderRadius: getWp(21),
    marginStart: getWp(6),
    marginEnd: getWp(6),
  },

  profileStyle: {
    height: '100%',
    marginRight: getWp(4),
    marginLeft: getWp(5),
    justifyContent: 'center',
    flex: 1
  },

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

  flexOne: {
    flex: 1,
    position: 'relative',
  },

  stickyListItemContainer: {
    backgroundColor: COLORS.stickyItemBackground,
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
  badgeStyle: {
    position: 'absolute',
    zIndex: 1,
    bottom: getWp(-5),
    right: getWp(5)
  },
  crownContainer: {
    position: 'absolute',
    left: isTablets ? getWp(-2) : 1,
    zIndex: 10,
    marginTop: isTablets ? getHp(-5) : getHp(-10)
  },
  bannerContainer: {
    position: 'absolute',
    marginTop: isTablets ? getHp(2) : getHp(6),
    zIndex: 100,
    marginLeft: isTablets ? getWp(-5) : 0,
  }
});