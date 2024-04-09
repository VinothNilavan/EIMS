/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { ApiEndPoint, ScreenNames } from '@constants';
import { screenLogging } from '@utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Orientation from 'react-native-orientation-locker';

import {
    RoundedButton,
    MyAutoHeightWebView,
    SVGImageBackground,
    SuccessPopup,
    BalooThambiBoldTextView,
    NewMessageModal,
} from '@components';

import { HigherMessage, GameBg } from '@images';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { useLanguage, useQnA } from '@hooks';
import { runInAction } from 'mobx';
import styles from './styles';

const GamePlayArenaScreen = props => {
    const { route } = props;
    const store = useStores();
    const { qnaStore } = store;
    const { doneBtnText, skipBtnText, msgSuccessText, closeText, activityTxt } = useLanguage();
    const [shownext_btn, set_shownext_btn] = useState(false);
    const [qUri, setQUri] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const { appStore } = useStores();
    const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.question : {};
    let screenWidth = store.uiStore.initialScreenWidth == 0 ? Dimensions.get('window').width - wp('10') : store.uiStore.initialScreenWidth;
    let screenHeight = store.uiStore.initialScreenHeight == 0 ? Dimensions.get('window').height - hp('5') : store.uiStore.initialScreenHeight;
    const [submitData, setSubmitData] = useState({});
    const [isTopic, setIsTopic] = useState(false);
    const { reset } = useQnA('TOPICS');

    const callFetchContent = async () => {
        try {
            setIsTopic(!props?.route?.params?.data);
            let req = { body: {}, store };
            const res = await API(ApiEndPoint.FETCH_CONTENT_V3, req);
            if (!res.hasOwnProperty('data')) {
                return;
            }
            if (res.data.resultCode == 'C001') {
                if (res?.data?.contentData?.data.length == 0) {
                    store.uiStore.setcontentEmpty(true);
                } else {
                    initializeIFrame(res.data.contentData.data[0].file);
                }

                let contentData = res.data.contentData;

                let data = contentData.data[0];
                let contentInfo = {
                    contentID: contentData.contentId,
                    contentVersionID: data._id,
                    contentType: contentData.contentType,
                    activityType: 'regular',
                    revisionNum: data.revisionNo,
                    langCode: data.langCode,
                };
                let submitInfo = {
                    contentID: contentData.contentId,
                    contentInfo: contentInfo,
                    contentSubMode: contentData.contentSubMode,
                    contentSeqNum: contentData.contentSeqNum,
                };
                setSubmitData(submitInfo);
            } else {
                console.log('RES:', JSON.stringify(res.data));
            }
        } catch (error) {
            console.log(`callFetchContent error ${error}`)
        }
    };

    const submitActivityAttempt = async () => {
        try {
            const submitRequest = { store: store, body: submitData };
            const submitResponse = await API(ApiEndPoint.SUBMIT_ACTIVITY_ATTEMPT_V3, submitRequest);
            if (submitResponse.data.resultCode === 'C001') {
                qnaStore.setNextQuestionData(submitResponse.data);
                runInAction(() => {
                    qnaStore.showExplanation = false;
                    qnaStore.isOpenActivity = false;
                    qnaStore.isSubmitEnabled = true;
                });
                await reset();
                qnaStore.init(qnaStore.nextQuestionRes);
                if (submitResponse?.data?.redirectionData?.endTopicFlag) {
                    qnaStore.activityButtonType = 'done';
                }
                props.navigation.goBack();
            } else if (
                submitResponse.data.resultCode === 'C004' &&
                submitResponse?.data?.redirectionData?.endTopicFlag === true
            ) {
                Orientation.lockToPortrait();
                setQUri('');
                props.navigation.replace(ScreenNames.TopicSummaryScreen);
            } else if (
                submitResponse.data.resultCode === 'C004' &&
                submitResponse?.data?.redirectionData?.endActivityFlag === true
            ) {
                props.navigation.goBack();
            } else {
                store.uiStore.apiErrorInit({
                    code: submitResponse.status,
                    message: submitResponse.data?.resultMessage,
                });
            }
        } catch (error) {
            console.log(`submitActivityAttempt error ${error}`)
        }
    };

    useEffect(() => {
        Orientation.addOrientationListener(onOrientationChangeHandler);
        Orientation.lockToLandscape();
        callFetchContent();

        if (store.uiStore.initialScreenWidth == 0) {
            store.uiStore.setInitialScreenWidth(screenWidth);
        }
        if (store.uiStore.initialScreenHeight == 0) {
            store.uiStore.setInitialScreenHeight(screenHeight);
        }

        let msgString = 'Topic Game screen';

        if (props?.route?.params?.data) {
            msgString = 'Dashboard Game screen';
        }
        screenLogging(msgString, appStore?.userData);

        return () => {
            Orientation.lockToPortrait();
            Orientation.removeOrientationListener(onOrientationChangeHandler);
        };
    }, []);

    useEffect(() => {
        if (store.uiStore.closeQnA) {
            props.navigation.goBack();
            store.uiStore.closeQnA = false;
        }
    }, [store.uiStore.closeQnA]);


    const onOrientationChangeHandler = orientation => {
        if (orientation.includes('LANDSCAPE')) {
            let file = route?.params?.file;
            if (file) {
                initializeIFrame(file);
            }
        }
    };

    const AvtivityTagView = () => {
        return (
            <View style={styles.ActivityViewStyle}>
                <BalooThambiBoldTextView style={styles.ActivityTxtStyle}>
                    {activityTxt}
                </BalooThambiBoldTextView>
            </View>
        );
    };

    const getParams = () => {
        let data = {
            contentDetails: {
                contentType: qnaStore.contentData.contentType,
                context: qnaStore.currentQuestion.langCode,
                revisionNo: qnaStore.currentQuestion.revisionNo,
                contentSeqNum: qnaStore.contentData.contentSeqNum,
                contentAttempted: qnaStore.isNextBtnVisible,
            },
            contentID: qnaStore.contentData.contentId,
        };

        return data;
    };

    const initializeIFrame = file => {
        let qUriTemp = '';
        try {
            qUriTemp = decodeURI(file);
        } catch (err) {
            qUriTemp = file;
        }
        console.log('Game Frame ' + qUriTemp);
        let gameHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
            body {
            font-size:100% !important;
            }
            </style>
        </head>
        <body>
        <div><iframe id='quesInteractive' src='${qUriTemp}' height='${screenWidth}' width='${screenHeight}' scrolling='yes'></iframe></div>
        </body>
        </html>`;
        setQUri(gameHtml);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.ActivityBaseContainer}>
                <SVGImageBackground
                    testID="SVGImageBackgroundGamePlayArena"
                    SvgImage={GameBg}>
                    <View style={{ flex: 1 }}>
                        <MyAutoHeightWebView
                            testID="MyAutoHeightWebViewGamePlayArena"
                            onMessage={props.onWebViewCallback}
                            style={{
                                width: store.uiStore.initialScreenHeight,
                                height: screenHeight,
                                position: 'relative',
                                fontSize: 16,
                            }}
                            onSizeUpdated={size => {
                                console.log(`size`);
                            }}
                            source={{ html: qUri }}
                            zoomable={false}
                            androidLayerType={Platform.OS === 'ios' ? 'software' : 'hardware'}
                            textZoom={100}
                        />
                    </View>
                </SVGImageBackground>
            </View>
            {isTopic ? null : <AvtivityTagView />}
            <View style={styles.ButtonPlayView}>
                <RoundedButton
                    type="squareOrange"
                    text={isTopic ? doneBtnText : closeText}
                    textStyle={styles.ButtonDoneText}
                    containerStyle={styles.ButtonDoneStyle}
                    width={wp('14')}
                    height={wp('14')}
                    onPress={() => {
                        submitActivityAttempt();
                    }}
                />
                {qnaStore?.enableActivitySkipButton && (
                    <RoundedButton
                        testID="RoundedButtonGamePlayArenaSkipBtnText"
                        type="squareOrange"
                        text={shownext_btn ? 'Next' : skipBtnText}
                        textStyle={styles.SkipText}
                        containerStyle={styles.ActiveBtnContainer}
                        width={wp('14')}
                        height={wp('14')}
                        onPress={() => {
                            if (shownext_btn) {
                                submitActivityAttempt();
                            } else {
                                set_shownext_btn(true);
                            }
                        }}
                    />
                )}
                {permissions.comment && (
                    <View style={styles.mrgnRight6}>
                        <HigherMessage
                            onPress={() => {
                                Orientation.lockToPortrait();
                                setShowMessage(true);
                            }}
                            height={styles.bottomLeftSvgSize.height}
                            width={styles.bottomLeftSvgSize.width}
                        />
                    </View>
                )}
            </View>
            <NewMessageModal
                isVisible={showMessage}
                pageId={'contentPage'}
                params={getParams()}
                onSuccess={() => {
                    setShowMessage(false);
                    Orientation.lockToLandscape();
                }}
                onHide={() => {
                    Orientation.lockToPortrait();
                    setShowSuccessPopup(true);
                }}
                onclose={() => {
                    Orientation.lockToLandscape();
                    setShowMessage(false);
                }}
            />
            <SuccessPopup
                isVisible={showSuccessPopup}
                text={msgSuccessText}
                onPress={() => {
                    setShowSuccessPopup(false);
                    Orientation.lockToLandscape();
                }}
            />
        </View>
    );
};

GamePlayArenaScreen.propTypes = {};

GamePlayArenaScreen.defaultProps = {};

export default observer(GamePlayArenaScreen);
