import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  bottomBtnContainer: {
    flex: 1,
    elevation: 3,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: getHp(53.7),
    alignItems: 'center',
    position: 'absolute',
    marginLeft: getWp(16),
    bottom: getHp(30),
    alignSelf: 'center',
    width: getWp(360),
    justifyContent: 'space-between',
  },

  bottomBtnText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
  },

  bottomLeftButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  // Homework useQnA styles
  solutionContainer: {
    flexDirection: 'column',
    marginTop: getHp(18),
    backgroundColor: COLORS.worksheetReportQuestionOptionColor,
    borderRadius: getWp(10),
    marginStart: getWp(12),
    marginEnd: getWp(16),
    paddingStart: getWp(16),
    paddingEnd: getWp(16),
  },

  solutionTitle: {
    color: COLORS.leaderBoardTitleColor,
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: getHp(16),
  },

  solutionField: {
    height: getHp(180),
    width: getWp(330),
    backgroundColor: COLORS.white,
    borderRadius: getWp(10),
    borderColor: COLORS.textAreaBdrColor,
    marginTop: getHp(10),
    textAlign: 'left',
    paddingStart: getWp(12),
    textAlignVertical: 'top',
    paddingTop: getHp(12),
    fontFamily: 'BalooThambi-Regular',
  },

  solutionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHp(12),
    marginStart: getWp(5),
  },

  solutionButtonSubContainer: {
    width: getWp(130),
    height: getHp(40),
    backgroundColor: COLORS.btnColor,
    borderRadius: getWp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  solutionButtonText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text14,
    marginEnd: getHp(10),
  },

  solutionDescriptionText: {
    marginTop: getHp(18),
    color: COLORS.leaderBoardTitleColor,
    fontSize: TEXTFONTSIZE.Text12,
    marginBottom: getHp(34),
  },

  solutionAttachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getHp(48),
    backgroundColor: COLORS.white,
    borderRadius: getWp(10),
    overflow: 'hidden',
    marginTop: getHp(16),
  },

  solutionAttachmentImage: {
    height: getHp(48),
    width: getWp(60),
    resizeMode: 'contain',
  },

  solutionAttachmentText: {
    // flex: 1,
    marginStart: getWp(10),
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.leaderBoardTitleColor,
    width: getWp(200),
  },

  solutionCloseButton: {
    marginStart: getWp(14),
    marginEnd: getWp(14),
  },

  solutionUploadErrorMsg: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text14,
    marginStart: getWp(14),
    marginTop: getHp(5),
  },
});
