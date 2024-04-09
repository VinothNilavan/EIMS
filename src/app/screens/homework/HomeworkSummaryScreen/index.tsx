// External Imports
import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { useStores } from '@mobx/hooks';

// Internal Imports
import styles from './style';
import {
    DetailsScreen,
    SparkieItem,
    BalooThambiRegTextView,
    NumberSquareButton,
    RoundedButton,
} from '@components';
import { ApiEndPoint } from '@constants';
import { API } from '@api';
import { Coin } from '@images';
import { getHp, getWp, replaceString, screenLogging } from '@utils';
import { useLanguage } from '@hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ScreenNames } from '@constants';
import { useBackHandler } from '@react-native-community/hooks';

const HomeworkSummaryScreen = props => {
    const store = useStores();
    const { appStore } = useStores();
    const { sparkieEarnedText, youDidQuestionText, correctText, wrongText, subjectiveText, vieReportBtnText } = useLanguage();

    const [homeworkReport, setHomeworkReport] = useState({});
    const auth = useContext(AuthContext);
    const permissions =
        Object.keys(store.uiStore.menuDataPermissions).length > 0
            ? store.uiStore.menuDataPermissions.homeworkSessionReport
            : {};

    useBackHandler(() => {
        return props.navigation.navigate(ScreenNames.DashboardScreen);
    });


    const crashLog = () => {
        screenLogging("HomeworkSummaryScreen", appStore?.userData);
    }

    useEffect(() => {
        crashLog();
        fetchHomeworkReport();
    }, []);

    const ViewReportClickHandler = () => {
        auth.trackEvent('mixpanel', MixpanelEvents.HOMEWORK_VIEW_SESSION_REPORT, { "Category": MixpanelCategories.HOMEWORK, "Action": MixpanelActions.CLICKED, "Label": '' });
        props.navigation.navigate(ScreenNames.HomeworkReportScreen, { homework: store.qnaStore.homeworkInfo })
    }

    const fetchHomeworkReport = async () => {
        const reqBody = {
            store: store,
            body: {
                homeworkId: store?.qnaStore?.homeworkID,
            }
        }

        try {
            const response = await API(ApiEndPoint.GET_HOMEWORK_SPARKIE_REPORT_V3, reqBody);
            if (response.data.resultCode === 'C001') {
                const homeworkReport = response?.data?.homeworkSparkieSummary;
                setHomeworkReport(homeworkReport);
                if (homeworkReport?.sparky != null && homeworkReport?.sparky != 0) {
                    store.uiStore.setChangedInUserData(true);
                }
            } else {
                store.uiStore.apiErrorInit({
                    code: response.status,
                    message: response.data?.resultMessage,
                });
            }
        } catch (e) {
            console.log(`Homework Reports error>>>${e}`);
        }
    }

    return (
        <DetailsScreen
            testID="DetailsScreenHomeworkSummary"
            headerBtnType="home"
            headerBtnClick={() => props.navigation.navigate(ScreenNames.DashboardScreen)}
            footerContainerStyle={styles.footerContainerStyle}
            showAnimation
            bgName="bgSummary"
            bgFooterName="bgFooterInner"
            animationName="rightSummaryAnimation"
            headerTitle={homeworkReport?.homeworkName}
            svgUrl={homeworkReport?.homeworkIcon}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {permissions.mySparkies && (
                        <SparkieItem
                            testID="HomeworkSummarySparkieItem"
                            title={sparkieEarnedText}
                            value={homeworkReport?.sparky}
                            ImageSVG={Coin}
                            containerStyle={styles.dividerContainer}
                        />
                    )}
                    <BalooThambiRegTextView testID="HomeworkSummaryYouDidQuestionText" style={styles.questionCountText}>
                        {replaceString(youDidQuestionText, 'questions_attempt', homeworkReport?.totalQuestionsAttempted)}
                    </BalooThambiRegTextView>
                    <View style={styles.countContainer}>
                        {permissions.correct && (
                            <NumberSquareButton
                                testID="NumberSquareButtonHomeworkSummaryCorrectText"
                                text={homeworkReport?.totalCorrect}
                                title={correctText}
                                contentStyle={styles.squareNumberContainer}
                            />
                        )}
                        {permissions.wrong && (
                            <NumberSquareButton
                                testID="NumberSquareButtonHomeworkSummaryWrongText"
                                text={homeworkReport?.totalWrong}
                                title={wrongText}
                                contentStyle={styles.squareNumberContainer}
                                containerStyle={styles.wrongSquareContainer}
                            />
                        )}
                        {permissions.subjective && (
                            <NumberSquareButton
                                testID="NumberSquareButtonHomeworkSummarySubjectiveText"
                                text={homeworkReport?.totalSubjective}
                                title={subjectiveText}
                                contentStyle={styles.squareNumberContainer}
                                containerStyle={styles.subjectiveSquareContainer}
                                isLastItem
                            />
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <RoundedButton
                            testID="RoundedButtonHomeworkSummaryViewReportBtnText"
                            onPress={ViewReportClickHandler}
                            width={getWp(180)}
                            height={getHp(60)}
                            textStyle={styles.buttonText}
                            type="elevatedOrange"
                            text={vieReportBtnText}
                        />
                    </View>
                </View>
            </ScrollView>
        </DetailsScreen>
    );
}

HomeworkSummaryScreen.propsTypes = {};

HomeworkSummaryScreen.defaultProps = {};

export default HomeworkSummaryScreen;