/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { useToast } from 'native-base';
import styles from './indexCss';
import { COLORS } from '@constants';
import { Base64 } from 'js-base64';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { HintBox } from '@components';
import { validateUserResponseArrays } from '@utils';
import { useStores } from '@mobx/hooks';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { QTypes } from '../../../helpers';

const MCQ = React.forwardRef((props, ref) => {
  const {
    isScreeningTest,
    isWorkOrHomeWorkTest,
    selectedChoice,
    setSelectedChoice,
    lockOptions,
    questionData,
  } = props;

  const [trials, setTrials] = useState(-1);
  const [showHint, setShowHint] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [selected, setSelected] = useState(false);
  const Toast = useToast();
  const [newHeight, setnewHeight] = useState(hp('1'));
  const [questionBody, setQuestionBody] = useState('');
  const webref = useRef(null);

  const store = useStores();
  const { qnaStore, uiStore } = store;
  const isRTL = uiStore.isRTL;

  useEffect(() => {
    setTrials(questionData.trials);
    if (questionData.trials == 1 && questionData.hints && questionData.hints.length > 0) {
      setShowHint(true);
    }
    return () => {
      setSelectedChoice(-1);
    };
  }, [questionData]);

  useEffect(() => {
    let hideQuesInSeconds = questionData?.display?.hideQuesInSeconds
    let questionBody = getQuestionItemHtmlTemplate(QTypes.MCQ, questionData, hideQuesInSeconds ? parseInt(hideQuesInSeconds) * 1000 : 0, isRTL);
    setQuestionBody(questionBody);
  }, [questionData]);

  useImperativeHandle(ref, () => ({
    evaluteAnswer(userInputData) {
      let isValidResponse = isValidUserResponse(userInputData);
      let validResponseScore = questionData?.responseValidation?.validResponse.score;
      let validScore = validResponseScore ? validResponseScore : 1;
      let payload = {};
      payload.isDynamic = questionData?.isDynamic;
      payload.contentID = questionData?.contentID;
      payload.score = isValidResponse ? validScore : 0;
      payload.result = isValidResponse ? Base64.encode('pass') : Base64.encode('fail');
      payload.userResponse = {};
      payload.userResponse.mcqPattern = {};
      payload.userResponse.mcqPattern.type = questionData?.template;
      payload.userResponse.mcqPattern.userAnswer = [userInputData.index];
      payload.userAttemptData = {
        trials: [
          {
            userResponse: {
              mcqPattern: {
                type: questionData?.template,
                userAnswer: [userInputData.index],
              },
            },
            result: isValidResponse
              ? Base64.encode('true')
              : Base64.encode('false'),
            score: isValidResponse ? validScore : 0,
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

      return payload;
    },

    reset() { console.log('reset'); },
  }));

  const isValidUserResponse = data => {
    let isValidResponse = false;
    let userResponse = [data.data];
    let resValidation = questionData.responseValidation;
    let resMcqPattern = questionData.response.mcqPattern;

    if (resValidation?.hasOwnProperty('validResponse') && resValidation?.validResponse && resValidation?.validResponse?.identifier) {
      let { identifier } = resValidation?.validResponse;
      isValidResponse = validateUserResponseArrays(identifier, userResponse);
    } else if (resMcqPattern?.hasOwnProperty('correctAnswer') && resMcqPattern?.correctAnswer && resMcqPattern?.correctAnswer !== '') {
      isValidResponse = data.index === Number(Base64.decode(resMcqPattern.correctAnswer)) ? true : false;
    }
    return isValidResponse;
  };

  const hanldePreviousMarkAnsforHomeWorkOrWorksheet = (data, resultBoolean) => {
    try {
      if (!lockOptions) {
        qnaStore.setTrials(trials);
        setSelectedChoice(data.index);
        if (resultBoolean) {
          props.trueSelectionMcq(data);
        } else if (!resultBoolean && trials > 0) {
          if (!Toast.isActive(5) && !isWorkOrHomeWorkTest) {
            Toast.show({ id: 5, description: `WRONG ANSWER, You have ${trials} trial left.`, duration: 2000 });
          }
          if (questionData.hints && questionData.hints.length > 0) {
            setShowHint(true);
          }
          props.falseSelectionMcq(data);
        } else {
          props.falseSelectionMcq(data);
        }
      }
    }
    catch (error) {
      console.log('errror on mcq ', error);
    }
  }

  const checkAnswerStatus = data => {
    let resValidation = questionData.responseValidation;
    let mcqPattern = questionData?.response?.mcqPattern;
    if (resValidation?.hasOwnProperty('validResponse') && resValidation?.validResponse && resValidation?.validResponse?.identifier) {
      let { identifier } = resValidation?.validResponse;
      let userIdentifier = data?.item?.identifier;
      if (identifier == userIdentifier) return true;
    } else if (mcqPattern?.hasOwnProperty('correctAnswer') && mcqPattern?.correctAnswer && mcqPattern?.correctAnswer !== '') {
      return (data.index === Number(Base64.decode(mcqPattern.correctAnswer)));
    }
    return false;
  };

  const handleForPreMarkedMcqOption = () => {
    if (isWorkOrHomeWorkTest && selectedChoice != undefined && selectedChoice != -1) {
      let mcqItem = { index: Number(selectedChoice), data: questionData.response.mcqPattern.choices[selectedChoice] }
      const resultBoolean = isValidUserResponse(mcqItem);
      webref?.current?.injectJavaScript(`document.getElementById('00${selectedChoice}').style.backgroundColor='${COLORS.yellow}'`);
      hanldePreviousMarkAnsforHomeWorkOrWorksheet(mcqItem, resultBoolean);
    }
  }

  const webViewMcqOptionClickListner = (data) => {
    let mcqdata = JSON.parse(data);
    let id = mcqdata.id;
    let mcqItem = { index: Number(id), data: questionData.response.mcqPattern.choices[id] }

    if (isWorkOrHomeWorkTest && selectedChoice != 'undefined' && selectedChoice == mcqItem.index) {
      return;
    } else if (isWorkOrHomeWorkTest && selectedChoice != 'undefined') {
      configMcqOption(questionData, webref);
    } else if ((!qnaStore.isTimeTest) && selected) {
      return;
    }

    let backgroundColor = COLORS.blue;
    const isSelected = true;
    const resultBoolean = isValidUserResponse(mcqItem);
    if (isScreeningTest) {
      backgroundColor = bgColorFirst(resultBoolean, isSelected, backgroundColor);
    } else {
      backgroundColor = bgColorSecond(resultBoolean, isSelected, isWorkOrHomeWorkTest, backgroundColor);
    }

    if (isScreeningTest && isFetching) {
      if (checkAnswerStatus(mcqItem)) {
        backgroundColor = COLORS.green;
      }
    }

    webref?.current?.injectJavaScript(`document.getElementById('00${id}').style.backgroundColor='${backgroundColor}'`);
    setSelected(true);

    if (lockOptions) {
      console.log('lock options locked ...')
      return;
    }

    try {
      if (isScreeningTest) {
        setIsFetching(true);
      }
      let remTrials = trials - 1;
      console.log('Result:', resultBoolean);
      console.log('Trial Count:', remTrials);
      setTrials(remTrials);
      qnaStore.setTrials(remTrials);
      console.log('remaining trials', trials);
      setSelectedChoice(mcqItem.index);
      if (resultBoolean) {
        props.trueSelectionMcq(mcqItem);
      } else if (!resultBoolean && remTrials > 0) {
        if (!Toast.isActive(6)) {
          Toast.show({ id: 6, description: `WRONG ANSWER, You have ${remTrials} trial left.`, duration: 2000 });
          setSelected(false);
        }
        if (questionData.hints && questionData.hints.length > 0) {
          setShowHint(true);
        }
      } else {
        props.falseSelectionMcq(mcqItem);
      }
      if (isScreeningTest) {
        props.submitQuestion(mcqItem);
      }
    }
    catch (error) {
      console.log('error in mcq web ref', error);
    }
  }

  const hintToggle = showBox => {
    setShowHintBox(showBox);
  };

  const web_message_handler = (webHandler) => {
    let { data } = webHandler.nativeEvent;
    webViewMcqOptionClickListner(data);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ margin: '2%' }}>
          <AutoHeightWebView mediaPlaybackRequiresUserAction={false}
            customStyle={`
              * {font-family: 'Times New Roman';}
              p {font-size: 16px;}
            `}
            style={{
              ...styles.webViewContainer,
              ...{ height: newHeight },
            }}
            onSizeUpdated={size => { setnewHeight(size.height);  }}
            onLoadEnd={() => handleForPreMarkedMcqOption() }
            files={[{
              href: 'cssfileaddress',
              type: 'text/css',
              rel: 'stylesheet'
            }]}
            source={{ html: questionBody, baseUrl: '' }}
            scalesPageToFit={false}
            ref={webref}
            startInLoadingState={true}
            viewportContent={'width=device-width, user-scalable=no'}
            onMessage={web_message_handler}
            originWhitelist={['*']}
            bounces={false}
            automaticallyAdjustContentInsets={false}
          />
        </View>
        <HintBox
          hintList={questionData.hints}
          toggleCallback={hintToggle}
          showBtn={showHint}
          showHints={showHintBox}
          showHide={!showHintBox}
          trials={trials}
        />

      </ScrollView>
    </View>
  );
}
);

MCQ.propTypes = {};

MCQ.defaultProps = { isWorkOrHomeWorkTest: false };

export default MCQ;

const configMcqOption = (questionData: any, webref: React.MutableRefObject<null>) => {
  for (let itr = 0; itr < questionData.response.mcqPattern.choices.length; itr++) {
    webref?.current?.injectJavaScript(`document.getElementById('00${itr}').style.backgroundColor='${COLORS.blue}'`);
  }
}

const bgColorSecond = (resultBoolean: boolean, isSelected: boolean, isWorkOrHomeWorkTest: any, backgroundColor: any) => {
  if (resultBoolean && isSelected) {
    if (isWorkOrHomeWorkTest) {
      backgroundColor = COLORS.yellow;
    } else {
      backgroundColor = COLORS.green;
    }
  } else if (!resultBoolean && isSelected) {
    if (isWorkOrHomeWorkTest) {
      backgroundColor = COLORS.yellow;
    } else {
      backgroundColor = COLORS.red;
    }
  }
  return backgroundColor;
}

const bgColorFirst = (resultBoolean: boolean, isSelected: boolean, backgroundColor: any) => {
  if (resultBoolean && isSelected) {
    backgroundColor = COLORS.green;
  } else if (!resultBoolean && isSelected) {
    backgroundColor = COLORS.red;
  }
  return backgroundColor;
}