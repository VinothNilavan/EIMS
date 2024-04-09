import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  arrangeLetterContainerParentView: {
    backgroundColor: COLORS.sortListQuestionNormalBackgroundColor,
    marginTop: getWp(16),
    width: getWp(100),
    minHeight: getHp(60),
    minWidth: getWp(100),
    alignItems: 'center',
    marginHorizontal: getWp(10),
    justifyContent: 'center',
  },

  elevatedContainer: {
    width: getWp(100),
    minWidth: getWp(100),
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
    width: getWp(100),
  },

  crossBtn: {
    position: 'absolute',
    right: 0,
    marginRight: 5
  },

  webviewContainer: {
    width: getWp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
