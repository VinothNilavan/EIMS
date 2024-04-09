//import liraries
import React, { useState } from 'react';
import { View } from 'react-native';
import { WorksheetQuestionItem, QuestionItem, HomeworkQuestionItem } from '@hoc';
import { ReportScreen } from '../../helpers';
import { SelectionPopup } from '@components';
import { useStarQuestion, useLanguage } from '@hooks';

interface ReportProps {
  testID: string,
  item: any,
  seqNum: any,
  permissions: any,
  screen: string,
  onPressStar: any,
  topicId: string,
  isFromStarredQuestions: false,
  onPressStarBtn: any,
}

// create a component
const CustomReportListCard = (props: ReportProps) => {
  const [showRemoveFavPopUp, setShowRemoveFavPopUp] = useState(false);

  const {
    testID,
    item,
    seqNum,
    permissions,
    screen,
    topicId,
    isFromStarredQuestions,
    onPressStarBtn,
  } = props;

  const { onStarHandler } = useStarQuestion();
  const {
    attentionPleaseText,
    thisWillRemoveDescText,
    noCancelBtnText,
    yesRemoveBtnText,
  } = useLanguage();


  const onPressStar = () => {
    let itemCopy = item
    console.log('item coopy', item);
    if (itemCopy.isFavourite) {
      setShowRemoveFavPopUp(true);
    } else {
      itemCopy.isFavourite = true;
      let req = {
        conceptID: itemCopy.conceptID,
        topicID: topicId,
        contentInfo: {
          contentID: itemCopy.contentID,
          contentVersionID: itemCopy.data._id,
          version: itemCopy.revisionNo,
          context: itemCopy.langCode,
        },
      };
      onStarHandler(req, false);
    }
  };

  const onCancelPressHandler = () => {
    setShowRemoveFavPopUp(false);
  };

  const onActionPressHandler = () => {
    let itemCopy = item
    itemCopy.isFavourite = false;
    setShowRemoveFavPopUp(false);
    let req = {
      contentId: itemCopy.contentID,
      topicId: topicId,
    };
    onStarHandler(req, true);
  };


  const getQuestionItem = () => {
    switch (screen) {
      case ReportScreen.Worksheet:
        return (
          <View style={{ marginVertical: 10 }}>
            <WorksheetQuestionItem
              testID={`WorksheetQuestionItemWorksheetReport${testID}`}
              response={item}
              seqNum={seqNum}
              permissions={permissions}
              fromCommonReport={true}
            />
          </View>
        )
      case ReportScreen.Homework:
        return (
          <HomeworkQuestionItem
            testID="HomeworkQuestionItemHomeworkReport"
            response={item}
            permissions={permissions}
            hasHomework={true}
            fromCommonReport={true}
          />)
      case ReportScreen.DiscreteSkill:
        return (
          <QuestionItem
            response={item}
            seqNum={item?.contentSeqNum}
            permissions={permissions}
            howIDid={true}
            fromCommonReport={true}
          />
        )
      case ReportScreen.Topic:
        return (
          <QuestionItem
            accessible={true}
            testID={`HowIDidQuestionCard${item.data._id}`}
            accessibilityLabel={`HowIDidQuestionCard${item.data._id}`}
            response={item}
            permissions={permissions}
            onPressStar={() => onPressStar()}
            fromCommonReport={true}
          />
        )
      case ReportScreen.StarredScreen:
        return (
          <QuestionItem
            response={item}
            seqNum={item?.contentSeqNum}
            permissions={permissions}
            howIDid={false}
            onPressStar={() => {
              onPressStarBtn();
            }}
            fromCommonReport={true}
            isFromStarredQuestions={isFromStarredQuestions || false}
          />
        )
      default:
        break;
    }
  }


  return (
    <View>
      {getQuestionItem()}
      <SelectionPopup
        testID="SelectionPopupStarredQuestion"
        show={showRemoveFavPopUp}
        svgText={attentionPleaseText}
        desc={thisWillRemoveDescText}
        cancelBtnText={noCancelBtnText}
        actionBtnText={yesRemoveBtnText}
        onCancelPress={onCancelPressHandler}
        onActionPress={onActionPressHandler}
      />
    </View>
  );
};

CustomReportListCard.defaultProps = {
  isFromStarredQuestions: false,
};

//make this component available to the app
export default CustomReportListCard;
