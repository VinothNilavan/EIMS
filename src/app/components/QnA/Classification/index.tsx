import React, { useState, Fragment, useImperativeHandle, useEffect } from 'react';
import style from './indexCss';
import { QuestionContainer, MyAutoHeightWebView } from '@components';
import { Base64 } from 'js-base64';
import { useStores } from '@mobx/hooks';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { QTypes } from '../../../helpers';

const Classification = React.forwardRef(({ questionTree, isWorkSheetOrHomeWork, questions, isReport }, ref) => {
  const { uiStore } = useStores();
  const [container1, setContainer1] = useState([]);
  const [container2, setContainer2] = useState([]);
  const [dragContainer, setDragContainer] = useState([]);
  const [questionBody, setQuestionBody] = useState();
  const [disableWebview, setDisableWebview] = useState(true);

  useEffect(() => {
    let qBody = '';
    if (isReport) {
      if (questions?.userAttemptData.hasOwnProperty('userResponse') && questions?.userAttemptData.userResponse) {
        let userAttemptData = questions?.userAttemptData?.userResponse?.Classification;
        let userMarkedListData = getMarkedList(userAttemptData);
        qBody = getQuestionItemHtmlTemplate(QTypes.Classification, questionTree, 0, isRTL, userMarkedListData, [...userAttemptData.stem0, ...userAttemptData.stem1], [], isReport);
      } else {
        qBody = getQuestionItemHtmlTemplate(QTypes.Classification, questionTree, 0, isRTL, [], [], [], isReport);
      }
      setTimeout(() => { setDisableWebview(false); }, 2000);
    } else {
      if (isWorkSheetOrHomeWork && questions?.contentParams?.userAttemptData.hasOwnProperty('userResponse')) {
        let userAttemptData = questions?.contentParams?.userAttemptData?.userResponse?.Classification;
        let userMarkedListData = getMarkedList(userAttemptData);
        qBody = getQuestionItemHtmlTemplate(QTypes.Classification, questionTree, 0, isRTL, userMarkedListData, [...userAttemptData.stem0, ...userAttemptData.stem1]);
      } else {
        qBody = getQuestionItemHtmlTemplate(QTypes.Classification, questionTree, 0, isRTL);
      }
    }
    setQuestionBody(qBody);
  }, [questionTree]);

  useEffect(() => {
    setDragContainer(
      questionTree?.response?.choices.map((item, index) => ({
        ...item,
        index,
        isSelected: false,
        zIndex: 0,
      })),
    );
  }, [questionTree]);

  const getMarkedList = (userAttemptData) => {
    if (userAttemptData?.stem0.length > 0 || userAttemptData?.stem1.length > 0) {
      let containerAttemptedData = { container1: [], container2: [] };
      let container1 = questionTree?.response?.choices?.filter(item => userAttemptData.stem0.includes(item.identifier));
      let container2 = questionTree?.response?.choices?.filter(item => userAttemptData.stem1.includes(item.identifier))
      containerAttemptedData.container1 = container1;
      containerAttemptedData.container2 = container2;
      setContainer1(container1);
      setContainer2(container2);
      return containerAttemptedData
    } else return {};
  }

  const isRTL = uiStore.isRTL;

  const dragToContainer1New = item => {
    let updatedDragComponent = dragContainer.map(singleDrag => {
      return singleDrag.identifier === item.identifier ? { ...singleDrag, isSelected: true } : singleDrag;
    });
    setDragContainer(updatedDragComponent);
    setContainer1(prevState => [...prevState, item]);
  };

  const dragToContainer2New = item => {
    let updatedDragComponent = dragContainer.map(singleDrag => {
      return singleDrag.identifier === item.identifier ? { ...singleDrag, isSelected: true } : singleDrag;
    });
    setDragContainer(updatedDragComponent);
    setContainer2(prevState => [...prevState, item]);
  }

  const getfilterdChoices = (userInputData = {}) => {
    let originalChoices = [];
    let stem0 = {};
    let stem1 = {};
    if (isWorkSheetOrHomeWork) {
      if (questions?.contentParams?.userResponse?.hasOwnProperty('originalChoices')) {
        originalChoices = questions?.contentParams?.userResponse?.originalChoices;
      } else {
        originalChoices = questionTree?.response?.choices?.map(item => ({ ...item, identifier: parseInt(Base64.decode(`${item.identifier}`)) }));
      }
      if (userInputData.hasOwnProperty('stem0')) {
        container1.forEach((item, index) => {
          stem0[index] = { ...item, identifier: parseInt(Base64.decode(`${item.identifier}`)) }
        })
      }
      if (userInputData.hasOwnProperty('stem1')) {
        container2.forEach((item, index) => {
          stem1[index] = { ...item, identifier: parseInt(Base64.decode(`${item.identifier}`)) }
        })
      }
    }
    return { originalChoices, choices: [stem0, stem1] }
  }

  useImperativeHandle(ref, () => ({
    evaluteAnswer() {
      try {
        if ((container1 && container1.length > 0) || (container2 && container2.length > 0)) {
          let userInputData = {};
          let container1InputData = container1.map(item => { return parseInt(Base64.decode(item?.identifier)); });
          let container2InputData = container2.map(item => { return parseInt(Base64.decode(item?.identifier)); });
          let keyList = questionTree.stems.map((matchStems, index) => {
            return matchStems.identifier;
          });
          userInputData[keyList[0]] = container1InputData;
          userInputData[keyList[1]] = container2InputData;
          let payload = {};
          payload.isDynamic = questionTree?.isDynamic;
          payload.contentID = questionTree?.contentID;
          payload.score = isValidUserResponse(userInputData)
            ? questionTree?.responseValidation?.validResponse?.score
            : 0;
          payload.result = isValidUserResponse(userInputData)
            ? Base64.encode('pass')
            : Base64.encode('fail');
          payload.userResponse = {};
          payload.userResponse.type = questionTree?.template;
          payload.userResponse.Classification = userInputData;
          let { choices, originalChoices } = getfilterdChoices(userInputData);
          payload.userResponse.choices = choices;
          payload.userResponse.originalChoices = originalChoices;
          payload.userAttemptData = {
            trials: [
              {
                userResponse: {
                  type: questionTree?.template,
                  Classification: userInputData,
                },
                result: isValidUserResponse(userInputData)
                  ? Base64.encode('true')
                  : Base64.encode('false'),
                score: isValidUserResponse(userInputData)
                  ? questionTree?.responseValidation?.validResponse?.score
                  : 0,
              },
            ],
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
          if (!isWorkSheetOrHomeWork) {
            setDisableWebview(false);
          }
          return payload;
        }
        return null;
      } catch (err) {
        console.log("Classification evaluteAnswer = ", err);
      }
    },
    reset() { setDisableWebview(false); },
  }));

  const isValidUserResponse = userInputData => {
    try {
      const { scoringType, validResponse } = questionTree.responseValidation;
      const { identifier } = validResponse;
      let isValidResponse = false;
      if (scoringType === 'exact' && userInputData) {
        for (let i = 0; i < questionTree?.stems?.length; i++) {
          let matchStems = questionTree?.stems[i];
          let key = matchStems.identifier;
          let isValid = true;
          let decodeValidResponse = JSON.parse(Base64.decode(identifier[key]));
          if (decodeValidResponse.length != userInputData[key].length) {
            return false;
          }
          userInputData[key].map((item) => {
            isValidResponse = decodeValidResponse.includes(item);
            if (isValidResponse === false) {
              isValid = false;
            }
          })
          if (isValidResponse === false || !isValid) {
            return false;
          }
        }
      }
      return isValidResponse;
    } catch (err) {
      console.log("isValidUserResponse error = ", err);
    }
  };

  if (questionTree?.stems && questionTree?.stems.length > 0) {
    container1Label = questionTree?.stems[0]
      ? questionTree?.stems[0]?.value
      : '';
    container2Label = questionTree?.stems[1]
      ? questionTree?.stems[1]?.value
      : '';
  }

  const webViewMessageHandler = (event) => {
    let webViewData = JSON.parse(event.nativeEvent.data);
    if (webViewData.hasOwnProperty('option') && webViewData.option == 'remove') {
      let item1 = container1.filter(item => Base64.decode(`${item.identifier}`) != webViewData.itemId);
      setContainer1(item1);
      let item2 = container2.filter(item => Base64.decode(`${item.identifier}`) != webViewData.itemId);
      setContainer2(item2);
    } else {
      if (webViewData.hasOwnProperty('itemId') && webViewData.hasOwnProperty('container')) {
        let item = dragContainer.filter(item => Base64.decode(`${item.identifier}`) == webViewData.itemId);
        if (webViewData.container == 1) {
          dragToContainer1New(item[0])
        } else {
          dragToContainer2New(item[0])
        }
      }
    }
  }

  return (
    <Fragment>
      <QuestionContainer questionTree={questionTree} />
      {questionBody && <MyAutoHeightWebView
        onMessage={webViewMessageHandler}
        style={style.webViewContainer}
        onSizeUpdated={size => {
          console.log("webview  height = ", size.height);
        }}
        source={{ html: questionBody }}
        zoomable={false}
        bounces={false}
        javaScriptEnabled={disableWebview}
      />}
    </Fragment>
  );
},
);

export default Classification;
