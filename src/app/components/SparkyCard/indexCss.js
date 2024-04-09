import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  card: {
    //borderRadius: 10,
    paddingHorizontal: Platform.OS ? getHp(0) : getHp(17),
    //height: getHp(80),
    //padding:10,
    paddingVertical: Platform.OS ? getHp(0) : getHp(17),
    //paddingVertical: getHp(10),
    borderWidth: 2,
    borderColor: 'white',
    marginTop: getHp(5),
    elevation: 1,
    marginBottom: 3

  },
  pts: {
    fontSize: TEXTFONTSIZE.Text16,
    textAlign: 'center',
    color: COLORS.sparkyPts
  },
  mainView:
  {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: Platform.OS ? 10 : 0
  },
  firstView: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  svgStyle: {
    width: getWp(36),
    height: getHp(36),
  },
  secondView: {
    flex: 6,
    // padding: wp('2'),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginStart: getWp(17),
  },
  title: { fontSize: TEXTFONTSIZE.Text20, textAlign: 'left', color: COLORS.leaderBoardTitleColor },
  subtitle: { textAlign: 'left', color: COLORS.infoMessageGray },
});
