import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getWp(372.6),
    borderColor: COLORS.infoContainerBdr,
    borderWidth: getWp(5.7),
    borderRadius: getWp(80),
    paddingHorizontal: getWp(23.5),
    paddingTop: getHp(28),
    paddingBottom: getHp(73),
    backgroundColor: COLORS.white,
  },
  wrapperContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  btn: {
    width: getWp('210'),
    height: getHp('70'),
  },
  btnContainer: {
    flexDirection: 'row',
    borderRadius: getWp(13),
    position: 'absolute',
    bottom: -25
  },
  btnText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',

    fontSize: TEXTFONTSIZE.Text22,
  },
  hwbtnText: {
    color: COLORS.orange,
    fontFamily: 'BalooThambi-Regular',

    fontSize: TEXTFONTSIZE.Text22,
  },
});
