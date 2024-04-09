import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
    textAlign: 'center',
    padding: 0,
    marginTop: getHp(25),
    marginBottom: getHp(18),
  },

  container: {
    flex: 1,
    paddingHorizontal: getWp(16),
  },

  messageListContainer: {
    flex: 1,
    borderRadius: getWp(16),
    marginBottom: getHp(20),
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },

  subject: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
  },

  ratingTitle: {
    color: COLORS.black,
  },

  messageSubjectContainer: {
    paddingHorizontal: getWp(18),
    paddingVertical: getHp(14),
    borderBottomWidth: getHp(1),
    borderBottomColor: COLORS.boderColor,
    backgroundColor: COLORS.white,
  },

  ratingContainer: {
    alignSelf: 'flex-start',
    marginBottom: getHp(20),
  },

  searchText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text14,
    marginLeft: getWp(12),
    flex: 1,
  },

  filterContainer: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWp(14),
    height: getHp(30),
  },

  filerTitle: {
    color: COLORS.lightBlue,
    fontSize: TEXTFONTSIZE.Text14,
    textAlign: 'center',
  },

  searchCountStyle: {
    color: COLORS.infoMessageGray,
    fontSize: TEXTFONTSIZE.Text14,
    marginVertical: getHp(10),
    textAlign: 'center',
  },

  mailDetailsItem: {
    borderBottomColor: COLORS.white,
  },

  replyContainer: {
    borderTopWidth: getHp(1),
    borderTopColor: COLORS.boderColor,
    padding: getWp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  replyText: {
    color: COLORS.replyTextColor,
    marginLeft: getWp(16),
  },

  sendButton: {
    width: getWp(100),
    paddingLeft: getWp(22),
    paddingRight: getWp(10),
    paddingVertical: getHp(10),
    backgroundColor: COLORS.btnColor,
    borderRadius: getHp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sendButtonDisabled: {
    backgroundColor: COLORS.disabledSendButtonColor,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text14,
  },

  textArea: {
    textAlignVertical: 'top',
    paddingTop: getHp(20),
    color: COLORS.secondaryBlack,
    fontSize: TEXTFONTSIZE.Text14,
    maxHeight: getHp(140),
    paddingHorizontal: getWp(16),
    marginHorizontal: getWp(16),
    marginTop: getHp(30),
    backgroundColor: COLORS.messageAreaBg,
  },

  footer: {
    maxHeight: getHp(350),
  },

  count: {
    textAlign: 'right',
    color: COLORS.textCountColor,
    fontSize: TEXTFONTSIZE.Text13,
    marginRight: getWp(16),
    marginBottom: getHp(15),
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: getWp(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: getHp(10),
  },

  attachmentText: {
    fontSize: TEXTFONTSIZE.Text14,
  },
  attachmentContainer: {
    backgroundColor: COLORS.attachmentBg,
    marginHorizontal: getWp(12),
    marginVertical: getHp(5),
    paddingLeft: getWp(13),
    paddingRight: getWp(16),
    paddingVertical: getWp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  attachmentError: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.errorMessage,
  },

  detailsContainer: {
    width: getWp(250),
  },
  footerContainerStyle: {
    height: 0,
  },
});
