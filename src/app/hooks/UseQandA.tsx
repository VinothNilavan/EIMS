import { Platform } from 'react-native';
import { runInAction } from 'mobx';
import ImageResizer from 'react-native-image-resizer';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { Base64 } from 'js-base64';
import { checkForAudio } from '@utils';
import Generic from '../constants/Generic';
import { ApiEndPoint, ScreenNames } from '@constants';
import { API } from '@api';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { QHtmlTemplateForIframe } from '@components';
import { QTypes } from '../helpers';

export const falseSelectMCQ = (data, qnaStore, screenType, setLockOptions, setSelectedMcq, questionRef, uiStore) => {
  runInAction(() => { console.log("runInAction qnaStore.inputData 15");
   qnaStore.inputData = [{ value: data.index }]; });

  if (Generic.SCREEN_TEST) makeLockOption(screenType, setLockOptions);

  data.correct = false;
  let resValidation = qnaStore.currentQuestion?.responseValidation;
  data.score = resValidation && resValidation?.unscored ? resValidation?.unscored : 0;
  setSelectedMcq(data);
  return createReq(data, screenType, questionRef, uiStore);
}

export const trueSelectMCQ = (data, qnaStore, screenType, setLockOptions, setSelectedMcq, questionRef, uiStore) => {
  runInAction(() => {console.log("runInAction qnaStore.inputData 28"); qnaStore.inputData = [{ value: data.index }]; });
  makeLockOption(screenType, setLockOptions);
  data.correct = true;
  let resValidation = qnaStore.currentQuestion?.responseValidation?.validResponse;
  data.score = resValidation && resValidation?.score ? resValidation?.score : 1;
  setSelectedMcq(data);
  return createReq(data, screenType, questionRef, uiStore);
}

const makeLockOption = (screenType: any, setLockOptions: any) => {
  let flag = screenType === Generic.HOMEWORK_EDICINE || screenType === Generic.WORKSHEET_EDICINE;
  setLockOptions(!flag);
}

const createReq = (data: any, screenType: any, questionRef: any, uiStore: any) => {
  if (screenType != Generic.SCREEN_TEST && screenType != Generic.WORKSHEET_EDICINE && screenType !== Generic.HOMEWORK_EDICINE) {
    try {
      if (questionRef) {
        let response = questionRef?.current?.evaluteAnswer(data);
        return response;
      } else {
        console.log('here your ref not available');
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    uiStore.setLoader(false);
  }
  return '';
}

export const attachHomework = (qnaStore, setSolutionUploadError, maxSizeHwSolutionAllowed) => {
  return async (response) => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Camera Error: ', response.error);
    } else {
      let asset = response.assets[0];
      let path = asset.uri;
      if (Platform.OS === 'ios') {
        path = '~' + path.substring(path.indexOf('/Documents'));
      }
      if (!asset.fileName)
        asset.fileName = path.split('/').pop();

      ImageResizer.createResizedImage(asset.uri, 600, 600, 'JPEG', 100, 0, undefined, false)
        .then(resizedImage => {
          let imageData = { fileName: resizedImage.name, ...resizedImage };
          if (imageData.size / 1000 < 5120) {
            qnaStore.setHomeworkSolutionAttachment(imageData);
          } else
            setSolutionUploadError(maxSizeHwSolutionAllowed);
        }).catch(err => {
          console.log(err);
        });
    }
  };
}

export const configExplanation = (qnaStore, isRTL, qType = null) => {
  console.log('config exlanation');
  let explanation = '';
  if (qnaStore.currentQuestion.explanation && qnaStore.currentQuestion.explanation !== '') {
    let explanationText = qnaStore.currentQuestion.explanation;
    if (qnaStore.currentQuestion.encrypted) {
      explanationText = Base64.decode(qnaStore.currentQuestion.explanation);
    }
    explanationText = checkForAudio(explanationText);
    const isMath = explanationText.indexOf('<equ>');
    let isIframe = false;
    if (explanationText.indexOf('<iframe') > -1) {
      isIframe = true;
    }

    if (qType && `${qType}`.toLowerCase() == QTypes.Interactive) {
      let QuestionData =  {};
      QuestionData.questionBody = explanationText;
      explanation = getQuestionItemHtmlTemplate(QTypes.Interactive, QuestionData, 0, isRTL);
    } else {
      if (isMath > 0 || isIframe) {
        explanation = QHtmlTemplateForIframe(explanationText, true);
      } else {
        explanation = getHtmlTemplate(explanationText, false, isRTL, null, false, true);
      }
    }


  }
  return explanation;
}

export const quitWorksheet = async (qnaStore, store, uiStore, screenType, navigation) => {
  let req = {
    body: { worksheetID: qnaStore?.contentHeaderInfo?.pedagogyID },
    store: store,
  };
  let res = await API(ApiEndPoint.QUIT_WORKSHEET, req);
  uiStore.setLoader(false);
  console.log('QUIT WORKSHEET RESPONSE:', JSON.stringify(res.data));
  if (res.data.resultCode === 'C004') {
    if (screenType == Generic.WORKSHEET) {
      if (res.data.redirectionCode === 'WorksheetList') {
        navigation.replace(ScreenNames.WorksheetSessionReportScreen);
      } else if (res.data.redirectionCode === 'ContentPage') {
        navigation.replace(ScreenNames.WorksheetSessionReportScreen);
      }
    } else {
      if (res.data.redirectionCode === 'ScreeningTestReport') {
        qnaStore.reset();
        navigation.replace(ScreenNames.ScreeningTestReportScreen);
      }
    }
  } else {
    console.log('QUIT WORKSHEET ERROR' + JSON.stringify(res.data));
  }
  store.uiStore.setIsApiCalled(false);
}

export const passageButtonHandler = (type: string, qnaStore: any, initializeAudioSection: any, audioCleanup: any) => {
  switch (type) {
    case 'view_question':
      qnaStore.isReadPassageBtnVisible = true;
      qnaStore.isViewQuestionBtnVisible = false;
      if (qnaStore.wordMeaningData.length) {
        qnaStore.setWordMeaningEnabled(false);
        qnaStore.setViewMeaningBtnVisible(false);
      }
      initializeAudioSection(qnaStore.currentQuestion);
      break;
    case 'view_passage':
      qnaStore.isReadPassageBtnVisible = false;
      qnaStore.isViewQuestionBtnVisible = true;
      qnaStore.enableViewQuestionButton = true;
      if (qnaStore.wordMeaningData.length) {
        qnaStore.setViewMeaningBtnVisible(true);
        qnaStore.setViewWordMeaningEnabled(true);
        qnaStore.setWordMeaningEnabled(false);
      }
      audioCleanup();
      break;
    case 'view_word_meaing':
      qnaStore.isReadPassageBtnVisible = true;
      qnaStore.setWordMeaningEnabled(true);
      qnaStore.setViewMeaningBtnVisible(false);
      break;

    default:
      break;
  }
}