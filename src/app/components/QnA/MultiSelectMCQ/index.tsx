/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { HintBox } from '@components';

import { validateUserResponseArrays } from '@utils';
import { Base64 } from 'js-base64';
import { useStores } from '@mobx/hooks';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { QTypes } from '../../../helpers';

const MultiSelectMCQ = React.forwardRef((props, ref) => {
  const {
    questionData,
    selectedChoice,
    setSelectedChoices,
    dragCallback,
    userResponse
  } = props;

  const [trials, setTrials] = useState(-1);
  const [showHint, setShowHint] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);
  const [disableClick, setDisable] = useState(false);
  const store = useStores();
  const [QuestionBody, set_QuestionBody] = useState([]);
  const isRTL = store?.uiStore?.isRTL;

  useEffect(() => {
    setSelectedChoices([]);
    setDisable(false);
    setTrials(questionData.trials);
    if (questionData.trials === 1 && questionData.hints.length > 0) {
      setShowHint(true);
    }
  }, []);

  useEffect(() => {
    let questionBody = '';
    questionBody = getQuestionItemHtmlTemplate(QTypes.MMcq, questionData, 0, isRTL, {}, [], userResponse);
    set_QuestionBody(questionBody);
    handledPreAttemptedData();
    setDisable(false);
  }, [questionData]);

  const handledPreAttemptedData = () => {
    let selectedItem = [];
    userResponse.map(item => {
      selectedItem.push(item);
    });
    setSelectedChoices(selectedItem);
  }

  useImperativeHandle(ref, () => ({
    evaluteAnswer(userInputData) {
      if (userInputData && userInputData.length > 0) {
        let isValidResponse = isValidUserResponse(userInputData);

        let payload = {};
        payload.isDynamic = questionData?.isDynamic;
        payload.contentID = questionData?.contentID;
        payload.score = isValidResponse ? questionData?.responseValidation?.validResponse?.score : 0;
        payload.result = isValidResponse ? Base64.encode('pass') : Base64.encode('fail');
        payload.userResponse = {};
        payload.userResponse.type = questionData?.template;
        payload.userResponse.userAnswer = userInputData;
        payload.userAttemptData = {
          trials: [
            {
              userResponse: {
                mcqPattern: {
                  type: questionData?.template,
                  userAnswer: userInputData
                },
              },
              result: isValidResponse ? Base64.encode('true') : Base64.encode('false'),
              score: isValidResponse ? questionData?.responseValidation?.validResponse?.score : 0,
            },
          ],
        };
        let contentInfo = {};
        contentInfo.contentID = questionData?.contentID;
        contentInfo.contentVersionID = questionData?._id;
        contentInfo.contentType = questionData?.contentType;
        contentInfo.questionType = questionData?.template;
        contentInfo.revisionNum = questionData?.revisionNo;
        contentInfo.langCode = questionData?.langCode;
        payload.contentInfo = contentInfo;
        payload.remainingTime = 0;
        payload.nextContentSeqNum = null;
        setDisable(true);
        return payload;
      }
      return null;
    },

    reset() {
      setTrials(-1);
      setSelectedChoices([]);
      setDisable(false);
      setShowHint(false);
      setShowHintBox(false);
    },
  }));

  const isValidUserResponse = userInputData => {
    let isValidResponse = false;
    if (userInputData) {
      let userResponse = [];
      let options = questionData?.response?.mcqPattern?.choices;
      for (let item of userInputData) {
        userResponse = userResponse.concat(options[item]);
      }
      let resValidation = questionData?.responseValidation;
      if (resValidation?.hasOwnProperty('validResponse') && resValidation?.validResponse) {
        let responseValidation = resValidation?.validResponse;
        isValidResponse = validateUserResponseArrays(responseValidation?.identifier, userResponse);
      } else if (resValidation?.hasOwnProperty('altResponses') && resValidation?.altResponses.length > 0) {
        for (let item of resValidation?.altResponses) {
          isValidResponse = validateUserResponseArrays(item?.identifier, userResponse);
          if (isValidResponse) {
            break;
          }
        }
      }
    }
    return isValidResponse;
  };

  const hintToggle = showBox => {
    setShowHintBox(showBox);
  };

  const onSelectOption = data => {
    try {
      let remTrials = trials - 1;
      let selectedItem = [];
      if (selectedChoice) {
        if (selectedChoice.indexOf(data.index) >= 0) {
          selectedItem = selectedChoice.reduce((p, c) => (c !== data.index && p.push(c), p), []);
          setSelectedChoices(selectedItem);
        } else {
          selectedItem = selectedChoice.concat(data.index);
          setSelectedChoices(selectedItem);
          setTrials(remTrials);
        }
      } else {
        selectedItem.push(data.index);
        setSelectedChoices(selectedItem);
        setTrials(remTrials);
      }
      if (questionData.hints && questionData.hints.length > 0) {
        setShowHint(true);
      }
    } catch (error) {
      console.log('error in m mcq ', error);
    }
  };

  const webMessageHandler = (event) => {
    let { data } = event.nativeEvent;
    let temp_data = JSON.parse(data);
    if (temp_data?.id) {
      onSelectOption({ index: temp_data.id })
    }
  }

  return (
    <View style={styles.mainContainer} >
      <View pointerEvents={disableClick ? 'none' : 'auto'}>
        {QuestionBody && QuestionBody.length > 0 ? (
          <TouchableWithoutFeedback
            onLongPress={() => {
              console.log('Disabling the scroll');
              dragCallback(true);
            }}
            onPressOut={() => {
              dragCallback(false);
              console.log('Enabling the scroll');
            }}>
            <AutoHeightWebView
              customStyle={`
                                * {font-family: 'Times New Roman';}
                                    p {font-size: 16px;}
                              `}
              style={styles.questionContainer}
              onSizeUpdated={size => console.log(size.height)}
              files={[{
                href: 'cssfileaddress',
                type: 'text/css',
                rel: 'stylesheet'
              }]}
              source={{ html: QuestionBody, baseUrl: '' }}
              startInLoadingState={true}
              viewportContent={'width=device-width, user-scalable=no'}
              onMessage={webMessageHandler}
              originWhitelist={['*']}
              bounces={false}
              automaticallyAdjustContentInsets={false}
            />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      <HintBox
        hintList={questionData.hints}
        toggleCallback={hintToggle}
        showBtn={showHint}
        showHints={showHintBox}
        showHide={!showHintBox}
        trials={trials}
      />
    </View>
  );
});

MultiSelectMCQ.propTypes = {
  questionData: PropTypes.object,
  setSelectedChoices: PropTypes.func,
  dragCallback: PropTypes.func,
  onSoundBtnClicked: PropTypes.func,
};

MultiSelectMCQ.defaultProps = {
  setSelectedChoices: () => { console.log('selected choices'); },
  dragCallback: () => { console.log('selected drag and drop'); },
  onSoundBtnClicked: () => { console.log('on sound btn click'); }
};

export default MultiSelectMCQ;
