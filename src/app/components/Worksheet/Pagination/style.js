import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    height: getHp(24),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  swipeContentViewText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  swipeContentView: {
    height: getHp(36),
    width: getHp(36),
    overflow: 'hidden',
    borderRadius: getHp(18),
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: getWp(4),
    backgroundColor: COLORS.pedagogyGray,
  },

  attempted: {
    backgroundColor: COLORS.pedagogyColor,
  },

  changeBtn: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  pagination: {
    paddingHorizontal: getWp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  selectedItem: {
    backgroundColor: COLORS.selectedPageNoBg,
  },

  selectedItemText: {
    color: COLORS.black,
  },

  selectedItemView: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryButtonColor,
    alignItems: 'center',
  },

  enabledBtn: {
    color: COLORS.primaryButtonColor,
  },
});
