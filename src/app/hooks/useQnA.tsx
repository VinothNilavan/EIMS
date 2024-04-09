/**
 * This is common QnA logic which is shared between NAANDI and EDICINE Question screens
 * Change logic here will affect all screens
 *
 */

import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, findNodeHandle, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import { Base64 } from 'js-base64';
import moment from 'moment';
import { useToast } from 'native-base';
import { runInAction, toJS } from 'mobx';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as mime from 'react-native-mime-types';

import {
  QHtmlTemplateForIframe,
  MyAutoHeightWebView,
  Explanation,
  Ordering,
  MatchList,
  Classification,
  SortList,
  InteractiveN,
  SourceSansProRegTextView,
  BalooThambiRegTextView,
  CustomTextInput,
  TextInteraction,
} from '@components';
import {
  getWp,
  createValidURL,
  getAsValue,
  replaceString,
} from '@utils';
import { UseSound, useLanguage } from '@hooks';
import { ApiEndPoint, ContentIDs, ScreenNames } from '@constants';
import { API, APIFormData } from '@api';
import {
  SessionTimeOutDialog,
  TimedWorksheetModal,
  TimeTestModal,
  HomeworkSolutionImageModal,
  HomeworkAttentionModal,
  RewardCollectionModal,
} from '@hoc';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CameraWhite, Upload, ErrorClose } from '@images';
import homeworkStyle from '../screens/homework/HomeworkQnAScreen/style';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { falseSelectMCQ, trueSelectMCQ, attachHomework, configExplanation, quitWorksheet, passageButtonHandler } from './UseQandA';
import { configMCQ, multiMCQ, configBlank, configBlankDD, configDD, configGameRemedial } from './UseQandACore';
import Generic from '../constants/Generic';

const SEARCH = Generic.SEARCH;
const SCREEN_TEST = Generic.SCREEN_TEST;
const WORKSHEET = Generic.WORKSHEET;
const TOPICS = Generic.TOPICS;
const WORKSHEET_EDICINE = Generic.WORKSHEET_EDICINE;
const HOMEWORK_EDICINE = Generic.HOMEWORK_EDICINE;
const DISCRETE_SKILL = Generic.DISCRETE_SKILL;

