import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';


export default StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: getWp(10),
  },
  scrollView: {},
  searchStyle: { marginTop: getHp(50), marginBottom: getHp(0), width: '100%' },
  heading: {
    fontSize: TEXTFONTSIZE.Text24,
    alignSelf: 'center',
    color: COLORS.white,
  },
  subHeading: {
    fontSize: TEXTFONTSIZE.Text18,
    alignSelf: 'center',
    color: COLORS.white,
    marginBottom: getHp(27),
    textAlign: 'center'
  },
  itemContainer: { marginTop: getHp(9), marginBottom: getHp(9) },
  listContainer: {
    marginBottom: getHp(180),
  },
  scrollViewContainer: {
    paddingTop: getHp(16),
  },
  searchIcon: { alignSelf: 'center', top: 60, right: 5 }
});