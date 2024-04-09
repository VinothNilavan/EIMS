import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  title: {
    color: COLORS.btnColor,
    fontSize: TEXTFONTSIZE.Text26,
    textAlign: 'center',
    marginBottom: '1%',
    alignSelf: 'center',
  },

  subTitle: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text16,
    marginBottom:  '1%',
    alignSelf: 'center',
  },

  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(10),
    borderWidth: getWp(5),
    paddingVertical: getHp(20),
    paddingHorizontal: getWp(16),
    borderColor: COLORS.infoContainerBdr,
    height: getHp(715),
    alignSelf:'center',
  },

  closeButton: {
    alignSelf: 'flex-end',
    justifyContent: "center",
    alignItems: "center",
    width: getWp(25),
    height: getWp(25),
  },

  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: Platform.OS === 'ios' ? null : getHp(50),
    padding: 0,
  },

  messageContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: getWp(10),
    borderWidth: getWp(5),
    paddingTop: getHp(30),
    borderColor: COLORS.infoContainerBdr,
    alignItems: 'center',
    height: '70%'
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
    padding: getWp(12),
    flex: 1,
    textAlignVertical: 'top',
    color: COLORS.secondaryBlack,
    fontSize: TEXTFONTSIZE.Text14,
    fontFamily: 'BalooThambi-Regular',
  },

  textAreaContainer: {
    backgroundColor: COLORS.messageAreaBg,
    minHeight: getHp(120),
    height:'10%',
    flex: 1,
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getHp(20),
  },

  attachmentText: {
    fontSize: TEXTFONTSIZE.Text14,
  },

  sendButton: {
    width: getWp(105),
    paddingLeft: '40%',
    paddingRight: '40%',
    paddingVertical: '10%',
    backgroundColor: COLORS.btnColor,
    borderRadius: getHp(50),
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

  buttonStyle: {
    alignSelf: 'center',
    marginTop: getHp(-50),
  },
  
  errorMsg: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text14,
    alignSelf: 'center',
  },

  errorContainer: {
    marginBottom: getWp(25)
  }
});