export const useQnA = (screenType = SEARCH) => {
  const isPickerOpen = useRef(false);
  const navigation = useNavigation();
  const store = useStores();
  const {
    playSound,
    initializeAudioSection,
    isOtherAudioPlaying,
    audioCleanup,
    showInsStVO,
    showQuesVO,
    pauseAudio,
    qBodyVoiceOver,
    stopAudio,
  } = UseSound();
  const { qnaStore, uiStore } = store;
  const [lockOptions, setLockOptions] = useState(false);
  const [selectedMcq, setSelectedMcq] = useState({});
  const [startTime, setStartTime] = useState(moment());
  const [enableScroll, setEnableScroll] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isVisible, showLoaderVisbility] = useState(false);
  const [inputResponse, setInputResponse] = useState({});
  const [skipQuestion, setskipQuestion] = useState(false);
  const [showTimeTestModal, setShowTimeTestModal] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showClosePopup, setShowClosePopup] = useState(false);
  const [showTimesUp, setShowTimesUp] = useState(false);
  const [disableWebView, setDisableWebView] = useState(false);
  const [isCameraSelected, setCameraSeleted] = useState(false);
  const [rewardModal, setRewardModal] = useState(false);
  const [isNextClick, setIsNextClick] = useState(false);
  const [rewardItem, setRewardItem] = useState({});
  const [solutionUploadError, setSolutionUploadError] = useState('');
  const [iframeSubmitStatus, setIframeSubmitStatus] = useState(2);
  const auth = useContext(AuthContext);
  const Toast = useToast();

  const {
    tryAgainLaterText,
    excellentWorkText,
    yourTimeText,
    tryHarderText,
    youNeedToGetMoreQuetionRight,
    timeUpText,
    okayBtnText,
    timeWorkSheetOverText,
    selectSolutionImage,
    maxSizeHwSolutionAllowed,
    writeYourSolutionText,
    uploadYourSolutionText,
    uploadBtnText,
    takePhotoBtnText,
    youCanOnlyUploadOneImage,
    please_enter_the_answer_text,
    please_select_an_option_text,
    your_extra_effort_really_helped,
    you_meet_all_challenges,
    great_to_see_you_work_hard,
    you_can_do_better,
    ask_doubts_to_leave_behind,
    try_carefully_to_overcome,
    students_find_this_tough,
    liveWorksheetText,
    letsGoBtnText,
    please_select_all_options,
    please_select_answer_text,
    mathematicians_dont_give_up,
    scientists_dont_give_up
  } = useLanguage();

  const isRTL = uiStore.isRTL;

  //Create references
  const questionRef = useRef();
  const interactiveRef = useRef(null);
  const webref = useRef(null);
  const scrollViewRef = useRef();
  const parentScrollRef = useRef();
  const viewRef = useRef(null);
  const timerRef = useRef();


  useEffect(() => {
    console.log(`Running QnA Custom hook>>>>>>`);
    (async () => {
      await reset();
    })();
    // return () => {};
  }, []);
  useEffect(() => {
    if (
      qnaStore?.trialCount == 1 &&
      qnaStore?.currentQuestion?.hints?.length > 0
    ) {
      qnaStore.showHint();
    }
  }, [qnaStore]);
  useEffect(() => {
    let errorHideTimer = null;
    if (
      solutionUploadError !== null &&
      solutionUploadError !== '' &&
      solutionUploadError !== undefined
    ) {
      errorHideTimer = setTimeout(() => {
        setSolutionUploadError('');
      }, 3000);
    }

    return () => {
      errorHideTimer && clearTimeout(errorHideTimer);
    };
  }, [solutionUploadError]);

  const reset = async () => {
    return new Promise(resolve => {
      qnaStore.reset();
      setEnableScroll(true);
      setIsSubmitClicked(false);
      setStartTime(moment());
      setInputResponse({});
      // setSelectedChoice(-1);
      setLockOptions(false);
      setShowSubmitPopup(false);
      setShowClosePopup(false);
      setShowTimesUp(false);
      setDisableWebView(false);
      audioCleanup();
      resolve();
    });
  };

  const trueSelectionMcq = data => {
    let dataRes = trueSelectMCQ(data, qnaStore, screenType, setLockOptions, setSelectedMcq, questionRef, uiStore);
    if (dataRes) {
      console.log("trueSelectionMcq");
      createSubmitRequest(dataRes);
    }
  }

  const falseSelectionMcq = data => {
    let dataRes = falseSelectMCQ(data, qnaStore, screenType, setLockOptions, setSelectedMcq, questionRef, uiStore);
    if (dataRes) {
      console.log("falseSelectionMcq");
      createSubmitRequest(dataRes);
    }
  }

  const calculateNextContentSeqNum = (isFromNextButton = false) => {
    let seqNum = qnaStore.contentHeaderInfo.pedagogyProgress.totalUnits ===
      qnaStore.contentData.contentSeqNum
      ? 1
      : qnaStore.contentData.contentSeqNum + 1;
    if (screenType === WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) {
      if (isNextClick) {
        setTimeout(() => {
          setIsNextClick(false);
        }, 300)
        return seqNum;
      }
      if (!isFromNextButton) {
        seqNum = qnaStore?.nextContentSeqNum;
      }
      return seqNum;
    } else {
      return qnaStore.nextContentSeqNum !== 0
        ? qnaStore.nextContentSeqNum
        : seqNum;
    }
  }

  const createSubmitRequest = async (submitData, isFromNextButton = false) => {
    try {
      setDisableWebView(true);
      store.uiStore.setIsClicked(false);
      if (submitData || screenType === HOMEWORK_EDICINE) {
        let resultDecoded = Base64.decode(submitData?.result);
        if (qnaStore?.passageData && qnaStore?.passageData?._id) {
          submitData.contentID = qnaStore?.passageData?.contentID;
          submitData.childContentID = qnaStore?.currentQuestion?.contentID;

          submitData.contentInfo.contentID = qnaStore?.passageData?.contentID;
          submitData.contentInfo.childContentID =
            qnaStore?.contentData?.childContentId;
          submitData.contentInfo.contentVersionID = qnaStore?.passageData?._id;
          submitData.contentInfo.childContentVersionID =
            qnaStore?.currentQuestion?._id;
          submitData.contentInfo.childContentType =
            qnaStore?.contentData?.childContentType;
          submitData.contentInfo.groupType = qnaStore?.contentData?.contentType;
          submitData.contentInfo.revisionNum = qnaStore?.passageData?.revisionNo;
          submitData.contentInfo.childRevisionNum =
            qnaStore.currentQuestion?.revisionNo;
        }

        submitData.timeTaken = moment().diff(startTime, 'seconds');
        submitData.pedagogyID = qnaStore?.contentHeaderInfo?.pedagogyID;
        submitData.userAttemptData.hintTaken =
          screenType == SCREEN_TEST ? false : qnaStore.isHintVisible;
        submitData.userAttemptData.trialCount = qnaStore.trialCount;
        submitData.contentSeqNum = qnaStore.contentData?.contentSeqNum;
        if (submitData.userAttemptData && submitData.userAttemptData.trials) {
          submitData.userAttemptData.trials.map(item => {
            item.timeTaken = moment().diff(startTime, 'seconds');
          });
        }
        if (screenType == WORKSHEET || screenType == WORKSHEET_EDICINE || screenType == HOMEWORK_EDICINE) {
          submitData.isSubmitAnswer = true;
        }

        submitData.mode = qnaStore.contentData.contentSubMode;
        submitData.contentSubMode = qnaStore.contentData.contentSubMode;
        if (
          qnaStore.contentData.contentSubMode === 'remediation' ||
          qnaStore.contentData.contentSubMode === 'challenge'
        ) {
          submitData.mode = 'learn';
        }

        if (screenType != SCREEN_TEST) {
          if (resultDecoded === 'pass') {
            runInAction(() => {
              qnaStore.isAnswerCorrect = true;
              qnaStore.isMotivationBuddy = false;
              qnaStore.showDefaultBuddy = false;
              if (qnaStore.isTimeTest) {
                qnaStore.correctAnswerCount = qnaStore.correctAnswerCount + 1;
              }
            });
          } else {
            runInAction(() => {
              qnaStore.isAnswerCorrect = false;
              qnaStore.isMotivationBuddy = !(qnaStore.isMotivationBuddy);
              qnaStore.showDefaultBuddy = false;
            });
          }
        }

        /**
         * Check Trials
         */
        let count = qnaStore.trialCount - 1;
        console.log(`COunt >>>>>${count}`);
        qnaStore.setTrials(count);
        if (
          screenType != SCREEN_TEST &&
          screenType !== HOMEWORK_EDICINE &&
          screenType !== WORKSHEET_EDICINE &&
          resultDecoded !== 'pass' &&
          count > 0
        ) {
          uiStore.setLoader(false);
          qnaStore.setDisableBTn(false);
          setTimeout(() => {
            store.uiStore.setIsApiCalled(false);
          }, 500);
          auth.showToast({
            title: '',
            description: `WRONG ANSWER, You have ${count} trial left.`,
            bgcolor: 'lightpink',
            timeout: 5000,
          });

          let lengthVal = 0;
          if (qnaStore.currentQuestion.hints != null) {
            console.log('test1');
            lengthVal = qnaStore.currentQuestion.hints.length;
            if (count > 0 && lengthVal > 0) {
              console.log('\n\nhintQA1\n', qnaStore.isHintVisible);
              qnaStore.showHint();
              console.log('\n\nhintQA2\n', qnaStore.isHintVisible);
            }
          }

          return;
        }

        /**
         * Ends
         */

        /**
         * Worksheet EDICINE Timed related
         */
        if (qnaStore.timed) {
          submitData.remainingTime = qnaStore.timed
            ? qnaStore.contentHeaderInfo?.remainingTime - submitData.timeTaken - 1
            : 0;
          submitData.nextContentSeqNum =
            qnaStore.nextContentSeqNum !== 0
              ? qnaStore.nextContentSeqNum
              : qnaStore.contentHeaderInfo.pedagogyProgress.totalUnits ===
                qnaStore.contentData.contentSeqNum
                ? 1
                : qnaStore.contentData.contentSeqNum + 1;
        }

        if (screenType === WORKSHEET_EDICINE) {
          submitData.nextContentSeqNum = calculateNextContentSeqNum(isFromNextButton);
        }

        /**
         * Ends
         */

        /**
         * Time test related
         */
        // console.log(`cmg before is time test`);
        if (qnaStore.isTimeTest) {
          if (qnaStore.questionIndex !== qnaStore.timeTextQuestions.length - 1) {
            console.log('\nbefore saving');
            setLockOptions(false);
            uiStore.setLoader(false);
            qnaStore.saveTimeTestResponseAndShowNext(submitData);
            qnaStore.setDisableBTn(false);
            console.log('saved');
            return;
          } else if (
            qnaStore.questionIndex ===
            qnaStore.timeTextQuestions.length - 1
          ) {
            qnaStore.saveTimeTestResponse(submitData);
            let timeTaken = timerRef.current?.pause();
            qnaStore.setTimeTaken(qnaStore.timeTaken + timeTaken - 3);
            console.log('Time Taken', qnaStore.timeTaken);
            setShowTimeTestModal(true);
            console.log('completed');
            return;
          }
        }
        /**
         * Ends
         */

        // Edicine Homework Related
        if (screenType === HOMEWORK_EDICINE) {
          submitData.nextContentSeqNum = qnaStore?.nextContentSeqNum;
          let uploadedData = [null];
          if (qnaStore.homeworkSolutionAttachment !== null) {
            uploadedData = [
              {
                uri: qnaStore?.homeworkSolutionAttachment?.uri,
                fileName: qnaStore?.homeworkSolutionAttachment?.fileName,
              },
            ];
          }
          const textInteractionData = {};
          textInteractionData.type = 'TextInteraction';
          textInteractionData.userAnswer = qnaStore?.homeworkSolution;

          if (submitData != null && submitData.userResponse !== null) {
            submitData.userResponse.uploads = uploadedData;
            submitData.userResponse.textInteraction = textInteractionData;
          }

          if (submitData.userAttemptData && submitData.userAttemptData.trials) {
            submitData.userAttemptData.trials.map(item => {
              item.timeTaken = moment().diff(startTime, 'seconds');
              if (item?.userResponse !== null) {
                item.userResponse.uploads = uploadedData;
                item.userResponse.textInteraction = textInteractionData;
              }
            });
          }
        }

        // End
        // console.log('Check the Submit Data --->>>' + JSON.stringify(submitData));

        if (screenType != SCREEN_TEST) {
          setDisableWebView(true);
        }

        const reqBody = {
          jwt: await getAsValue('jwt'),
          store: store,
          body: submitData,
        };
        if (screenType === HOMEWORK_EDICINE) {
          if (
            qnaStore.homeworkSolutionAttachment !== null &&
            qnaStore?.homeworkSolutionAttachment?.uri &&
            (qnaStore?.homeworkSolutionAttachment?.uri.indexOf('https') === -1 ||
              qnaStore?.homeworkSolutionAttachment?.uri.indexOf('http') === -1)
          ) {
            callUpdateSolutionAPI(reqBody);
          } else {
            callSubmitHomeworkQuestionAPI(reqBody);
          }
        }
        if (screenType == WORKSHEET || screenType == WORKSHEET_EDICINE) {
          console.log("WORKSHEET_EDICINE 452");

          callSubmitQuestionAttemptAPI(reqBody);
        }
        if (screenType == SCREEN_TEST) {
          callSubmitWorkSheetAPI(reqBody);
        }
        if (screenType == SEARCH) {
          uiStore.setLoader(false);
          runInAction(() => {
            qnaStore.showExplanation = true;
          });
        }
        if (screenType == TOPICS) {
          /**messages for challenge questions */

          let passMessage = [
            your_extra_effort_really_helped,
            you_meet_all_challenges,
            great_to_see_you_work_hard,
          ];

          if (qnaStore.currentQuestion.encrypted) {
            reqBody.body.result = resultDecoded;
            let showExplantionFlag =
              qnaStore.contentData.contentSubMode === 'challenge' &&
                qnaStore.contentHeaderInfo.pedagogyMessages[0] ==
                'challengeAttempt1'
                ? false
                : true;
            if (
              resultDecoded == 'pass' &&
              qnaStore.contentData.contentSubMode === 'challenge'
            ) {
              showExplantionFlag = true;
              auth.showToast({
                title: '',
                description:
                  passMessage[Math.floor(Math.random() * passMessage.length)],
                bgcolor: 'lightgreen',
                timeout: 8000,
              });
            } else {
              if (
                qnaStore.contentData.contentSubMode === 'challenge' &&
                qnaStore.contentHeaderInfo.pedagogyMessages[0] ==
                'challengeAttempt1'
              ) {
                showExplantionFlag = false;
                // Toast.show({
                //   text: students_find_this_tough,
                //   duration: 8000,
                //   buttonText: 'OK',
                // });
                auth.showToast({
                  title: '',
                  description: students_find_this_tough,
                  bgcolor: 'lightgreen',
                  timeout: 8000,
                });
              }
              if (
                qnaStore.contentData.contentSubMode === 'challenge' &&
                qnaStore.contentHeaderInfo.pedagogyMessages[0] ==
                'challengeAttempt2'
              ) {
                showExplantionFlag = true;
                let secondFailMessage = [
                  you_can_do_better,
                  ask_doubts_to_leave_behind,
                  try_carefully_to_overcome,
                ];
                const subjectName = await getAsValue('subjectName');
                if (subjectName && subjectName === 'Science') {
                  secondFailMessage.push(scientists_dont_give_up);
                } else {
                  secondFailMessage.push(mathematicians_dont_give_up);
                }

                auth.showToast({
                  title: '',
                  description:
                    secondFailMessage[
                    Math.floor(Math.random() * secondFailMessage.length)
                    ],
                  bgcolor: 'lightgreen',
                  timeout: 8000,
                });
              }
            }
            callSubmitTopicQuestionAttemptAPI(reqBody, showExplantionFlag);
          }
        }

        if (screenType == DISCRETE_SKILL) {
          callSubmitDiscreteSkillQuestionAttemptAPI(reqBody);
        }
      } else {
        uiStore.setLoader(false);
        qnaStore.setDisableBTn(false);
        setTimeout(() => {
          store.uiStore.setIsApiCalled(false);
        }, 500);

        if (screenType == WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) {
          console.log("WORKSHEET_EDICINE || Homework 557", screenType);
          dontKnow(false, isFromNextButton);
        } else {
          auth.showToast({
            title: '',
            description: please_select_answer_text,
            bgcolor: 'lightpink',
            timeout: 5000,
          });
        }
      }
    } catch (error) {
      console.log(`createSubmitRequest ${error}`)
    }
  };

  const callUpdateSolutionAPI = async submitData => {
    try {
      const requestBody = new FormData();
      FormData.prototype[Symbol.toStringTag] = 'FormData';
      requestBody.append('solutionimage', {
        uri: qnaStore?.homeworkSolutionAttachment?.uri,
        name: qnaStore?.homeworkSolutionAttachment?.fileName,
        type: mime.lookup(qnaStore?.homeworkSolutionAttachment?.fileName),
      });
      requestBody.append('attemptID', qnaStore?.contentData?.attemptId);

      const req = {
        store: store,
        body: requestBody,
      };

      const response = await APIFormData(ApiEndPoint.UPLOAD_HOMEWORK_SOLUTION, req);
      if (response.data.resultCode === 'C001') {
        const uploadedData = [
          {
            uri: response?.data?.imagepath,
            fileName: response?.data?.imagename,
          },
        ];
        if (
          submitData != null &&
          submitData.body &&
          submitData.body.userResponse !== null
        ) {
          submitData.body.userResponse.uploads = uploadedData;
        }

        if (
          submitData.body.userAttemptData &&
          submitData.body.userAttemptData.trials
        ) {
          submitData.body.userAttemptData.trials.map(item => {
            item.timeTaken = moment().diff(startTime, 'seconds');
            if (item?.userResponse !== null) {
              item.userResponse.uploads = uploadedData;
            }
          });
        }
        callSubmitHomeworkQuestionAPI(submitData);
      } else {
        store.uiStore.apiErrorInit({
          code: response?.status,
          message: response?.data?.resultMessage,
        });
      }
    } catch (e) {
      console.log('Update Solution API Error', e);
    }
    store.uiStore.setIsApiCalled(false);
  };

  const callSubmitHomeworkQuestionAPI = async request => {
    try {
      const req = {
        body: request.body,
        store: store,
      };
      const response = await API(ApiEndPoint.SUBMIT_HOMEWORK_QUESTIONS, req);
      if (response?.data?.resultCode === 'C001') {
        if (screenType == HOMEWORK_EDICINE) {
          await reset();
          if (showClosePopup || request.body.closeSessionWS) {
            navigation.goBack();
            return;
          }
          qnaStore.init(response.data);
          updateInputResponse();
        } else {
          if (
            response?.data?.contentData?.hasOwnProperty('contentParams') &&
            response?.data?.contentData?.contentParams &&
            response?.data?.contentData?.contentParams?.userAttemptData &&
            response?.data?.contentData?.contentParams?.userAttemptData?.hasOwnProperty(
              'userResponse',
            )
          ) {
            runInAction(() => {
              qnaStore.showExplanation = true;
              qnaStore.isLastQuestion = true;
            });
            qnaStore.showNextBtn();
          } else if (response?.data?.contentData?.length === 0) {
            runInAction(() => {
              qnaStore.showExplanation = true;
              qnaStore.isLastQuestion = true;
            });
            navigation.navigate(ScreenNames.HomeworkSummaryScreen);
          } else {
            setskipQuestion(response?.data?.contentData?.skipQuestion);
            qnaStore.setNextQuestionData(response.data);
            runInAction(() => {
              qnaStore.showExplanation = true;
            });
            qnaStore.showNextBtn();
          }
        }
      } else if (
        response?.data?.resultCode === 'C004' &&
        response?.data?.redirectionCode === 'ContentPage'
      ) {
        if (screenType == HOMEWORK_EDICINE) {
          navigation.replace(ScreenNames.HomeworkListScreen);
        } else {
          navigation.replace(ScreenNames.HomeworkSummaryScreen);
        }
      } else {
        store.uiStore.apiErrorInit({
          code: response.status,
          message: response.data?.resultMessage,
        });
      }
    } catch (ex) {
      console.log('Submit Homweork API Error', eX);
    }
    store.uiStore.setIsApiCalled(false);
  };

  const csInit = q => {
    try {
      let data = q.data;
      // data[0].conditions = [];
      const run = `
     initContentService(${JSON.stringify(data)});
     `;
      if (interactiveRef && interactiveRef.current) {
        interactiveRef.current.injectJavaScript(run);
      }
      if (webref && webref.current) {
        webref.current.injectJavaScript(run);
      }
    } catch (err) {
      console.log('UseQNA csInit err = ', err);
    }
  };

  const csCheckIframe = () => {
    try {
      let data = qnaStore.contentData.data;
      // data[0].conditions = [];
      csInit(qnaStore.contentData);
      setTimeout(() => {
        const run = ` 
           checkIframe();
         `;
        if (interactiveRef && interactiveRef.current) {
          interactiveRef.current.injectJavaScript(run);
        }
      }, 500);
    } catch (err) {
      if (!Toast.isActive(12)) {
        Toast.show({ id: 12, description: 'ERROR CSCHECK ' });
      }
    }
  };

  const csEvaluateAnswer = (type, identifier) => {
    try {
      let data = qnaStore.contentData.data;
      if (type === 'Interactive') {
        const run = `
       evaluateAnswer(${JSON.stringify(data)},${null},${JSON.stringify({
          id: identifier,
        })});
       `;
        if (interactiveRef && interactiveRef.current) {
          interactiveRef.current.injectJavaScript(run);
        }
      } else if (type === 'dontknow') {
        const run = `
       evaluateAnswer(${JSON.stringify(data)},${null},${JSON.stringify({
          id: identifier,
        })});
       `;
        if (webref && webref.current) {
          webref.current.injectJavaScript(run);
        }
      } else {
        const run = `
       evaluateAnswer(${JSON.stringify(data)},${JSON.stringify(
          qnaStore.inputData,
        )},${JSON.stringify({ id: identifier })} );
       `;
        if (webref && webref.current) {
          webref.current.injectJavaScript(run);
        }
      }
    } catch (err) {
      console.log("useQnA csEvaluateAnswer err = ", err);
    }
  };

  const submitFunction = (selected_data = {}, isFromNextButton = false) => {
    try {
      setIsNextClick(isFromNextButton);
      if (isOtherAudioPlaying()) {
        pauseAudio();
      }
      setEnableScroll(true);
      if (qnaStore.currentQuestion.template === 'Interactive') {
        // isSubmitClicked = true;
        setIsSubmitClicked(true);
        csCheckIframe();
        if (
          screenType == WORKSHEET_EDICINE ||
          screenType === HOMEWORK_EDICINE
        ) {
          console.log("screenType 788", screenType);

          setTimeout(() => {
            store.uiStore.setIsApiCalled(false);
          }, 500);
        }
      } else if (qnaStore.currentQuestion.template === 'MCQ') {
        if (qnaStore.inputData.length === 0) {
          if (
            screenType == WORKSHEET_EDICINE ||
            screenType === HOMEWORK_EDICINE
          ) {
            console.log("screenType 800", screenType);
            dontKnow(false, isFromNextButton);
          } else {
            uiStore.setLoader(false);
            qnaStore.setDisableBTn(false);
            // Toast.show({
            //   text: please_select_an_option_text,
            //   duration: 5000,
            //   buttonText: 'OK',
            // });
            auth.showToast({
              title: '',
              description: please_select_an_option_text,
              bgcolor: 'lightpink',
              timeout: 5000,
            });
            return;
          }
        } else if (qnaStore.currentQuestion?.multiResponse) {
          if ((screenType == WORKSHEET_EDICINE || screenType == TOPICS || screenType == SEARCH) && (qnaStore.inputData.length < qnaStore?.currentQuestion?.responseValidation?.validResponse?.identifier?.length)) {
            console.log("screenType 821", screenType);

            setTimeout(() => {
              store.uiStore.setIsApiCalled(false);
            }, 500);
            auth.showToast({
              title: '',
              description: please_select_all_options,
              bgcolor: 'lightpink',
              timeout: 3000,
            });
          } else {
            let count = qnaStore.trialCount - 1;
            if (questionRef && questionRef?.current) {
              qnaStore.setTrials(count);
              const submitData = questionRef?.current?.evaluteAnswer(
                qnaStore?.inputData,
              );
              console.log("SubmitFunction 841");
              createSubmitRequest(submitData, isFromNextButton);
            }
          }
        } else {
          let response = {};
          if (questionRef && questionRef?.current) {
            if (screenType == SCREEN_TEST) {
              response = questionRef?.current?.evaluteAnswer(selected_data);
            } else {
              response = questionRef?.current?.evaluteAnswer(selectedMcq);
            }
            // console.log("Data = ", selected_data);
            // console.log("Submit Function response = ", response);
            console.log("SubmitFunction 855");
            createSubmitRequest(response, isFromNextButton);
          }
        }
      } else if (
        qnaStore.currentQuestion.template === 'Blank' ||
        qnaStore.currentQuestion.template === 'Blank_Dropdown' ||
        qnaStore.currentQuestion.template === 'Dropdown'
      ) {
        console.log(
          'Total Answers:',
          Object.keys(qnaStore.currentQuestion.response),
        );
        let allBlanksAnswered = true;
        let ipData = [];

        Object.keys(qnaStore?.currentQuestion?.response).forEach(key => {
          if (
            !inputResponse?.hasOwnProperty(key) ||
            (inputResponse?.hasOwnProperty(key) && inputResponse[key] === '')
          ) {
            let correctAnswers = '';
            //console.log(`true ----------------------------> ${JSON.stringify(qnaStore?.currentQuestion?.response[key]?.hasOwnProperty(correctAnswers))}`)
            if (qnaStore?.currentQuestion?.response[key]?.correctAnswer) {
              correctAnswers = Base64.decode(qnaStore?.currentQuestion?.response[key]?.correctAnswer);
            } else {
              correctAnswers = Base64.decode(qnaStore?.currentQuestion?.response[key]?.correctAnswers);
            }
            if (
              qnaStore?.currentQuestion?.template == 'Blank' &&
              (correctAnswers?.includes('0') || correctAnswers?.includes(''))
            ) {
              ipData?.push({ name: key, value: '' });
            } else {
              allBlanksAnswered = false;
            }
            allBlanksAnswered = false;
          } else {
            ipData?.push({ name: key, value: inputResponse[key] });
          }
        });

        if (screenType === TOPICS) {
          store.uiStore.setRecoverData(ipData);
        }

        if (allBlanksAnswered || (store.uiStore.hadDisconnected && store.uiStore.recoverData.length != 0)) {
          if (allBlanksAnswered) {
            runInAction(() => {
              console.log("runInAction qnaStore.inputData 903");
              qnaStore.inputData = ipData;
            });
          } else {
            runInAction(() => {
              console.log("runInAction qnaStore.inputData 908");
              qnaStore.inputData = store.uiStore.recoverData;
            });
          }
          csInit(qnaStore.contentData);
          showLoaderVisbility(true);
          setTimeout(() => {
            csEvaluateAnswer('blank', 'blank');
          }, 500);
          let count = qnaStore.trialCount - 1;
          if (count == 0 || screenType == WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE || qnaStore.isTimeTest) {
            console.log("screenType 914", screenType);
            setInputResponse({});
          }
          store.uiStore.setHadDisconnected(false);
        } else {
          if (
            screenType == WORKSHEET_EDICINE ||
            screenType === HOMEWORK_EDICINE
          ) {
            console.log("screenType 923", screenType);
            dontKnow(false, isFromNextButton);
          } else {
            uiStore.setLoader(false);
            qnaStore.setDisableBTn(false);
            auth.showToast({
              title: '',
              description: please_enter_the_answer_text,
              bgcolor: 'lightpink',
              timeout: 5000,
            });

            return;
          }
        }
      } else if (qnaStore?.currentQuestion?.template === 'TextInteraction') {
        if (hasValidUserResponse()) {
          if (questionRef && questionRef?.current) {
            const submitData = questionRef?.current?.evaluteAnswer(
              qnaStore?.inputData,
            );
            console.log("SubmitFunction 953");
            createSubmitRequest(submitData, isFromNextButton);
          }
        } else {
          console.log("dontKnow 957");
          dontKnow(false, isFromNextButton);
        }
      } else {
        if (questionRef && questionRef?.current) {
          let isWorkSheetOrHomeWork = (screenType === WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE);
          const submitData = questionRef.current.evaluteAnswer(qnaStore?.inputData, isWorkSheetOrHomeWork);
          if (isWorkSheetOrHomeWork && qnaStore?.currentQuestion?.template === 'Classification') {
            if (!isValidClassificationQuestion(submitData)) {
              auth.showToast({
                title: '',
                description: please_select_all_options,
                bgcolor: 'lightpink',
                timeout: 5000,
              });
              setTimeout(() => {
                store.uiStore.setIsApiCalled(false);
              }, 500);
              return;
            }
          }
          console.log("SubmitFunction 978");
          createSubmitRequest(submitData, isFromNextButton);
        }
      }
    } catch (error) {
      console.log(`submitFunction ${error}`)
    }
  };

  const isValidClassificationQuestion = (submitData) => {
    try {
      let totalChoiceCount = qnaStore?.currentQuestion?.response?.choices?.length;
      let submitChoiceCount = submitData?.userResponse?.Classification?.stem0.length + submitData?.userResponse?.Classification?.stem1.length;
      return totalChoiceCount == submitChoiceCount
    } catch (err) {
      console.log(`err-> ${err}`)
    }
    return false;
  }

  const hasValidUserResponse = () => {
    let isValidResponse = false;
    if (
      qnaStore?.homeworkSolution &&
      typeof qnaStore?.homeworkSolution !== 'undefined' &&
      qnaStore?.homeworkSolution !== ''
    ) {
      isValidResponse = true;
    }

    if (
      qnaStore?.homeworkSolutionAttachment &&
      typeof qnaStore?.homeworkSolutionAttachment !== 'undefined'
    ) {
      isValidResponse = true;
    }

    return isValidResponse;
  };

  const onWebViewMessage = async event => {
    let iframeResponse = null;
    let msgData;
    let count;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (msgData.hasOwnProperty('type') && msgData.type === 'IframeResponse') {
        iframeResponse = msgData.response;
        console.log('iframeResponse--->' + iframeResponse[0]);
        if (
          isSubmitClicked ||
          iframeResponse[0] == '1' ||
          iframeResponse[0] == '0'
        ) {
          setIsSubmitClicked(false);
          // isSubmitClicked = false;
          // console.log(`This is Iframe 0 val>>>>>${iframeResponse[0]}`);
          switch (iframeResponse[0]) {
            case '0':
              setIframeSubmitStatus(0);
              count = qnaStore.trialCount - 1;
              qnaStore.setTrials(qnaStore.trialCount - 1);
              if (screenType != SCREEN_TEST) {
                if (count > 0) {
                  uiStore.setLoader(false);
                  qnaStore.setDisableBTn(false);
                  // Toast.show({
                  //   text: `WRONG ANSWER, You have ${count} trial left.`,
                  //   buttonText: 'Okay',
                  //   duration: 2000,
                  // });
                  auth.showToast({
                    title: '',
                    description: `WRONG ANSWER, You have ${count} trial left.`,
                    bgcolor: 'lightpink',
                    timeout: 5000,
                  });
                  let lengthVal = 0;
                  if (qnaStore.currentQuestion.hints != null) {
                    console.log('test1');
                    lengthVal = qnaStore.currentQuestion.hints.length;
                    if (count > 0 && lengthVal > 0) {
                      console.log('\n\nhintQA1\n', qnaStore.isHintVisible);
                      qnaStore.showHint();
                      console.log('\n\nhintQA2\n', qnaStore.isHintVisible);
                    }
                  }
                  return;
                }
              }

              csEvaluateAnswer('Interactive', 'interactive');
              break;
            case '1':
              count = qnaStore.trialCount - 1;
              qnaStore.setTrials(count);
              csEvaluateAnswer('Interactive', 'interactive');
              setIframeSubmitStatus(1);
              break;
            case '2':
              uiStore.setLoader(false);
              qnaStore.setDisableBTn(false);
              // Toast.show({
              //   text: please_enter_the_answer_text,
              // });
              if (screenType == WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) {
                console.log("screenType 1077", screenType);
                dontKnow(false);
              } else {
                auth.showToast({
                  title: '',
                  description: please_enter_the_answer_text,
                  bgcolor: 'lightpink',
                  timeout: 5000,
                });
              }
              break;
            default:
              uiStore.setLoader(false);
              break;
          }
        }
      } else if (
        msgData.hasOwnProperty('type') &&
        msgData.hasOwnProperty('function') &&
        msgData.type === 'ContentService'
      ) {
        switch (msgData.function) {
          case 'evaluateAnswer':
            let submitData = msgData.submitData;
            if (msgData.id === 'idontknow') {
              console.log('GOT IDONT KNOW');
              submitData.result = Base64.encode('skip');
            } else {
              if (iframeSubmitStatus != 2) {
                submitData.result = Base64.encode(iframeSubmitStatus == 1 ? 'pass' : submitData.result);
                setIframeSubmitStatus(2);
              } else {
                submitData.result = Base64.encode(submitData.result);
              }
            }

            if (screenType != SCREEN_TEST) {
              if (msgData.evaluatedResult) {
                if (msgData.evaluatedResult.alertMessage && msgData.evaluatedResult.alertMessage != '' && qnaStore.userAttempt == 1) {
                  let userAttempt = qnaStore.userAttempt + 1;
                  qnaStore.updateUserAttempt(userAttempt);
                  qnaStore.setDisableBTn(false);
                  auth.showToast({ title: '', description: msgData.evaluatedResult.alertMessage, bgcolor: 'lightgreen', timeout: 8000 });
                  return;
                }
              } else {
                let lengthVal = 0;
                if (qnaStore.currentQuestion.hints != null) {
                  lengthVal = qnaStore.currentQuestion.length;
                }

                if (qnaStore.trialCount === 1 && lengthVal > 0) {
                  qnaStore.hideHint();
                }
              }
              let userAttempt = qnaStore.userAttempt + 1;
              qnaStore.updateUserAttempt(userAttempt);
            }
            if (qnaStore.currentQuestion.template === "Interactive") {
              if (store.uiStore.isClicked) {
                console.log("Interactive 1144");
                createSubmitRequest(submitData);
              }
            } else {
              console.log("No Interactive 1148");
              createSubmitRequest(submitData);
            }
            break;
        }
      } else {
        let key = Object.keys(msgData)[0];
        let val = msgData[key];
        let newResponse = inputResponse;
        newResponse[key] = val;
        setInputResponse(newResponse);
      }
    } catch (err) {
      console.warn(err);
      console.log('UseQNA onWebViewMessage err = ', err);
      return;
    }
  };

  const renderCSHtmlView = () => {
    let content = QHtmlTemplateForIframe('<p></p>', false, getWp('1'), store);
    return (
      <MyAutoHeightWebView
        ref={webref}
        onMessage={onWebViewMessage}
        style={{
          width: getWp('1'),
          height: getWp('1'),
        }}
        source={{ html: content }}
        zoomable={false}
      />
    );
  };

  const dragAndDropCallback = isLongPressed => {
    try {
      if (isLongPressed) {
        setEnableScroll(false);
        // parentScrollRef.current.scrollEnabled = false;
        scrollViewRef.current.scrollEnabled = false;
        console.log(`Disabling the scroll`);
      } else {
        // parentScrollRef.current.scrollEnabled = true;
        scrollViewRef.current.scrollEnabled = true;
        console.log('Enabling the scroll');
        setEnableScroll(true);
      }
    } catch (err) {
      console.log('dragAndDropCallback Scroll = ', err);
    }
  };

  const classificationDragAndDrop = isLongPressed => {
    try {
      if (isLongPressed) {
        setEnableScroll(false);
        scrollViewRef.current.scrollEnabled = false;
        setTimeout(() => {
          setEnableScroll(true);
          if (scrollViewRef && scrollViewRef.current) {
            scrollViewRef.current.scrollEnabled = true;
          }
        }, 10000);
      } else {
        setEnableScroll(true);
        if (scrollViewRef && scrollViewRef.current) {
          scrollViewRef.current.scrollEnabled = true;
        }
      }
    } catch (err) {
      console.log('classificationDragAndDrop error = ', err);
    }
  };

  const setInputResponseHandler = (id, value) => {
    setInputResponse(prevState => {
      let updState = {
        ...prevState,
        [id]: value,
      };
      return updState;
    });
  };

  const updateMarkedMathListQuestion = () => {
    try {
      if (qnaStore && Object.keys(qnaStore?.contentData?.contentParams).length > 0 &&
        Object.keys(qnaStore?.contentData?.contentParams?.userAttemptData).length > 0 &&
        qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse &&
        qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse?.choices) {
        let markedChoice = JSON.parse(JSON.stringify(qnaStore.contentData.contentParams.userAttemptData.userResponse.choices));
        let currentQuestion = JSON.parse(JSON.stringify(qnaStore.currentQuestion));
        currentQuestion.response.choices = markedChoice;
        return currentQuestion;
      } else {
        return qnaStore.currentQuestion;
      }
    } catch (error) {
      console.log(`error for matchlist ${error}`)
      return qnaStore.currentQuestion;
    }
  }

  const updateMarkedClassificationQuestion = () => {
    try {
      if (qnaStore && Object.keys(qnaStore?.contentData?.contentParams).length > 0 &&
        Object.keys(qnaStore?.contentData?.contentParams?.userAttemptData).length > 0 &&
        qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse &&
        qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse?.choices) {
        let markedChoice = JSON.parse(JSON.stringify(qnaStore.contentData.contentParams.userAttemptData.userResponse.choices));
        let currentQuestion = JSON.parse(JSON.stringify(qnaStore.currentQuestion));
        currentQuestion.markedAns = markedChoice;
        return currentQuestion;
      }
    } catch (error) {
      console.log(`error for matchlist ${error}`)
    }
    return qnaStore.currentQuestion;
  }

  const renderQuestionsItem = templateType => {
    switch (templateType) {
      case 'MCQ':
        if (qnaStore?.multiResponse === 'true' || qnaStore?.multiResponse === true) {
          return multiMCQ(questionRef, qnaStore, playSound, screenType);
        } else {
          return configMCQ(questionRef, lockOptions, qnaStore, screenType, submitFunction, trueSelectionMcq, falseSelectionMcq);
        }
      case 'Blank':
        return configBlank(webref, qnaStore, onWebViewMessage, screenType, dragAndDropCallback, disableWebView);
      case 'Blank_Dropdown':
        return configBlankDD(webref, qnaStore, onWebViewMessage, screenType, disableWebView, setInputResponseHandler);
      case 'Dropdown':
        return configDD(webref, qnaStore, onWebViewMessage, screenType, setInputResponseHandler, disableWebView);
      case 'Interactive':
        return (
          <InteractiveN
            interactiveRef={interactiveRef}
            onWebViewCallback={onWebViewMessage}
            showHint={screenType == SCREEN_TEST ? false : qnaStore.isHintVisible}
            dragCallback={dragAndDropCallback}
            questionRes={qnaStore.contentData}
            disableWebView={disableWebView}
          />
        );
      case 'Ordering':
        return (<Ordering questionTree={qnaStore.currentQuestion} ref={questionRef} onSoundBtnClicked={playSound} dragAndDropCallback={dragAndDropCallback} questions={qnaStore?.contentData} isWorkSheetOrHomeWork={(screenType === WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) ? true : false} />);
      case 'MatchList':
        return (<MatchList questionTree={updateMarkedMathListQuestion()} ref={questionRef} dragAndDropCallback={dragAndDropCallback} />);
      case 'Classification':
        return (<Classification questionTree={updateMarkedClassificationQuestion()} questions={qnaStore?.contentData} isWorkSheetOrHomeWork={(screenType === WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) ? true : false} ref={questionRef} dragAndDropCallback={classificationDragAndDrop} />);
      case 'SortList':
        return (<SortList questionTree={qnaStore.currentQuestion} ref={questionRef} dragAndDropCallback={dragAndDropCallback} isWorksheet={(screenType === WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) ? true : false} userAttempts={qnaStore?.contentData?.contentParams?.userAttemptData} />);
      case 'Game':
      case 'Remedial':
        return configGameRemedial(qnaStore, screenType, navigation, callOpenActivity);
      case 'TextInteraction':
        return (<TextInteraction ref={questionRef} questionData={qnaStore?.currentQuestion} />);
    }
  };

  const scrollToExplanation = () => {
    if (screenType === TOPICS) {
      store.uiStore.setRecoverData([]);
    }
    setTimeout(() => {
      try {
        requestAnimationFrame(() => {
          if (viewRef.current && scrollViewRef.current) {
            viewRef.current.measureLayout(
              findNodeHandle(scrollViewRef.current),
              (x, y) => {
                scrollViewRef.current.scrollTo({ x: 0, y: y, animated: true });
              },
            );
          } else {
            console.log('REF ERROR scrollToExplanation>>');
          }
        });
      } catch (e) {
        console.log('error = ', e);
        // this.SCROLLVIEW_REF.scrollToEnd();
      }
    }, 200);
  };

  const renderExplanation = () => {
    if (!qnaStore.showExplanation) {
      return;
    }
    try {
      let explanation = configExplanation(qnaStore, isRTL, qnaStore.currentQuestion.template);
      let explainationAudio = qnaStore.currentQuestion?.hasOwnProperty('explVoiceover') && qnaStore.currentQuestion?.explVoiceover;

      setTimeout(() => { scrollToExplanation(); }, 200);

      return (
        <View ref={viewRef}>
          <Explanation
            type={qnaStore.currentQuestion.template}
            explanation={explanation}
            isCorrect={qnaStore.isAnswerCorrect}
            mcqData={selectedMcq}
            audioData={explainationAudio}
            response={qnaStore.currentQuestion}
            onSoundBtnClicked={(data, audiourl) => {
              if (data.includes('orderingVO')) {
                playSound(data, audiourl)
              } else {
                playSound('explantionVO', createValidURL(data));
              }
            }}
          />
        </View>
      );
    } catch (err) {
      console.log('ERROR IN RENDER EXPLANATION:', err);
    }
  };

  const renderTimeoutDialog = () => {
    if (store.uiStore.sessionExceeded === true) {
      store.loginStore.setSkipOnBoardingScreen(true);
      return (
        <>
          <SessionTimeOutDialog
            onPress={() => {
              setAsValue('jwt', '');
              store.uiStore.reset();
              store.loginStore.setIsAuth(false);
            }}
          />
        </>
      );
    }
  };

  const quitWorksheets = async () => {
    await quitWorksheet(qnaStore, store, uiStore, screenType, navigation);
  };

  const callSubmitWorkSheetAPI = async reqBody => {
    delete reqBody.body.evaluatedResult;
    try {
      let req = {
        body: reqBody.body,
        store: store,
      };

      const response = await API(ApiEndPoint.SUBMIT_WORKSHEET, req);

      if (response.data.resultCode === 'C001') {
        let questions = response.data.contentData;
        questions.contentHeaderInfo = response.data.contentHeaderInfo;
        if (
          questions.hasOwnProperty('contentParams') &&
          questions?.contentParams &&
          questions?.contentParams?.userAttemptData &&
          questions?.contentParams?.userAttemptData?.hasOwnProperty(
            'userResponse',
          )
        ) {
          stopAudio();
          quitWorksheets();
        } else {
          reset();
          stopAudio();

          setskipQuestion(response?.data?.contentData?.skipQuestion);
          qnaStore.init(response.data);
          setStartTime(moment());
          await audioCleanup();
          await initializeAudioSection(response?.data?.contentData?.data[0]);
          console.log(
            `response?.data?.contentData?.data[0] ${JSON.stringify(
              response?.data?.contentData?.data[0],
            )}`,
          );
          //Disable scroll for Sortlist and Matchlist questions
          if (
            qnaStore?.currentQuestion?.template === 'SortList' ||
            qnaStore?.currentQuestion?.template === 'MatchList'
          ) {
            setEnableScroll(false);
          } else {
            setEnableScroll(true);
          }
        }
      } else if (
        response.data.resultCode === 'C004' &&
        response.data.contentHeaderInfo.hasOwnProperty('pedagogyMessages') &&
        (response.data.contentHeaderInfo.pedagogyMessages[0] === 'screeningTestComplete' ||
          response.data.contentHeaderInfo.pedagogyMessages[0] === 'levelTestComplete' ||
          response.data.contentHeaderInfo.pedagogyMessages[0] === 'AssesmentTestComplete')
      ) {
        stopAudio();
        quitWorksheets();
      } else {
        console.log('API ERROR:' + JSON.stringify(response.data));
        uiStore.setLoader(false);
      }
    } catch (e) {
      console.log(`Submit Worksheet Questions error>>>${e}`);
      uiStore.setLoader(false);
    }
    store.uiStore.setIsApiCalled(false);
  };

  const dontKnow = async (isQuit, isFromNextButton = false, closeSessionWS = false) => {
    try {
      var requestBody = {

        pedagogyID: qnaStore?.contentHeaderInfo?.pedagogyID,
        isDynamic: qnaStore.currentQuestion?.isDynamic,
        contentID: qnaStore.contentData?.contentId,
        result: Base64.encode('skip'),
        timeTaken: moment().diff(startTime, 'seconds'),
        userResponse: {},
        userAttemptData: {},
        contentInfo: {
          contentID: qnaStore.contentData?.contentId,
          contentVersionID: qnaStore.currentQuestion._id,
          contentType: qnaStore.contentData.contentType,
          questionType: qnaStore.currentQuestion.template,
          revisionNum: qnaStore.currentQuestion.revisionNo,
          langCode: qnaStore.currentQuestion.langCode,
        },
        contentSeqNum: qnaStore.contentData.contentSeqNum,
        mode:
          qnaStore.contentData.contentSubMode === 'remediation'
            ? 'learn'
            : qnaStore.contentData.contentSubMode,
        contentSubMode: qnaStore.contentData.contentSubMode,
        remainingTime: qnaStore.timed
          ? qnaStore.contentHeaderInfo?.remainingTime -
          moment().diff(startTime, 'seconds') - 1
          : 0,
        nextContentSeqNum: isQuit
          ? qnaStore.contentData.contentSeqNum
          : calculateNextContentSeqNum(isFromNextButton),
      };
      if (qnaStore.contentData.contentType == "passage") {
        requestBody.contentInfo = {
          contentID: qnaStore.contentData?.childContentId,
          contentVersionID: qnaStore.currentQuestion._id,
          contentType: qnaStore.contentData.childContentType,
          questionType: qnaStore.currentQuestion.template,
          revisionNum: qnaStore.currentQuestion.revisionNo,
          langCode: qnaStore.currentQuestion.langCode,
          childContentVersionID: qnaStore.currentQuestion._id,
          childContentID: qnaStore.contentData?.childContentId,
          childContentType: qnaStore?.contentData?.contentType,
          groupType: qnaStore.contentData.contentType,
          childRevisionNum: qnaStore.contentData.passageData.length > 0 ? qnaStore.contentData.passageData[0].revisionNo : qnaStore.contentData.passageData.revisionNo,
        };
      }
      if (screenType === HOMEWORK_EDICINE || screenType === WORKSHEET_EDICINE) {
        requestBody.isSubmitAnswer = false;
      }
      if (
        qnaStore?.wordMeaningData &&
        qnaStore?.wordMeaningData.length > 0 &&
        qnaStore?.wordMeaningData[qnaStore?.wordMeaningCurrentPosition]
      ) {
        requestBody.contentInfo.lastWordMeaningID =
          qnaStore?.wordMeaningData[
            qnaStore?.wordMeaningCurrentPosition
          ].contentID;
        requestBody.contentInfo.wordstatus = qnaStore?.wordMeaningStatus;
      }
      if (
        qnaStore.contentData.contentSubMode === 'remediation' ||
        qnaStore.contentData.contentSubMode === 'challenge'
      ) {
        requestBody.mode = 'learn';
      }

      if ((screenType === WORKSHEET_EDICINE || screenType === HOMEWORK_EDICINE) && qnaStore.currentQuestion.template === 'MCQ' && qnaStore?.userResponse != null) {
        requestBody.userResponse = qnaStore?.userResponse;
        requestBody.userAttemptData = {
          hintTaken: qnaStore?.isHintVisible,
          trialCount: qnaStore?.trialCount,
          trials: [
            {
              userResponse: qnaStore?.userResponse,
              result: qnaStore?.contentData?.contentParams?.userAttemptData?.result === "true" ||
                qnaStore?.contentData?.contentParams?.userAttemptData?.result == true ? true : false,
              timeTaken: qnaStore?.contentData?.contentParams?.userAttemptData?.timeTaken,
            },
          ],
        };
      }

      if (screenType === HOMEWORK_EDICINE) {
        let uploadedData = [null];
        if (qnaStore.homeworkSolutionAttachment !== null) {
          uploadedData = [
            {
              uri: qnaStore?.homeworkSolutionAttachment?.uri,
              fileName: qnaStore?.homeworkSolutionAttachment?.fileName,
            },
          ];
        }
        const textInteractionData = {};
        textInteractionData.type = 'TextInteraction';
        textInteractionData.userAnswer = null;

        if (requestBody != null && requestBody.userResponse !== null) {
          requestBody.userResponse.uploads = uploadedData;
          requestBody.userResponse.textInteraction = textInteractionData;
        }

        if (requestBody.userAttemptData && requestBody.userAttemptData.trials) {
          requestBody.userAttemptData.trials.map(item => {
            item.timeTaken = moment().diff(startTime, 'seconds');
            if (item?.userResponse !== null) {
              item.userResponse.uploads = uploadedData;
              item.userResponse.textInteraction = textInteractionData;
            }
          });
        }
      }
      console.log("callSubmitWorkSheetAPI --> ", requestBody); //used for debugging
      // return

      const reqBody = {
        jwt: await getAsValue('jwt'),
        store: store,
        body: requestBody,
      };

      reqBody.body.closeSessionWS = closeSessionWS;

      if (screenType == TOPICS) {
        callSubmitTopicQuestionAttemptAPI(reqBody, false, true);
      } else if (screenType == SCREEN_TEST) {
        reqBody.body.nextContentSeqNum = null;
        callSubmitWorkSheetAPI(reqBody);
      } else if (screenType === HOMEWORK_EDICINE) {
        console.log("Homework--------->>>");

        callSubmitHomeworkQuestionAPI(reqBody);
      } else {
        console.log("Worksheet--------->>>");
        callSubmitQuestionAttemptAPI(reqBody);
      }
    } catch (err) {
      console.log('useQnA dontknow err = ', err);
    }
  };

  const callSubmitQuestionAttemptAPI = async reqBody => {
    setStartTime(moment());

    try {
      let req = {
        body: reqBody.body,
        store: store,
      };
      const res = await API(ApiEndPoint.SUBMIT_WORKSHEET, req);
      if (res?.data?.resultCode === 'C001') {
        if (screenType == WORKSHEET_EDICINE) {
          console.log("screenType 1599", screenType);
          reset();
          if (isOtherAudioPlaying()) {
            pauseAudio();
            stopAudio();
          }
          audioCleanup();
          if (showClosePopup || reqBody.body.closeSessionWS) {
            navigation.goBack();
            return;
          }
          qnaStore.init(res.data);
          initializeAudioSection(res?.data?.contentData?.data[0]);
          updateInputResponse();
        } else {
          if (
            res?.data?.contentData?.hasOwnProperty('contentParams') &&
            res?.data?.contentData?.contentParams &&
            res?.data?.contentData?.contentParams?.userAttemptData &&
            res?.data?.contentData?.contentParams?.userAttemptData?.hasOwnProperty(
              'userResponse',
            )
          ) {
            // Toast.show({text: 'Last Question1', duration: 3000});
            console.log(
              'THIS IS THE LAST QUESTION BECAUSE userResponse is available',
            );
            runInAction(() => {
              qnaStore.showExplanation = true;
              qnaStore.isLastQuestion = true;
            });
            qnaStore.showNextBtn();
          } else if (res?.data?.contentData?.length === 0) {
            if (!Toast.isActive(13)) {
              Toast.show({ id: 13, description: 'Last Question3', duration: 3000 });
            }
            console.log(
              'THIS IS THE LAST QUESTION BECAUSE userResponse is available',
            );
            runInAction(() => {
              qnaStore.showExplanation = true;
              qnaStore.isLastQuestion = true;
            });
            navigation.navigate(ScreenNames.WorksheetSessionReportScreen);
          } else {
            console.log('----------HAVE MORE QUESTIONS--------');
            setskipQuestion(res?.data?.contentData?.skipQuestion);
            qnaStore.setNextQuestionData(res.data);
            runInAction(() => {
              qnaStore.showExplanation = true;
            });
            qnaStore.showNextBtn();
          }
        }
      } else if (
        res?.data?.resultCode === 'C004' &&
        res?.data?.redirectionCode === 'ContentPage'
      ) {
        if (screenType == WORKSHEET_EDICINE) {
          console.log("screenType 1659", screenType);
          navigation.replace(ScreenNames.WorksheetListScreen);
        } else {
          navigation.replace(ScreenNames.WorksheetSessionReportScreen);
        }
      } else {
        if (store.uiStore.sessionExceeded === false) {
          store.uiStore.apiErrorInit({
            code: res.status,
            message: res.data?.resultMessage,
          });
        }
      }
    } catch (err) {
      console.log('ERROR IN SUBMIT API', err);
      uiStore.setLoader(false);
    }
    store.uiStore.setIsApiCalled(false);
  };

  const quitDiscreteSkill = async () => {
    try {
      let req = {
        body: {
          discreteSkillID: qnaStore?.contentHeaderInfo?.pedagogyID,
        },
        store: store,
      };
      let res = await API(ApiEndPoint.QUIT_DISCRETE_SKILL, req);
      if (res.data.resultCode === 'C001' || res.data.resultCode === 'C004') {
        switch (res?.data?.redirectionCode) {
          case 'ContentPage':
            navigation.replace(ScreenNames.DiscreteSkillSessionReportScreen);
            break;
          case 'OpenDiscreteSkill':
            callOpenDiscreteSkill(
              res.data?.redirectionData?.activatedDiscreteSkillID,
            );
            break;
          default:
            break;
        }
      } else {
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (err) {
      console.log("useQNA quitDiscreteSkill error =  ", err);
    }
  };

  const callOpenDiscreteSkill = async discreteSkillID => {
    let req = {
      body: {
        discreteSkillID,
        mode: 'Test',
      },
      store: store,
    };
    try {
      let res = await API(ApiEndPoint.OPEN_DISCRETE_SKILL, req);
      if (
        res.data.resultCode == 'C004' &&
        res.data.redirectionCode == 'ContentPage'
      ) {
        runInAction(() => {
          store.qnaStore.topicId = discreteSkillID;
        });
        navigation.push(ScreenNames.DiscreteSkillQnAScreen);
      } else {
        store.uiStore.apiErrorInit({
          code: response.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (error) { }
  };

  const updateQuestion = async () => {
    try {
      if (qnaStore.isLastQuestion) {
        if (screenType == DISCRETE_SKILL) {
          quitDiscreteSkill();
        } else {
          quitWorksheets();
        }
      } else {
        await reset();
        await audioCleanup();
        qnaStore.init(qnaStore?.nextQuestionRes);

        let response = { data: qnaStore?.nextQuestionRes };
        await initializeAudioSection(response?.data?.contentData?.data[0]);
        //Disable scroll for Sortlist and Matchlist questions
        if (
          qnaStore?.currentQuestion?.template === 'SortList' ||
          qnaStore?.currentQuestion?.template === 'MatchList'
        ) {
          setEnableScroll(false);
        } else {
          setEnableScroll(true);
        }
        uiStore.setLoader(false);
      }
    } catch (err) {
      console.log("useQNA updateQuestion = ", err);
    }
  };

  const callUpdateQuestionAttemptAPI = async () => {
    try {
      let req = {
        body: {
          contentID: qnaStore.contentData.contentId,
          userAttemptData: {
            explanationRead: true,
            explanationReadTime: moment().diff(startTime, 'seconds'),
            explanationRating: null,
            gaveExplanation: false,
            feedbackResponse: null,
            userExplanation: null,
          },
          contentInfo: {
            contentID: qnaStore.contentData.contentId,
            contentVersionID: qnaStore.currentQuestion._id,
            contentType: qnaStore.contentData
              ? qnaStore.contentData.contentType
              : '',
            questionType: qnaStore.currentQuestion.template,
            revisionNum: qnaStore.contentData.revisionNo,
            langCode: qnaStore.currentQuestion.langCode,
          },
        },
        store: store,
      };
      const res = await API(ApiEndPoint.UPDATE_QUESTION_ATTEMPT, req);
      if (res.data.resultCode === 'C001') {
        if (
          (qnaStore.nextQuestionRes.resultCode == 'C004' &&
            qnaStore.nextQuestionRes.redirectionCode == 'CloseContent') ||
          (qnaStore.nextQuestionRes.redirectionData &&
            qnaStore.nextQuestionRes.redirectionData.endTopicFlag)
        ) {
          navigation.replace(ScreenNames.TopicSummaryScreen);
        } else {
          console.log(' initialize Audio Section ');
          await reset();
          qnaStore.init(qnaStore.nextQuestionRes);
          if (ContentIDs.includes(qnaStore.contentData.contentId)) {
            qnaStore.showSkip();
            qnaStore.skipQnaQuestion();
          }
          await audioCleanup();
          await initializeAudioSection(qnaStore.nextQuestionRes.contentData?.data[0]);
          // setStarred(false);
        }
      } else {
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (err) {
      console.log('UseQnA callUpdateQuestionAttemptAPI error = ', err);
      store.uiStore.apiErrorInit({
        code: false,
        message: 'Api Error',
      });
    }
    store.uiStore.setIsApiCalled(false);
  };

  const closeContent = async () => {
    try {
      let req = {
        body: {
          endTopicFlag: false,
          endTopicHigherLevel: false,
          userTriggered: true,
          sessionTimeExceededFlag: false,
        },
        store: store,
      };
      let res = await API(ApiEndPoint.CLOSE_CONTENT, req);
      if (res) {
        if (
          res.data.resultCode === 'C004' &&
          res.data.redirectionCode === 'TopicSessionReport'
        ) {
          //Check if Revice mode
          if (store.qnaStore.contentData.contentSubMode == 'revise') {
            navigation.replace(ScreenNames.TopicListingScreen);
          } else {
            runInAction(() => {
              store.qnaStore.topicId = res.data.redirectionData.ID;
            });
            navigation.replace(ScreenNames.TopicSummaryScreen);
          }
        } else {
          store.uiStore.apiErrorInit({
            code: res.status,
            message: res.data?.resultMessage,
          });
        }
      } else {
        store.uiStore.setLoader(false);
        store.uiStore.apiErrorInit({
          code: false,
          message: 'Api Error',
        });
      }
    } catch (err) {
      console.log('UseQnA close content error = ', err);
      store.uiStore.apiErrorInit({
        code: false,
        message: 'Api Error',
      });
    }
    store.uiStore.setIsApiCalled(false);
    qnaStore.reset();
  };
  const isInternetErrorMsg = (msg) => {
    if (msg != null) {
      if (`${msg}`.toLocaleLowerCase().indexOf("network error") != -1) {
        store.uiStore.setInterNetErrorMsg(true);
      } else {
        store.uiStore.setInterNetErrorMsg(false);
      }
    }
  }
  const callSubmitTopicQuestionAttemptAPI = async (
    reqBody,
    showExplination = true,
    dontKnow = false,
  ) => {
    auth.trackEvent('mixpanel', MixpanelEvents.QUESTION_ATTEMPTED, {
      Category: MixpanelCategories.TOPIC,
      Action: MixpanelActions.ATTEMPTED,
      Label: '',
    });
    setStartTime(moment());
    let interactiveBody;
    if (reqBody.body.contentInfo.questionType === 'Interactive') {
      interactiveBody = {
        contentID: reqBody.body.contentID,
        contentInfo: reqBody.body.contentInfo,
        contentSeqNum: reqBody.body.contentSeqNum,
        contentSubMode: reqBody.body.contentSubMode,
        isDynamic: reqBody.body.isDynamic,
        mode: reqBody.body.mode,
        result: reqBody.body.result,
        timeTaken: reqBody.body.timeTaken,
        userAttemptData: reqBody.body.userAttemptData,
        userResponse: reqBody.body.userResponse,
      };
    }
    try {
      let req = {
        body:
          reqBody.body.contentInfo.questionType === 'Interactive'
            ? interactiveBody
            : reqBody.body,
        store: store,
      };
      let apiUrl = '';
      apiUrl = ApiEndPoint.SUBMIT_QUESTION_ATTEMPT;
      qnaStore.hideSubmitAndNextWithHandleAllCases();
      const res = await API(apiUrl, req);
      isInternetErrorMsg(res?.message);
      if (res.data.resultCode === 'C001') {
        if (reqBody?.isTimeTest) {
          await reset();
          qnaStore.init(res.data);
        } else if (
          reqBody.body.contentSubMode == 'challenge' &&
          dontKnow == true
        ) {
          if (
            qnaStore.contentHeaderInfo.pedagogyMessages[0] ==
            'challengeAttempt1'
          ) {
            qnaStore.setNextQuestionData(res.data);
            runInAction(() => {
              qnaStore.showExplanation = showExplination;
            });
            // qnaStore.showNextBtn();
            qnaStore.setDisableBTn(true);
            callUpdateQuestionAttemptAPI();
            // setStarred(false);
          }
          if (
            qnaStore.contentHeaderInfo.pedagogyMessages[0] ==
            'challengeAttempt2'
          ) {
            qnaStore.setNextQuestionData(res.data);
            runInAction(() => {
              qnaStore.showExplanation = true;
            });
            setLockOptions(true);
            qnaStore.showNextBtn();
          }
        } else {
          //qnaStore.showEffortpopup();
          if (
            res.data.contentHeaderInfo.pedagogyMessages.includes(
              'remedialFlow1_Remedial',
            ) ||
            res.data.contentHeaderInfo.pedagogyMessages.includes(
              'remedialFlow1_Cluster',
            ) ||
            res.data.contentHeaderInfo.pedagogyMessages.includes(
              'remedialFlow2',
            ) ||
            res.data.contentHeaderInfo.pedagogyMessages.includes(
              'remedialFlow3',
            )
          ) {
            //Enable State for effort popup
            qnaStore.showEffortpopup();
          }
          qnaStore.setNextQuestionData(res.data);
          runInAction(() => {
            qnaStore.showExplanation = showExplination;
          });
          qnaStore.showNextBtn();
        }
      } else if (res.data.resultCode == 'C004') {
        if (res.data.redirectionCode == 'CloseContent') {
          if (res.data?.contentHeaderInfo?.hasOwnProperty('alert')) {
            qnaStore.setRewardTitle(res.data);
          } else {
            navigation.replace(ScreenNames.TopicSummaryScreen);
          }
        } else {
          qnaStore.setNextQuestionData(res.data);
          qnaStore.showNextBtn();
        }
      } else {
        qnaStore.UnhideSubmitAndNextWithHandleAllCases();
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (err) {
      qnaStore.UnhideSubmitAndNextWithHandleAllCases();
      qnaStore.setDisableBTn(false);
      if (store.uiStore.internetErrorMsg) {
        store.uiStore.setIsNetConnected(false);
        store.uiStore.setInterNetErrorMsg(false);
      }
      console.log('ERROR IN SUBMIT API', JSON.stringify(err));
    }
  };

  const callOpenActivity = async () => {
    runInAction(() => {
      store.appStore.activityID = qnaStore.currentQuestion.contentID;
    });
    const reqBody = {
      jwt: await getAsValue('jwt'),
      store: store,
      body: {
        activityID: qnaStore.currentQuestion.contentID,
      },
    };
    const res = await API(ApiEndPoint.OPEN_ACTIVITY, reqBody);
    if (res.data.resultCode === 'C004') {
      qnaStore.setEnableAttachmentModal(false);
      if (qnaStore.currentQuestion.template == 'Introduction') {
        navigation.navigate(ScreenNames.IntroductionScreen);
      } else {
        navigation.navigate(ScreenNames.GamePlayArenaScreen);
        qnaStore.setActivitySkipButton(true);
      }
    } else if (res.data.resultCode === 'C002') {
      console.warn('Res data>', JSON.stringify(res.data));
    }
  };

  const submitTimeTest = async () => {
    if (screenType == SEARCH) {
      navigation.navigate(ScreenNames.PreviewQnASearchScreen);
    }
    let contentData = qnaStore.questionRes.contentData;
    let data = contentData.data[0];
    let contentInfo = {
      contentID: contentData.contentId,
      contentVersionID: data._id,
      contentType: contentData.contentType,
      groupType: "TimedTest",
      revisionNum: data.revisionNo,
      langCode: data.langCode,
    };
    let submitData = {
      contentID: contentData.contentId,
      result: 'pass',
      timeTaken: qnaStore.timeTaken,
      timedTestInfo: {
        contentInfo: contentInfo,
      },
      userAttemptData: {
        userAttemptInfo: {
          totalCorrect: qnaStore.correctAnswerCount,
          totalAttempted: qnaStore.questionIndex,
          totalQuestions: qnaStore.timeTextQuestions.length,
          finished: !qnaStore.isTimeUp,
        },
        questionWiseData: qnaStore.timeTestUserAnswers,
      },
      contentInfo: contentInfo,
      contentSeqNum: contentData.contentSeqNum,
      mode: 'learn',
      contentSubMode: contentData.contentSubMode,
    };

    const reqBody = {
      jwt: await getAsValue('jwt'),
      store: store,
      body: submitData,
      isTimeTest: true,
    };
    console.log('RequestBody', JSON.stringify(reqBody.body));
    callSubmitTopicQuestionAttemptAPI(reqBody);
  };

  const getTimeTestPopup = () => {
    if (qnaStore.isTimeTestDone) {
      return (
        <TimeTestModal
          isVisible={showTimeTestModal}
          showAttemptLaterModal={true}
          onPress={() => {
            setShowTimeTestModal(false);
            runInAction(() => {
              timerRef?.current?.start();
              qnaStore.isTimeTestDone = false;
              qnaStore.isTimeUp = false;
            });
          }}
          onCompleteLater={() => {
            setShowTimeTestModal(false);
            // submitTimeTest();
            console.log('UseQnA close content called');
            closeContent();
          }}
        />
      );
    } else if (qnaStore.isTimeUp) {
      return (
        <TimeTestModal
          isVisible={showTimeTestModal}
          onPress={() => {
            setShowTimeTestModal(false);
            submitTimeTest();
          }}
          title={tryAgainLaterText}
          topic={qnaStore.timeTestData.title}
          isStatusShown={false}
          subtitle={`Your time Is up.\n You had ${qnaStore.timeTestData.durationClass
            }  minutes to do this test.`}
        />
      );
    } else {
      let correct = qnaStore.correctAnswerCount;
      let wrong = qnaStore.questionIndex - qnaStore.correctAnswerCount;
      let accuracy = ((correct / qnaStore.questionIndex) * 100).toFixed(0);
      if (accuracy >= 75) {
        return (
          <TimeTestModal
            isVisible={showTimeTestModal}
            onPress={() => {
              setShowTimeTestModal(false);
              submitTimeTest();
            }}
            title={replaceString(excellentWorkText, "name", store.loginStore.username)}
            topic={qnaStore.timeTestData.title}
            isStatusShown={true}
            correct={correct}
            wrong={wrong}
            accuracy={accuracy}
            infoMessage={`Given Time:${qnaStore.timeTestData.durationClass
              } minutes`}
            subtitle={`${yourTimeText} ${moment
              .utc(qnaStore.timeTaken * 1000)
              .format('mm [min] ss [sec]')}`}
          />
        );
      } else {
        return (
          <TimeTestModal
            isVisible={showTimeTestModal}
            onPress={() => {
              setShowTimeTestModal(false);
              submitTimeTest();
            }}
            title={tryHarderText}
            topic={qnaStore.timeTestData.title}
            isStatusShown={true}
            correct={correct}
            wrong={wrong}
            accuracy={accuracy}
            infoMessage={''}
            subtitle={youNeedToGetMoreQuetionRight}
          />
        );
      }
    }
  };

  const callNavigateFunc = async () => {
    timerRef?.current?.stop();
    await reset();
    navigation.replace(ScreenNames.WorksheetListScreen);
  };

  const quitEdicineWorksheet = async () => {
    let req = {
      body: {
        worksheetID: qnaStore.contentHeaderInfo?.pedagogyID,
      },
      store: store,
    };
    let res = await API(ApiEndPoint.QUIT_WORKSHEET_EDICINE, req);
    if (res.data.resultCode === 'C001') {
      if (res.data.alert) {
        setShowTimesUp(false);
        setRewardItem(res.data.alert.badge);
        setRewardModal(true);
      } else {
        timerRef?.current?.stop();
        await reset();
        navigation.replace(ScreenNames.WorksheetListScreen);
      }
    } else if (res.data.resultCode === 'C004') {
      timerRef?.current?.stop();
      await reset();
      navigation.replace(ScreenNames.WorksheetListScreen);
    } else {
      store.uiStore.apiErrorInit({
        code: res.status,
        message: res.data?.resultMessage,
      });
      console.log('Quit  Worksheet ERROR' + JSON.stringify(res.data));
    }
    store.uiStore.setIsApiCalled(false);
  };

  const updateInputResponse = () => {
    console.log('qqna screen-updateInputResponse called');
    let answers = qnaStore.userResponse;
    let newResponse = {};
    console.log('qqna screen-answers ', toJS(answers));
    for (let answer in answers) {
      console.log('qqna screen-answer ', answer);
      if (answers.hasOwnProperty(answer) && answers[answer]?.userAnswer != null) {
        newResponse[answer] = answers[answer]?.userAnswer;
      }
    }
    console.log('qqna screen- outside if answers', toJS(answers));
    console.log(
      'qqna screen- outside if inputreposne/newresponse',
      newResponse,
    );
    qnaStore.currentQuestion.template === 'Dropdown' &&
      qnaStore.setUserResponse(answers);
    setInputResponse(newResponse);
    console.log('\n new Response', newResponse);
  };

  const closeWSSession = () => {

    if (rewardModal) {
      callNavigateFunc();
      return;
    }
    dontKnow(true, false, true);
  }

  const getWorksheetPopup = () => {
    if (showSubmitPopup) {
      return (
        <TimedWorksheetModal
          isVisible={true}
          showSubmitModal={true}
          onPress={() => {
            setShowSubmitPopup(false);
            quitEdicineWorksheet();
          }}
          onCompleteLater={() => {
            setShowSubmitPopup(false);
          }}
          title={liveWorksheetText}
          buttonText={letsGoBtnText}
        />
      );
    } else if (showClosePopup) {
      return (
        <TimedWorksheetModal
          isVisible={true}
          showAttemptLaterModal={true}
          onPress={() => {
            timerRef?.current?.start();
            setShowClosePopup(false);
          }}
          title={liveWorksheetText}
          onCompleteLater={() => {
            timerRef?.current?.stop();
            dontKnow(true);
            setShowClosePopup(false);
            auth.trackEvent('mixpanel', MixpanelEvents.WORKSHEET_DONE, {
              Category: MixpanelCategories.WORKSHEET,
              Action: MixpanelActions.CLICKED,
              Label: '',
            });
          }}
          buttonText={letsGoBtnText}
        />
      );
    } else if (qnaStore.timed && showTimesUp) {
      return (
        <TimedWorksheetModal
          onPress={() => {
            quitEdicineWorksheet();
          }}
          isVisible={true}
          title={timeUpText}
          buttonText={okayBtnText}
          topic={qnaStore?.contentHeaderInfo?.pedagogyName}
          subtitle={timeWorkSheetOverText}
        />
      );
    } else if (rewardModal) {
      return (
        <RewardCollectionModal
          isVisible={rewardModal}
          item={rewardItem}
          onStartBtnPressed={() => {
            setRewardModal(false);
            callNavigateFunc();
          }}
        />
      );
    }
  };

  const options = {
    title: selectSolutionImage,
    quality: 0.4,
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openPhotoLibrary = async () => {
    if (isPickerOpen.current) return;

    try {
      isPickerOpen.current = true;
      let launchLibraryReponse = await launchImageLibrary(options);
      isPickerOpen.current = false;
      homeworkAttachment(launchLibraryReponse)
    } catch (error) {
      isPickerOpen.current = false;
      console.log(error)
    }
  };

  const homeworkAttachment = attachHomework(qnaStore, setSolutionUploadError, maxSizeHwSolutionAllowed);

  const openCamera = async () => {
    if (isPickerOpen.current) return;
    try {
      isPickerOpen.current = true;
      let launchReponse = await launchCamera(options);
      isPickerOpen.current = false;
      homeworkAttachment(launchReponse)
    } catch (error) {
      isPickerOpen.current = false;
      console.log(error)
    }
  };

  const onAttachmentButtonClicked = isPhotoLibrary => {
    setCameraSeleted(isPhotoLibrary);
    if (qnaStore.homeworkSolutionAttachment !== null) {
      qnaStore.setEnableHomeworkAttentionModal(true);
    } else if (isPhotoLibrary) {
      openPhotoLibrary();
    } else {
      openCamera()
    }
  };

  const renderHomeworkSolutionView = () => {
    return (
      <View style={homeworkStyle.solutionContainer}>
        <BalooThambiRegTextView style={homeworkStyle.solutionTitle}>
          {writeYourSolutionText}
        </BalooThambiRegTextView>
        <CustomTextInput
          style={homeworkStyle.solutionField}
          onChangeText={value => qnaStore?.setHomeworkSolution(value)}
          value={qnaStore?.homeworkSolution}
          multiline={true}
        />
        <BalooThambiRegTextView style={homeworkStyle.solutionTitle}>
          {uploadYourSolutionText}
        </BalooThambiRegTextView>
        <View style={homeworkStyle.solutionButtonContainer}>
          <TouchableOpacity
            onPress={() => onAttachmentButtonClicked(true)}
            style={[
              homeworkStyle.solutionButtonSubContainer,
              { width: getWp(100), marginEnd: getWp(8) },
            ]}>
            <BalooThambiRegTextView style={homeworkStyle.solutionButtonText}>
              {uploadBtnText}
            </BalooThambiRegTextView>
            <Upload width={getWp(16)} height={getWp(16)} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAttachmentButtonClicked(false)}
            style={homeworkStyle.solutionButtonSubContainer}>
            <BalooThambiRegTextView style={homeworkStyle.solutionButtonText}>
              {takePhotoBtnText}
            </BalooThambiRegTextView>
            <CameraWhite width={getWp(16)} height={getWp(16)} />
          </TouchableOpacity>
        </View>
        <HomeworkSolutionImageModal
          isVisible={qnaStore?.enableAttachmentModal}
          imageURL={qnaStore?.homeworkSolutionAttachment?.uri}
          onPress={() => qnaStore?.setEnableAttachmentModal(false)}
        />
        <HomeworkAttentionModal
          isVisible={qnaStore?.enableHomeworkAttentionModal}
          onOkayButtonPressed={() => {
            // qnaStore.setHomeworkSolutionAttachment(null);
            qnaStore.setEnableHomeworkAttentionModal(false);
            setTimeout(() => {
              if (isCameraSelected) {
                openPhotoLibrary();
              } else {
                openCamera();
              }
            }, 500);
          }}
          onNoButtonPressed={() =>
            qnaStore.setEnableHomeworkAttentionModal(false)
          }
        />
        {qnaStore?.homeworkSolutionAttachment !== null && (
          <View style={homeworkStyle.solutionAttachmentContainer}>
            <TouchableOpacity
              onPress={() => qnaStore.setEnableAttachmentModal(true)}>
              <Image
                style={homeworkStyle.solutionAttachmentImage}
                source={{ uri: qnaStore?.homeworkSolutionAttachment?.uri }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('uploading');
                qnaStore.setEnableAttachmentModal(true);
              }}>
              <BalooThambiRegTextView
                numberOfLines={1} //numberOflines seems to be not working here due to layout, thus to use ellipses I used substring and '...'
                ellipsizeMode="middle"
                style={homeworkStyle.solutionAttachmentText}>
                {qnaStore?.homeworkSolutionAttachment?.fileName}
              </BalooThambiRegTextView>
            </TouchableOpacity>
            <ErrorClose
              style={homeworkStyle.solutionCloseButton}
              width={getWp(20)}
              height={getWp(20)}
              onPress={() => qnaStore.setHomeworkSolutionAttachment(null)}
            />
          </View>
        )}
        {solutionUploadError !== null &&
          solutionUploadError !== '' &&
          solutionUploadError !== undefined && (
            <BalooThambiRegTextView
              style={homeworkStyle.solutionUploadErrorMsg}>
              {solutionUploadError}
            </BalooThambiRegTextView>
          )}
        <SourceSansProRegTextView style={homeworkStyle.solutionDescriptionText}>
          {youCanOnlyUploadOneImage}
        </SourceSansProRegTextView>
      </View>
    );
  };

  const passageBtnClickHandler = type => {
    passageButtonHandler(type, qnaStore, initializeAudioSection, audioCleanup);
  };

  const exitQnARequest = async (isQuit = true) => {
    let requestBody = {
      isDynamic: qnaStore.currentQuestion?.isDynamic,
      contentID: qnaStore.contentData?.contentId,
      childContentID: qnaStore.contentData?.childContentId,
      userResponse: {},
      userAttemptData: {},
      contentInfo: {
        contentID: qnaStore.contentData?.contentId,
        childContentID: qnaStore.contentData?.childContentId,
        contentVersionID: qnaStore.contentData?.passageData._id,
        childContentVersionID: qnaStore.currentQuestion?._id,
        contentType: qnaStore.contentData.contentType,
        childContentType: qnaStore.contentData?.childContentType,
        groupType: qnaStore.contentData.contentType,
        questionType: qnaStore.currentQuestion.template,
        revisionNum: qnaStore.contentData?.passageData?.revisionNo,
        childRevisionNum: qnaStore.currentQuestion.revisionNo,
        langCode: qnaStore.currentQuestion.langCode,
      },
      contentSeqNum: qnaStore.contentData.contentSeqNum,
    };

    /**
     * Add this if Wordmeaning data present
     */
    if (
      qnaStore?.wordMeaningData &&
      qnaStore?.wordMeaningData.length > 0 &&
      qnaStore?.wordMeaningData[qnaStore?.wordMeaningCurrentPosition]
    ) {
      requestBody.contentInfo.lastWordMeaningID =
        qnaStore?.wordMeaningData[
          qnaStore?.wordMeaningCurrentPosition
        ].contentID;
      requestBody.contentInfo.wordstatus = qnaStore?.wordMeaningStatus;
    }
    /**
     * Ends
     */

    console.log('I Donot Know Request', requestBody);

    const reqBody = {
      jwt: await getAsValue('jwt'),
      store: store,
      body: requestBody,
    };
    if (screenType == SCREEN_TEST) {
      reqBody.body.pedagogyID = qnaStore?.contentHeaderInfo?.pedagogyID;
      reqBody.body.contentInfo.contentVersionID = qnaStore.currentQuestion._id;
      reqBody.body.contentInfo.revisionNum =
        qnaStore.currentQuestion.revisionNo;

      callSubmitWorkSheetAPI(reqBody);
    } else if (screenType === DISCRETE_SKILL) {
      callSubmitDiscreteSkillQuestionAttemptAPI(reqBody, isQuit);
    } else {
      callSubmitQuestionAttemptAPI(reqBody);
    }
  };

  const callSubmitDiscreteSkillQuestionAttemptAPI = async (reqBody, isQuit = false) => {
    setStartTime(moment());
    try {
      let req = {
        body: reqBody.body,
        store: store,
      };
      qnaStore.hideSubmitAndNextWithHandleAllCases();
      const res = await API(ApiEndPoint.SUBMIT_DISCRETE_SKILL_QUESTION, req);
      if (res?.data?.resultCode === 'C001') {
        if (isQuit) {
          qnaStore.reset();
          navigation.navigate(ScreenNames.DiscreteSkillSessionReportScreen);
        } else if (res?.data?.contentHeaderInfo?.submitButton?.action?.viewState) {
          console.log('THIS IS THE LAST QUESTION BECAUSE submit btn is true');
          runInAction(() => {
            qnaStore.showExplanation = true;
            qnaStore.isLastQuestion = true;
          });
          qnaStore.showNextBtn();
        } else if (res?.data?.contentData?.length === 0) {
          if (!Toast.isActive(14)) {
            Toast.show({ id: 14, description: 'Last Question3', duration: 3000 });
          }
          console.log(
            'THIS IS THE LAST QUESTION BECAUSE content data is empty',
          );
          runInAction(() => {
            qnaStore.showExplanation = true;
            qnaStore.isLastQuestion = true;
          });
          navigation.navigate(ScreenNames.DiscreteSkillSessionReportScreen);
        } else {
          console.log('----------HAVE MORE QUESTIONS--------');
          setskipQuestion(res?.data?.contentData?.skipQuestion);
          qnaStore.setNextQuestionData(res.data);
          runInAction(() => {
            qnaStore.showExplanation = true;
          });
          qnaStore.showNextBtn();
        }
      } else if (
        res?.data?.resultCode === 'C004' &&
        res?.data?.redirectionCode === 'ContentPage'
      ) {
        navigation.navigate(ScreenNames.DiscreteSkillSessionReportScreen);
      } else {
        qnaStore.UnhideSubmitAndNextWithHandleAllCases();
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (err) {
      qnaStore.UnhideSubmitAndNextWithHandleAllCases();
      console.log('ERROR IN SUBMIT API', err);
      uiStore.setLoader(false);
    }
  };
  return {
    trueSelectionMcq,
    lockOptions,
    selectedMcq,
    falseSelectionMcq,
    createSubmitRequest,
    questionRef,
    interactiveRef,
    webref,
    csInit,
    csCheckIframe,
    csEvaluateAnswer,
    submitFunction,
    setEnableScroll,
    enableScroll,
    isSubmitClicked,
    showLoaderVisbility,
    isVisible,
    onWebViewMessage,
    renderCSHtmlView,
    scrollViewRef,
    parentScrollRef,
    dragAndDropCallback,
    classificationDragAndDrop,
    renderQuestionsItem,
    scrollToExplanation,
    renderExplanation,
    viewRef,
    reset,
    renderTimeoutDialog,
    skipQuestion,
    setskipQuestion,
    setStartTime,
    updateQuestion,
    qnaStore,
    setShowTimeTestModal,
    timerRef,
    getTimeTestPopup,
    callOpenActivity,
    callUpdateQuestionAttemptAPI,
    getWorksheetPopup,
    closeWSSession,
    setShowSubmitPopup,
    setShowClosePopup,
    setShowTimesUp,
    playSound,
    initializeAudioSection,
    audioCleanup,
    showInsStVO,
    showQuesVO,
    qBodyVoiceOver,
    dontKnow,
    renderHomeworkSolutionView,
    setRewardModal,
    updateInputResponse,
    submitTimeTest,
    stopAudio,
    passageBtnClickHandler,
    exitQnARequest,
    homeworkAttachment,
    openCamera,
    openPhotoLibrary,
    pauseAudio
  };
};