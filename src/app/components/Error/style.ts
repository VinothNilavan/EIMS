import {StyleSheet} from 'react-native';
import {COLORS} from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.errorBg,
    width: getWp(250),
    borderRadius: getWp(40),
    alignSelf: "center",
    position: "absolute",
    bottom: getHp(240),
    borderWidth: getWp(5),
    borderColor:COLORS.white
  },
  successContainer: {
    backgroundColor: COLORS.white,
    width: getWp(380),
    borderRadius: getWp(10),
    alignSelf: "center",
    position: "absolute",
    bottom: getHp(200),
    borderWidth: getWp(5),
    borderColor:COLORS.white
  },
  errorView: {
    flex: 1,
    padding: getWp(24),
    alignItems: 'center',
    justifyContent: "space-between"
  },
  textStyle: {
    color: COLORS.white,
    fontSize: getWp(20),
    paddingTop: 16,
  },
  secondaryTextStyle: {
    color: COLORS.white,
    paddingBottom: 16,
    textAlign: "center"
  },
  secondaryErrorStyle: {
    color: COLORS.white,
    paddingBottom: 12,
    fontSize: getWp(12),
    textAlign: "center"
  }
});
