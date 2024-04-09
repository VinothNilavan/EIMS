/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Fragment,
  useState,
  useCallback,
  useImperativeHandle,
  useEffect,
} from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import { SortListQuestion, MyAutoHeightWebView } from '@components';
import SortListAnswer from './SortListAnswer';
import { Base64 } from 'js-base64';
import { useStores } from '@mobx/hooks';
import { QTypes } from '../../../helpers';
import { getQuestionItemHtmlTemplate } from '@hoc';

const SortList = React.forwardRef((props, ref) => {
  const { questionTree, dragAndDropCallback, setEnableScroll, isWorksheet, userAttempts } = props;
  const store = useStores();
  const isRTL = store?.uiStore?.isRTL;
  const [options, setOptions] = useState([]);
  const [sortListQuestion, setSortListQuestion] = useState([]);
  const [sortListAnswer, setSortListAnswer] = useState([]);
  const [disableClick, setDisable] = useState(false);
  const [questionBody, setQuestionBody] = useState();

  useEffect(() => {
    let option = questionTree?.response?.choices.map((item, index) => {
      item.index = index;
      item.isImage = item.value.indexOf('img') > 0;
      return item;
    });

    setOptions(option);

    let actualQuestion = option.map(itr => ({ ...itr, isSelected: false, zIndex: 0 }));
    setSortListQuestion(actualQuestion);

    let actualAns = questionTree.stems.map(itr => ({
      identifier: itr.identifier,
      items: itr.value === '' ? null : itr,
      ref: null,
      isPrefilling: itr.value === '' ? false : true,
      stemVal: itr,
    }));

    setSortListAnswer(actualAns);
    let questionBody = getQuestionItemHtmlTemplate(QTypes.SortList, questionTree, 0, isRTL);
    setQuestionBody(questionBody);
    if (isWorksheet) {
      setAttemptedAnswers(actualQuestion, actualAns)
    }
  }, [questionTree, disableClick]);

  //callback for updating zIndex
  const updatedZIndex = useCallback(
    item => {
      let updatedSortListQuestionZIndex = sortListQuestion.map(
        singleContainer => {
          if (singleContainer.identifier === item.identifier) {
            return { ...singleContainer, zIndex: 10 };
          } else {
            return { ...singleContainer, zIndex: 0 };
          }
        },
      );
      setSortListQuestion(updatedSortListQuestionZIndex);
    },
    [sortListQuestion],
  );

  const getTotalFilledAnswerTillNow = () => {
    let count = 0;
    for (let i in sortListAnswer) {
      if (sortListAnswer[i].items != null) count++;
    }
    return count;
  }

  const callBackForAssignLetterAnswer = useCallback(
    (item, indexTrigger, cb, sortedPoints) => {
      try {
        if (getTotalFilledAnswerTillNow() >= sortListAnswer.length) return;
        if (indexTrigger === undefined) indexTrigger = 0;
        if (sortListAnswer.length != sortListQuestion.length) indexTrigger = 0;
        if (sortListAnswer[indexTrigger].isPrefilling) {
          indexTrigger = indexTrigger + 1;
        }
        let updateSortListQuestion = sortListQuestion.map(itr => {
          return itr.identifier === item.identifier ? { ...itr, isSelected: true } : itr;
        });

        let answer_updated = false;
        let updateSortListAnswer = sortListAnswer.map((itrs, index) => {
          if (itrs.items) return itrs;
          else {
            if (!answer_updated) {
              answer_updated = true;
              return { ...itrs, items: { ...item, isSelected: true } };
            } else return itrs;
          }
        });

        dragAndDropCallback(false);
        setSortListAnswer(updateSortListAnswer);
        setSortListQuestion(updateSortListQuestion);
      } catch (err) {
        console.log('SortList callBackForAssignLetterAnswer err = ', err);
      }
    },
    [sortListQuestion, sortListAnswer],
  );

  const resetArrangeLettersElement = useCallback(
    item => {
      try {
        let updateSortListQuestion = sortListQuestion.map(itr => {
          return itr.identifier === item.items.identifier
            ? { ...itr, isSelected: false }
            : itr;
        });

        let updateSortListAnswer = sortListAnswer.map(itrs => {
          if (itrs.identifier === item.identifier) {
            return { ...itrs, items: null };
          } else {
            return itrs;
          }
        });

        dragAndDropCallback(false);
        setSortListAnswer(updateSortListAnswer);
        setSortListQuestion(updateSortListQuestion);
      } catch (err) {
        console.log('SortList resetArrangeLettersElement err = ', err);
      }
    },
    [sortListQuestion, sortListAnswer],
  );

  useImperativeHandle(ref, () => ({
    evaluteAnswer() {
      try {
        if (checkAllAnswerSelected()) {
          let userInputData = {};
          questionTree.stems.map((matchStems, index) => {
            if (!matchStems.value) {
              let key = matchStems.identifier;
              userInputData = {
                ...userInputData,
                [key]: isWorksheet ? [Base64.decode(`${sortListAnswer[index].items?.identifier}`)] : [sortListAnswer[index].items?.index],
              };
            }
          });

          let isValidResponse = isValidUserResponse(userInputData);
          let payload = {};
          payload.isDynamic = questionTree?.isDynamic;
          payload.contentID = questionTree?.contentID;
          payload.score = isValidResponse ? questionTree?.responseValidation?.validResponse?.score : 0;
          payload.result = isValidResponse ? Base64.encode('pass') : Base64.encode('fail');
          payload.userResponse = {};
          payload.userResponse.type = questionTree?.template;
          payload.userResponse.SortList = userInputData;
          payload.userAttemptData = {
            trials: [{
              userResponse: {
                type: questionTree?.template,
                SortList: userInputData,
              },
              result: isValidResponse ? Base64.encode('true') : Base64.encode('false'),
              score: isValidResponse ? questionTree?.responseValidation?.validResponse?.score : 0,
            },],
          };
          let contentInfo = {};
          contentInfo.contentID = questionTree?.contentID;
          contentInfo.contentVersionID = questionTree?._id;
          contentInfo.contentType = questionTree?.contentType;
          contentInfo.questionType = questionTree?.template;
          contentInfo.revisionNum = questionTree?.revisionNo;
          contentInfo.langCode = questionTree?.langCode;
          payload.contentInfo = contentInfo;
          payload.remainingTime = 0;
          payload.nextContentSeqNum = null;
          if(!isWorksheet) setDisable(true);
          return payload;
        } else {
          store.uiStore.setLoader(false);
          return;
        }
      } catch (err) {
        console.log("Sorlist evaluteAnswer err = ", err);
      }
    },
    reset() {
      setDisable(false);
    },
  }));

  const checkAllAnswerSelected = () => {
    try {
      let isAllAnswerSelected = false;
      let ansRes = [];
      if (sortListAnswer && sortListAnswer.length > 0) {
        ansRes = sortListAnswer.filter(item => item?.items == null);
        if (ansRes.length <= 0) {
          isAllAnswerSelected = true;
        }
      }
      return isAllAnswerSelected;
    } catch (err) {
      console.log("Sorlist checkAllAnswerSelected err = ", err);
    }
  };

  const isValidUserResponse = userInputData => {
    try {
      const { scoringType, validResponse } = questionTree.responseValidation;
      const { identifier } = validResponse;
      let isValidResponse = false;

      if (scoringType === 'exact' && userInputData) {
        for (let i = 0; i < questionTree?.stems?.length; i++) {
          if (!questionTree?.stems[i].value) {
            let matchStems = questionTree?.stems[i];
            let key = matchStems.identifier;
            let decodeValidResponse =
              identifier && Base64.decode(identifier[key]);
            let userResponseIndex = userInputData[key][0];
            let decodeUserIdentifier = Base64.decode(
              options[userResponseIndex]?.identifier,
            );
            isValidResponse =
              decodeValidResponse &&
              decodeValidResponse.indexOf(decodeUserIdentifier) > 0;

            if (isValidResponse === false) {
              return false;
            }
          }
        }
      }
      return isValidResponse;
    } catch (err) {
      console.log("SortList isValidUserResponse", err);
    }
  };

  const setAttemptedAnswers = (questionProps, ansProps) => {
    try {
      if (userAttempts?.userResponse?.SortList) {
        let userAttemptedDataKeys = Object.keys(userAttempts?.userResponse?.SortList);

        let userAttemptedData = userAttemptedDataKeys.map(item => `${userAttempts?.userResponse?.SortList[item][0]}`);

        let updatedSortListQuestion = userAttemptedData.map(item => {
          let questionData = questionProps.filter(data => Base64.decode(`${data.identifier}`) == item);
          let isSelected = questionData && questionData.length > 0 && questionData[0]; 
          return { ...questionData[0], isSelected: isSelected }
        });

          let updatedSortListAnswer = ansProps.map((itrs, index) => {
            return { ...itrs, items: updatedSortListQuestion[index] }
          });

        setSortListAnswer(updatedSortListAnswer);
        setSortListQuestion(updatedSortListQuestion);
      }
    } catch (err) {
      console.log('SortList setAttemptedAnswers err = ', err);
    }
  }

  return (
    <Fragment>
      {questionBody &&
        <MyAutoHeightWebView
          style={styles.webViewContainer}
          onSizeUpdated={size => { console.log("webview  height = ", size.height); }}
          source={{ html: questionBody }}
          zoomable={false}
          bounces={false}
          javaScriptEnabled={!disableClick}
        />}
      <View
        style={
          isRTL
            ? styles.RTLDragContainQuestionParentView
            : styles.dragContainQuestionParentView
        }>
        {sortListQuestion.map(singleMap => {
          return (
            <SortListQuestion
              key={singleMap.identifier}
              item={singleMap}
              index={singleMap.index}
              arrangeTypeQuestionsAnswers={sortListAnswer}
              callBackForAssignAnswer={callBackForAssignLetterAnswer}
              dragAndDropCallback={dragAndDropCallback}
              disableClick={disableClick}
              updatedZIndex={updatedZIndex}
              setEnableScroll={setEnableScroll}
            />
          );
        })}
      </View>
      <View style={styles.separateView} />
      <View
        style={
          isRTL
            ? styles.RTLSortListAnswerContainer
            : styles.sortListAnswerContainer
        }>
        {sortListAnswer.map(singleArrangeType => {
          return (
            <SortListAnswer
              key={singleArrangeType.identifier}
              resetArrangeLettersElement={resetArrangeLettersElement}
              item={singleArrangeType}
              dragAndDropCallback={dragAndDropCallback}
              disableClick={disableClick}
            />
          );
        })}
      </View>
    </Fragment>
  );
});

export default SortList;
