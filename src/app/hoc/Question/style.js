import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  parentContainer: {
    flexDirection: 'column',
    paddingVertical: getHp(24),
    // marginHorizontal: getWp(5),
    flex: 1,
  },

  orderOptionContainer: {
    marginLeft: getWp(0),
  },

  container: {
    flexDirection: 'row',
    flex: 1,
    width: getWp(360),
  },

  questionNumber: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.blackText,
  },

  webViewStyle: {
    width: getWp(360),
    marginTop: getHp(2),
    // marginLeft: getWp(5),
  },

  matchQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHp(26.8),
    width: '95%',
    // marginStart: getWp(8.2),
    marginBottom: getHp(18),
  },
  qBodyStyle: {
    width: getWp(375),
  },
});
