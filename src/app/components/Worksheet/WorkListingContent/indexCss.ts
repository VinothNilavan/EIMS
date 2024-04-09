import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: getWp(10),
  },
  scrollView: {},
  searchStyle: { marginTop: getHp(50), marginBottom: getHp(16), width: '100%' },
  heading: {
    fontSize: TEXTFONTSIZE.Text24,
    alignSelf: 'center',
    color: COLORS.white,
  },
  scrollViewContainer: {
    paddingTop: getHp(16)
  },
  emptyData: {
    fontSize: TEXTFONTSIZE.Text20,
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.white,
    bottom: getWp(60),
    paddingHorizontal: getWp(15)
  },
  subHeading: {
    fontSize: TEXTFONTSIZE.Text18,
    alignSelf: 'center',
    color: COLORS.white,
    marginBottom: getHp(27),
  },
  itemContainer: {
    marginTop: getHp(9),
    marginBottom: getHp(9)
  },
  searchIcon: {
    alignSelf: 'center',
    right: 5
  },
  goHomeBtnContainer: {
    borderRadius: getWp(0),
    alignSelf: 'center',
    bottom: getWp(50)
  },
  emptyStateView: {
    alignSelf: 'center',

  },
  emptyStateView1: {
    alignSelf: 'center',
    marginTop: 20
  }
});
