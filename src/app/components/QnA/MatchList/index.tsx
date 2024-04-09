import React, { useState, Fragment, useImperativeHandle, useEffect } from 'react';
import styles from './indexCss';
import { MyAutoHeightWebView } from '@components';
import { Base64 } from 'js-base64';
import { useStores } from '@mobx/hooks';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { QTypes } from '../../../helpers';

const MatchList = React.forwardRef(
  ({ questionTree, dragAndDropCallback }, ref) => {
    const { store, uiStore } = useStores();
    const [choices, setChoices] = useState([]);
    const [stems, setStems] = useState([]);
    const [options, setOptions] = useState([]);
    const isRTL = uiStore.isRTL;
    const [questionBody, setQuestionBody] = useState();
    let qStems;

    useEffect(() => {
      setOptions(() => {
        let userOptions = questionTree?.response?.choices.map((item, index) => {
          item.index = index;
          item.store = store;
          item.isImage = item.value.indexOf('img') > 0;
          return item;
        });

        return userOptions;
      });
    }, [questionTree]);

    useEffect(() => {
      options && setChoices(options);
      qStems = questionTree?.stems.map((item, index) => {
        item.isImage = options[index]?.isImage;
        item.store = store;
        return item;
      });
      setStems(qStems);
    }, [questionTree, options]);

    useEffect(() => {
      let questionBody = getQuestionItemHtmlTemplate(QTypes.Matchlist, questionTree, 0, isRTL);
      setQuestionBody(questionBody);
      setChoices(questionTree?.response?.choices);
    }, [options, questionTree])

    useImperativeHandle(ref, () => ({
      evaluteAnswer(userInput = {}, isWorksheetOrHomeWork = false) {
        try {
          let userInputData = {};
          questionTree.stems.map((matchStems, index) => {
            let key = matchStems.identifier;
            userInputData = { ...userInputData, [key]: [choices[index].index] };
          });
          let isValidResponse = isValidUserResponse(userInputData);
          let payload = {};
          payload.isDynamic = questionTree?.isDynamic;
          payload.contentID = questionTree?.contentID;
          payload.score = isValidResponse ? questionTree?.responseValidation?.validResponse?.score : 0;
          payload.result = isValidResponse ? Base64.encode('pass') : Base64.encode('fail');
          payload.userResponse = {};
          payload.userResponse.type = questionTree?.template;
          payload.userResponse.MatchList = userInputData;
          if (isWorksheetOrHomeWork) {
            let decodedOptions = questionTree?.response?.choices.map((item) => {
              item.identifier = Base64.decode(item.identifier)
              item.value = '';
              return item;
            })
            payload.userResponse.choices = decodedOptions;
            payload.userResponse.originalChoices = decodedOptions;
          }
          payload.userAttemptData = {
            trials: [
              {
                userResponse: {
                  type: questionTree?.template,
                  MatchList: userInputData,
                },
                result: isValidResponse ? Base64.encode('true') : Base64.encode('false'),
                score: isValidResponse ? questionTree?.responseValidation?.validResponse?.score : 0
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
          uiStore.setLoader(false);
          return payload;
        } catch (err) {
          console.log("MatchList evaluteAnswer = ", err);
        }
      },
    }));


    const isValidUserResponse = userInputData => {
      const { scoringType, validResponse } = questionTree.responseValidation;
      const { identifier } = validResponse;

      let isValidResponse = false;
      try {
        if (scoringType === 'exact' && userInputData) {
          for (let i = 0; i < questionTree?.stems?.length; i++) {
            let matchStems = questionTree?.stems[i];
            let key = matchStems?.identifier;
            let decodeValidResponse = Base64.decode(identifier[key]);
            let userResponseIndex = userInputData[key][0];
            let decodeUserIdentifier = Base64.decode(options[userResponseIndex]?.identifier);
            isValidResponse = decodeValidResponse.indexOf(decodeUserIdentifier) > 0;
            if (isValidResponse === false) {
              return false;
            }
          }
        }
        return isValidResponse;
      } catch (err) {
        console.log("VAlidationResponse Error = ", err);
        return false;
      }
    };

    const webViewMessageHandler = event => {
      let webViewData = JSON.parse(event.nativeEvent.data);
      if (webViewData.hasOwnProperty('from') && webViewData.hasOwnProperty('to') && webViewData.from != webViewData.to) {
        let updatedData = choices;
        let fromItem = updatedData.find(item => item?.index == parseInt(webViewData.from));
        let toItem = updatedData.find(item => item?.index == parseInt(webViewData.to));
        let fromIndex = updatedData.findIndex(item => item?.index == parseInt(webViewData.from));
        let toIndex = updatedData.findIndex(item => item?.index == parseInt(webViewData.to));
        updatedData[fromIndex] = toItem;
        updatedData[toIndex] = fromItem;
        setChoices(updatedData);
        dragAndDropCallback(false);
      }
    }

    return (
      <Fragment>
        <MyAutoHeightWebView
          onMessage={webViewMessageHandler}
          style={styles.webViewContainer}
          onSizeUpdated={size => {
            console.log(size.height);
          }}
          source={{ html: questionBody }}
          zoomable={false}
          bounces={false}
        />
      </Fragment>
    );
  },
);

export default MatchList;
