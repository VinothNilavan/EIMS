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
    marginTop: getHp(30),
  },

  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    paddingHorizontal: getWp(16),
  },

  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: getHp(50),
    padding: 0,
  },

  messageContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginVertical: getWp(16),
    borderRadius: getWp(16),
  },

  toContainer: {
    borderBottomColor: COLORS.boderColor,
    borderBottomWidth: getWp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWp(12),
    paddingVertical: getHp(16),
  },

  toTextStyle: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text16,
    marginRight: getWp(6),
  },

  recipientStyle: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text16,
    fontFamily: 'BalooThambi-Regular',
    padding: 0,
  },

  textArea: {
    paddingHorizontal: getWp(16),
    flex: 1,
    textAlignVertical: 'top',
    paddingTop: getHp(20),
    color: COLORS.secondaryBlack,
    fontSize: TEXTFONTSIZE.Text14,
    minHeight: getHp(145),
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
    borderTopColor: COLORS.boderColor,
    borderTopWidth: getWp(1),
    //paddingTop: getWp(8),
  },

  scrollView: {
    flexGrow: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  attachmentText: {
    fontSize: TEXTFONTSIZE.Text14,
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
    marginTop: getWp(5)
  },

  buttonText: {
    color: COLORS.white,
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

  sendButtonDisabled: {
    backgroundColor: COLORS.disabledSendButtonColor,
  },
  footerContainerStyle: {
    height: 0,
  },
});
