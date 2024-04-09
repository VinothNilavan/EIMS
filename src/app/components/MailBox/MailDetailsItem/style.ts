import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: getHp(2),
    borderBottomColor: COLORS.boderColor,
    paddingVertical: getHp(13),
    paddingHorizontal: getWp(19),
  },

  messageContainer: {
    flexDirection: 'row',
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
    justifyContent: 'space-between',
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
    color: COLORS.messagesColor,
    fontSize: TEXTFONTSIZE.Text13,
  },

  detailsContainer: {
    marginTop: getWp(22),
  },

  message: {
    color: COLORS.messagesColor,
    fontSize: TEXTFONTSIZE.Text13,
  },

  ViewQuestionTxt: {
    color: COLORS.parentBlue,
    fontSize: TEXTFONTSIZE.Text18,
  },

  ViewQuestion: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  attachmentTitle: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: getHp(50),
    marginBottom: getHp(20),
  },

  selected: {
    position: 'absolute',
    top: 0,
    right: 4,
  },

  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getHp(5),
    paddingHorizontal: getWp(10),
    backgroundColor: COLORS.attachmentBg,
    marginBottom: getHp(20),
    elevation: 3,
    borderRadius: getWp(5),
  },

  attachmentText: {
    marginLeft: getWp(8),
  },
});
