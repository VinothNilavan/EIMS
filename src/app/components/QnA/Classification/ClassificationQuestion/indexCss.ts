import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  arrangeLetterContainerParentView: {
    backgroundColor: COLORS.sortListQuestionNormalBackgroundColor,
    marginTop: getWp(10),
    minHeight: getHp(60),
    alignItems: 'center',
    borderRadius: getWp(5),
    marginHorizontal: getWp(10),
    justifyContent: 'center',
  },

  elevatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(145),
    minHeight: getHp(60),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderWidth: getWp(1),
    borderStyle: 'dashed',
    borderRadius: getWp(5),
    borderColor: COLORS.dotLineColor,
  },

  arrangeLetterContainerChildView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(200),
  },

  webviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(143),

  },
  bucketFont: {
    fontSize: TEXTFONTSIZE.Text16,
    fontWeight: '700',
    color: COLORS.black
  },
});
