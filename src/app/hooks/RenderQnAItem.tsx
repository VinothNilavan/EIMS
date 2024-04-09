import { useStores } from '@mobx/hooks';
import React from 'react';
import { View } from 'react-native';
import { QTypes } from '../helpers/index';
import { getHp, createValidURL } from '@utils';
import { runInAction } from 'mobx';

import {
    MCQ, BLANK, MultiSelectMCQ, Ordering, MatchList, Classification,
    SortList, BlankDropdown, InteractiveN, Game, Dropdown,
    TextInteraction
} from '@components';

export const renderQnAItem = templateType => {
    const store = useStores();
    const { qnaStore } = store;
    switch (templateType.toLowerCase()) {
        case QTypes.MCQ:
            if (qnaStore?.multiResponse === 'true' || qnaStore?.multiResponse === true) {
                return (
                    <MultiSelectMCQ
                        ref={questionRef}
                        selectedChoice={qnaStore?.inputData}
                        setSelectedChoices={data => {
                            console.log('DATA Selected True:', JSON.stringify(data));
                            runInAction(() => { qnaStore.inputData = data; });
                            qnaStore.setSelectedChoice(data);
                        }}
                        questionData={qnaStore.currentQuestion}
                        dragCallback={() => { console.log(`MMcq`) }}
                        onSoundBtnClicked={data => { playSound('multiSelectMCQVO', createValidURL(data)); }}
                    />
                );
            } else {
                return (
                    <MCQ
                        ref={questionRef}
                        lockOptions={lockOptions}
                        selectedChoice={qnaStore.selectedChoice}
                        setSelectedChoice={data => { qnaStore.setSelectedChoice(data); }}
                        isScreeningTest={screenType == SCREEN_TEST ? true : false}
                        isWorkOrHomeWorkTest={screenType == WORKSHEET_EDICINE || screenType == HOMEWORK_EDICINE ? true : false} questionData={qnaStore.currentQuestion}
                        submitQuestion={submitFunction}
                        trueSelectionMcq={data => trueSelectionMcq(data)}
                        falseSelectionMcq={data => falseSelectionMcq(data)}
                        dragCallback={status => { console.log(`MCQ`) }}
                    />
                );
            }
        case QTypes.Blank:
            return (
                <BLANK
                    webref={webref}
                    questionRes={qnaStore.contentData}
                    onWebViewCallback={onWebViewMessage}
                    showHint={screenType == SCREEN_TEST || screenType == WORKSHEET_EDICINE ? false : qnaStore.isHintVisible}
                    dragCallback={dragAndDropCallback}
                    userResponse={qnaStore.userResponse}
                    disableWebView={disableWebView}
                />
            );
        case QTypes.BlankDD:
            return (
                <BlankDropdown
                    webref={webref}
                    questionRes={qnaStore.contentData.data[0].questionBody}
                    responses={qnaStore.contentData.data[0].response}
                    onWebViewCallback={onWebViewMessage}
                    showHint={screenType == SCREEN_TEST || screenType == WORKSHEET_EDICINE ? false : qnaStore.isHintVisible}
                    disableWebView={disableWebView}
                    setInputResponse={setInputResponseHandler}
                    screenType={screenType}
                />
            );
        case QTypes.Dropdown:
            return (
                <Dropdown
                    webref={webref}
                    questionRes={qnaStore.contentData.data[0].questionBody}
                    responses={qnaStore.contentData.data[0].response}
                    userAttemptResponse={qnaStore.contentData.contentParams?.userAttemptData?.userResponse}
                    hintsList={qnaStore.contentData.data[0].hints}
                    onWebViewCallback={onWebViewMessage}
                    showHint={screenType == SCREEN_TEST || screenType == WORKSHEET_EDICINE ? false : qnaStore.isHintVisible}
                    setInputResponse={setInputResponseHandler}
                    userResponses={qnaStore.userResponse}
                    disableWebView={disableWebView}
                />
            );
        case QTypes.Interactive:
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
        case QTypes.Ordering:
            return (
                <Ordering
                    questionTree={qnaStore.currentQuestion}
                    ref={questionRef}
                    onSoundBtnClicked={playSound}
                    dragAndDropCallback={dragAndDropCallback}
                />
            );
        case QTypes.Matchlist:
            return (
                <MatchList
                    questionTree={qnaStore.currentQuestion}
                    ref={questionRef}
                    dragAndDropCallback={dragAndDropCallback}
                />
            );
        case QTypes.Classification:
            return (
                <Classification
                    questionTree={qnaStore.currentQuestion}
                    ref={questionRef}
                    dragAndDropCallback={classificationDragAndDrop}
                />
            );
        case QTypes.SortList:
            return (
                <SortList
                    questionTree={qnaStore.currentQuestion}
                    ref={questionRef}
                    dragAndDropCallback={dragAndDropCallback}
                    setEnableScroll={() => { console.log(`SortList`) }}
                />
            );

        case QTypes.Game:
        case QTypes.Remedial:
            return (
                <View style={{ alignSelf: 'center', flex: 1, marginTop: getHp(80) }}>
                    <Game
                        image={qnaStore.currentQuestion.thumbImg}
                        title={qnaStore.currentQuestion.name}
                        onPress={() => {
                            if (screenType == 'SEARCH') {
                                navigation.navigate('GamePlayArenaScreen', { file: qnaStore?.currentQuestion?.file });
                            } else {
                                callOpenActivity();
                            }
                        }}
                        isActive={true}
                    />
                </View>
            );
        case QTypes.TextInteraction:
            return (
                <TextInteraction
                    ref={questionRef}
                    questionData={qnaStore?.currentQuestion}
                />
            );
    }
};
