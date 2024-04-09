import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    alignItems: 'center',
  },

  header: { marginBottom: getHp(42) },

  scrollViewStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
  },

  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(33),
    width: '100%',
  },

  title: {
    marginTop: getHp(20),
    marginBottom: getHp(10),
    fontSize: TEXTFONTSIZE.Text28,
  },

  gridContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gridRTLContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconStyle: {
    marginTop: getWp(24),
  },

  itemContainer: {
    width: getWp(124),
    height: getHp(150),
    marginRight: getWp(24),
    marginTop: getWp(24),
  },

  itemSubContainer: {
    width: getWp(124),
    height: getHp(150),
    alignItems: 'center',
  },

  subjectText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.screenTestDescriptionTextColor,
    position: 'absolute',
    bottom: getWp(12),
  },
  subTitle: {
    marginVertical: getHp(32),
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
  },
});
