import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.messageItemBg,
    paddingVertical: getHp(13),
    paddingHorizontal: getWp(10),
    marginBottom: getWp(1),
  },

  unreadContainerStyle: {
    backgroundColor: COLORS.white,
  },

  profilePicContainer: {
    height: getHp(60),
    width: getHp(60),
    borderRadius: getHp(30),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getWp(14),
  },

  flexOne: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text16,
    textAlignVertical: 'top',
  },

  title: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text12,
    marginLeft: getWp(5),
    flex: 1,
    height: getHp(24),
    textAlignVertical: 'top',
  },

  time: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text13,
  },

  subject: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text13,
  },

  message: {
    color: COLORS.messagesColor,
    fontSize: TEXTFONTSIZE.Text13,
  },

  unreadMessage: {
    color: COLORS.infoMessageGray,
  },

  unreadStyle: {
    color: COLORS.black,
  },

  selected: {
    position: 'absolute',
    top: 0,
    right: 4,
  },
});
