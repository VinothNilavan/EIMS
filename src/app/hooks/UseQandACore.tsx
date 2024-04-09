import React from 'react';
import { View } from 'react-native';
import { runInAction } from 'mobx';
import { getHp, createValidURL } from '@utils';
import Generic from '../constants/Generic';
import { ScreenNames } from '@constants';
import {
  MCQ,
  BLANK,
  MultiSelectMCQ,
  BlankDropdown,
  Game,
  Dropdown,
} from '@components';

export const multiMCQ = (questionRef, qnaStore, playSound, screenType) => {
  const getPreAttemtedData = () => {
    try {
      if (qnaStore && Object.keys(qnaStore?.contentData?.contentParams).length > 0 &&
        Object.keys(qnaStore?.contentData?.contentParams?.userAttemptData).length > 0 &&
        qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse &&
        qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse?.mcqPattern && (screenType === Generic.WORKSHEET_EDICINE || screenType === Generic.HOMEWORK_EDICINE)) {
        return qnaStore?.contentData?.contentParams?.userAttemptData?.userResponse?.mcqPattern?.userAnswer;
      }
    } catch (error) {
      console.log(`error for matchlist ${error}`)
    }
    return [];
  }

  return <MultiSelectMCQ
    ref={questionRef}
    selectedChoice={qnaStore?.inputData}
    userResponse={getPreAttemtedData()}
    setSelectedChoices={data => {
      console.log('DATA Selected True:', JSON.stringify(data));
      runInAction(() => { console.log("runInAction qnaStore.inputData 37"); qnaStore.inputData = data; });
      qnaStore.setSelectedChoice(data);
    }}
    questionData={qnaStore.currentQuestion}
    dragCallback={() => { console.log(`Mmcq select`); }}
    onSoundBtnClicked={data => { playSound('multiSelectMCQVO', createValidURL(data)); }}
  />;
}

export const configMCQ = (questionRef, lockOptions, qnaStore, screenType, submitFunction, trueSelectionMcq, falseSelectionMcq) => {
  return <MCQ
    ref={questionRef}
    lockOptions={lockOptions}
    selectedChoice={qnaStore.selectedChoice}
    setSelectedChoice={data => { qnaStore.setSelectedChoice(data); }}
    isScreeningTest={screenType == Generic.SCREEN_TEST}
    isWorkOrHomeWorkTest={screenType == Generic.WORKSHEET_EDICINE || screenType == Generic.HOMEWORK_EDICINE ? true : false}
    questionData={qnaStore.currentQuestion}
    submitQuestion={submitFunction}
    trueSelectionMcq={data => trueSelectionMcq(data)}
    falseSelectionMcq={data => falseSelectionMcq(data)}
    dragCallback={status => { }
    } />;
}

export const configBlank = (webref, qnaStore, onWebViewMessage, screenType, dragAndDropCallback, disableWebView) => {
  return <BLANK
    webref={webref}
    questionRes={qnaStore.contentData}
    onWebViewCallback={onWebViewMessage}
    showHint={screenType == Generic.SCREEN_TEST || screenType == Generic.WORKSHEET_EDICINE ? false : qnaStore.isHintVisible}
    dragCallback={dragAndDropCallback}
    userResponse={qnaStore.userResponse}
    disableWebView={(screenType == Generic.WORKSHEET_EDICINE || screenType == Generic.HOMEWORK_EDICINE) ? false : disableWebView} />;
}

export const configBlankDD = (webref, qnaStore, onWebViewMessage, screenType, disableWebView, setInputResponseHandler) => {
  return <BlankDropdown
    webref={webref}
    questionRes={qnaStore.contentData.data[0].questionBody}
    responses={qnaStore.contentData.data[0].response}
    onWebViewCallback={onWebViewMessage}
    showHint={screenType == Generic.SCREEN_TEST || screenType == Generic.WORKSHEET_EDICINE ? false : qnaStore.isHintVisible}
    disableWebView={disableWebView}
    setInputResponse={setInputResponseHandler}
    screenType={screenType} />;
}

export const configDD = (webref, qnaStore, onWebViewMessage, screenType, setInputResponseHandler, disableWebView) => {
  return <Dropdown
    webref={webref}
    questionRes={qnaStore.contentData.data[0].questionBody}
    responses={qnaStore.contentData.data[0].response}
    userAttemptResponse={qnaStore.contentData.contentParams?.userAttemptData?.userResponse}
    hintsList={qnaStore.contentData.data[0].hints}
    onWebViewCallback={onWebViewMessage}
    showHint={screenType == Generic.SCREEN_TEST || Generic.WORKSHEET_EDICINE ? false : qnaStore.isHintVisible}
    setInputResponse={setInputResponseHandler}
    userResponses={qnaStore.userResponse}
    disableWebView={disableWebView} />;
}
export const configGameRemedial = (qnaStore, screenType, navigation, callOpenActivity) => {
  return <View style={{ alignSelf: 'center', flex: 1, marginTop: getHp(80) }}>
    <Game
      image={qnaStore.currentQuestion.thumbImg}
      title={qnaStore.currentQuestion.name}
      onPress={() => {
        if (screenType == Generic.SEARCH) {
          navigation.navigate(ScreenNames.GamePlayArenaScreen, {
            file: qnaStore?.currentQuestion?.file,
          });
        } else {
          callOpenActivity();
        }
      }}
      isActive={true} />
  </View>;
}
