// External Imports
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { useToast } from 'native-base';
import { useLanguage } from '@hooks';

// Internal Imports
import {
    RoundedButton,
    NewMessageModal,
    SuccessPopup,
    HomeworkInstruction,
    CommonHeader
} from '@components';
import { HigherMessage } from '@images';
import styles from './style';
import { API } from '@api';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useQnA } from '@hooks';
import { QnAScreen, HomeworkTimedModal } from '@hoc';
import { getWp, getHp, screenLogging } from '@utils';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { HeaderType } from '../../../utils/helper';

const HomeworkQnAScreen = props => {
    const store = useStores();
    const auth = useContext(AuthContext);

    const { submitText, pleaseCompleteAllQuestion, nextText, msgSuccessText } = useLanguage();

    const { qnaStore, appStore } = useStores();
    const [showMessage, setShowMessage] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [confirmationDialog, showConfirmationDialog] = useState(false);
    const [submitDialog, showSubmitDialog] = useState(false);
    const Toast = useToast();
    const permissions =
        Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.homeworkQuestion : {};

    const questionPermissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.question : {};

    const {
        submitFunction,
        enableScroll,
        renderCSHtmlView,
        scrollViewRef,
        renderQuestionsItem,
        reset,
        timerRef,
        parentScrollRef,
        renderHomeworkSolutionView,
        playSound,
        showInsStVO,
        qBodyVoiceOver,
        initializeAudioSection,
        pauseAudio,
        showQuesVO
    } = useQnA('HOMEWORK_EDICINE');

    useBackHandler(() => {
        showConfirmationDialog(true);
    });

    useEffect(() => {
        if (store.uiStore.closeQnA) {
            props.navigation.replace(ScreenNames.HomeworkListScreen);
            store.uiStore.closeQnA = false;
        }
    }, [store.uiStore.closeQnA]);


    useEffect(() => {
        reset();
        fetchContent();
        crashLog();
    }, []);

    const crashLog = () => {
        screenLogging("HomeworkQnAScreen", appStore?.userData);
    }

    const fetchContent = async () => {
        let req = { body: {}, store: store };
        const response = await API(ApiEndPoint.FETCH_HOMEWORK, req);
        if (response?.data?.resultCode === 'C001') {
            await reset();
            qnaStore.init(response?.data);
            if (questionPermissions.audio) {
                initializeAudioSection(response?.data?.contentData?.data[0]);
            }
        } else if (response?.data?.resultCode == 'C004' && response?.data?.redirectionCode == 'CloseContent') {
            props.navigation.goBack();
        } else {
            store.uiStore.apiErrorInit({ code: response.status, message: response?.data?.resultMessage });
            props.navigation.replace(ScreenNames.HomeworkListScreen);
        }
    };

    const quitHomework = async () => {
        try {
            showSubmitDialog(false);
            const req = {
                store: store,
                body: {
                    homeworkId: qnaStore?.homeworkID,
                }
            };

            const response = await API(ApiEndPoint.QUIT_HOMEWORK, req);
            if (response.data.resultCode === 'C004') {
                if (response.data.redirectionCode === 'HomeworkSessionReport') {
                    props.navigation.replace(ScreenNames.HomeworkSummaryScreen);
                } else if (response.data.redirectionCode === 'ContentPage') {
                    props.navigation.replace(ScreenNames.HomeworkSummaryScreen);
                }
            } else {
                store.uiStore.apiErrorInit({
                    code: response.status,
                    message: response?.data?.resultMessage,
                });
            }
        } catch (ex) {
            console.log('Quit Homework API Error', ex);
        }
    }

    const CallSubmitFunctionApi = (isFromNextButton = false) => {
        if (store.uiStore.isApiCalled == false) {
            submitFunction({}, isFromNextButton);
            store.uiStore.setIsApiCalled(true);
            store.uiStore.setIsClicked(true);
        }
    }
    const renderHeader = () => {
        return (
            <CommonHeader
                testID="WorksheetQnAHeaderHomeworkQnA"
                onPressBtn={() => {
                    pauseAudio();
                    showConfirmationDialog(true)
                }}
                onPaginationItemPressed={CallSubmitFunctionApi}
                permissions={permissions}
                headerType={HeaderType.worksheet}
            />
        );
    };

    const renderBottomButtons = () => {
        return (
            <View key="btm_buttons" style={styles.bottomBtnContainer}>
                <View style={styles.bottomLeftButtonContainer}>
                    {permissions.comment && (
                        <HigherMessage
                            accessible={true}
                            testID="HomeworkQnAHigherMessageBtn"
                            accessibilityLabel="HomeworkQnAHigherMessageBtn"
                            onPress={() => {
                                setShowMessage(true);
                            }}
                            height={getWp(48)}
                            width={getWp(48)}
                        />
                    )}
                </View>
                <RoundedButton
                    testID="RoundedButtonHomeworkQnASubmitBtn"
                    type={qnaStore.isSubmitEnabled ? 'squareOrange' : 'squareDisabled'}
                    text={submitText}
                    textStyle={styles.bottomBtnText}
                    width={getWp(145)}
                    height={getHp(48)}
                    onPress={() => {
                        if (qnaStore.isSubmitEnabled) {
                            auth.trackEvent('mixpanel', MixpanelEvents.HOMEWORK_SUBMIT, { "Category": MixpanelCategories.HOMEWORK, "Action": MixpanelActions.CLICKED, "Label": '' });
                            showSubmitDialog(true);
                        } else {
                            if (!Toast.isActive(26)) {
                                Toast.show({ id: 26, description: pleaseCompleteAllQuestion });
                            }
                        }
                    }}
                />
                <RoundedButton
                    testID="RoundedButtonHomeworkQnANextBtn"
                    type="hintBlue"
                    text={nextText}
                    textStyle={styles.bottomBtnText}
                    width={getWp(145)}
                    height={getHp(48)}
                    onPress={() => { CallSubmitFunctionApi(true) }}
                />
            </View>
        );
    };

    const getParams = () => {
        let data = {
            contentDetails: {
                contentType: qnaStore?.contentData?.contentType,
                context: qnaStore?.currentQuestion?.langCode,
                revisionNo: qnaStore?.currentQuestion?.revisionNo,
                contentSeqNum: qnaStore?.contentData?.contentSeqNum,
                contentAttempted: Boolean(qnaStore?.userResponse),
            },
            contentID: qnaStore?.contentData?.contentId,
        };

        return data;
    };

    const renderInstructionView = () => {
        const questionInstruction = qnaStore?.currentQuestion?.instructorStimulus;
        if (questionInstruction && typeof questionInstruction !== 'undefined' && questionInstruction !== '') {
            return <HomeworkInstruction testID="HomeworkInstructionHomeworkQnA" instruction={questionInstruction.value} />;
        }
        return <View />
    }

    return (
        <QnAScreen
            testID="QnAScreenHomeworkQnA"
            renderHeader={renderHeader}
            renderBottomButtons={renderBottomButtons}
            parentScrollRef={parentScrollRef}
            enableScroll={enableScroll}
            scrollViewRef={scrollViewRef}
            renderQuestionsItem={renderQuestionsItem}
            renderCSHtmlView={renderCSHtmlView}
            qnaStore={qnaStore}
            playSound={playSound}
            showInsStVO={showInsStVO}
            qBodyVoiceOver={qBodyVoiceOver}
            showQuesVO={showQuesVO}
            renderHomeworkSolutionView={renderHomeworkSolutionView}
            renderHomeworkInstructionView={renderInstructionView}
            timerRef={timerRef}>
            <NewMessageModal
                testID="NewMessageModalHomeworkQnA"
                isVisible={showMessage}
                pageId={'workSheetsPage'}
                params={getParams()}
                onSuccess={() => {
                    setShowMessage(false);
                }}
                onHide={() => {
                    setShowSuccessPopup(true);
                }}
                onclose={() => {
                    setShowMessage(false);
                }}
            />
            <SuccessPopup
                testID="SuccessPopupHomeworkQna"
                isVisible={showSuccessPopup}
                text={msgSuccessText}
                onPress={() => {
                    setShowSuccessPopup(false);
                }}
            />
            <HomeworkTimedModal
                isVisible={confirmationDialog}
                homework={qnaStore?.homeworkInfo}
                onPress={() => showConfirmationDialog(false)}
                onCompleteLater={() => {
                    auth.trackEvent('mixpanel', MixpanelEvents.HOMEWORK_DONE, { "Category": MixpanelCategories.HOMEWORK, "Action": MixpanelActions.CLICKED, "Label": '' });
                    showConfirmationDialog(false);
                    props.navigation.replace(ScreenNames.HomeworkListScreen)
                }}
            />
            <HomeworkTimedModal
                isVisible={submitDialog}
                submitHwModal={true}
                homework={qnaStore?.homeworkInfo}
                onPress={() => showSubmitDialog(false)}
                onCompleteLater={() => {
                    showSubmitDialog(false)
                    quitHomework()
                }}
                testID="ConfirmationDialogHomeworkQnAHwWillBeSubmitedText"
            />
        </QnAScreen>
    );
}

HomeworkQnAScreen.propTypes = {};

HomeworkQnAScreen.defaultProps = {};

export default observer(HomeworkQnAScreen);