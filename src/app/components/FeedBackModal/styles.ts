import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

const styles = StyleSheet.create({
  OuterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    marginLeft: getHp(30),
    position: 'absolute',
    marginRight: getHp(30),
    borderRadius: 20,
    marginTop: Platform.OS == 'ios' ? getHp(40) : getHp(20),
    borderWidth: 1,
  },
  lightText: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.blue,
    textAlign: 'center',
  },
  darkText: {
    fontSize: TEXTFONTSIZE.Text16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.sortListSeparateColor,
  },
  ButtonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHp(10),
    maxHeight: getHp(50),
    marginBottom: getHp(10),
  },
  NoThanksButton: {
    justifyContent: 'space-between',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    // minHeight:90,
    alignItems: 'center',
    borderColor: COLORS.orangeBg,
  },
  NoThanksTextStyle: {
    fontSize: TEXTFONTSIZE.Text15,
    letterSpacing: 0,
    textAlign: 'left',
    color: COLORS.orangeBg,
  },
  GiveFeedBack: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderStyle: 'solid',
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: COLORS.orangeBg,
  },
  GiveFeedBackText: {
    fontSize: TEXTFONTSIZE.Text15,
    letterSpacing: 0,
    textAlign: 'left',
    color: COLORS.white,
  },
  TextView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: getWp(20),
    marginRight: getWp(20),
    paddingLeft: getWp(20),
    paddingRight: getWp(20),
  },
  CloseBtnView: {
    height: getHp(40),
    width: getHp(40),
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    zIndex: 999,
  },
  container: {
    flex: 1,
  },
});
export default styles;

