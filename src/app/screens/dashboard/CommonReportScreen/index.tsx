//import liraries
import React, { useState } from 'react';
import { View } from 'react-native';
import { WorksheetQuestionItem, QuestionItem, HomeworkQuestionItem } from '@hoc';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import { ReportScreen } from '../../../helpers';
/* eslint-disable react-hooks/exhaustive-deps */
import { DetailsScreen, SelectionPopup } from '@components';
import { useStarQuestion, useLanguage } from '@hooks';

const CommonReportScreen = props => {
    const {
        testID,
        item,
        seqNum,
        permissions,
        screen,
        topicId,
    } = props.route.params;

    const { onStarHandler } = useStarQuestion();
    const {
        attentionPleaseText,
        thisWillRemoveDescText,
        noCancelBtnText,
        yesRemoveBtnText,
    } = useLanguage();

    const [showRemoveFavPopUp, setShowRemoveFavPopUp] = useState(false);

    const onPressStar = () => {
        let itemCopy = item
        console.log('item coopy', item);
        if (itemCopy.isFavourite) {
            setShowRemoveFavPopUp(true);
        } else {
            itemCopy.isFavourite = true;
            let req = {
                conceptID: itemCopy.conceptID,
                topicID: topicId,
                contentInfo: {
                    contentID: itemCopy.contentID,
                    contentVersionID: itemCopy.data._id,
                    version: itemCopy.revisionNo,
                    context: itemCopy.langCode,
                },
            };
            onStarHandler(req, false);
        }
    };

    const onCancelPressHandler = () => {
        setShowRemoveFavPopUp(false);
    };

    const onActionPressHandler = () => {
        let itemCopy = item
        itemCopy.isFavourite = false;
        setShowRemoveFavPopUp(false);
        let req = {
            contentId: itemCopy.contentID,
            topicId: topicId,
        };
        onStarHandler(req, true);
    };

    const navigation = useNavigation();
    const headerBtnClickHandler = () => {
        navigation.goBack();
    }

    const getQuestionItem = () => {
        switch (screen) {
            case ReportScreen.Worksheet:
                return (
                    <WorksheetQuestionItem
                        testID={`WorksheetQuestionItemWorksheetReport${testID}`}
                        response={item}
                        seqNum={seqNum}
                        permissions={permissions}
                        fromCommonReport={true}
                    />
                )
            case ReportScreen.Homework:
                return (
                    <HomeworkQuestionItem
                        testID="HomeworkQuestionItemHomeworkReport"
                        response={item}
                        permissions={permissions}
                        hasHomework={true}
                        fromCommonReport={true}
                    />)
            case ReportScreen.DiscreteSkill:
                return (
                    <QuestionItem
                        response={item}
                        seqNum={item?.contentSeqNum}
                        permissions={permissions}
                        howIDid={true}
                        fromCommonReport={true}
                    />
                )
            case ReportScreen.Topic:
                return (
                    <QuestionItem
                        accessible={true}
                        testID={`HowIDidQuestionCard${item.data._id}`}
                        accessibilityLabel={`HowIDidQuestionCard${item.data._id}`}
                        response={item}
                        permissions={permissions}
                        onPressStar={() => onPressStar()}
                        fromCommonReport={true}
                    />
                )
            default:
                break;
        }
    }

    return (
        <DetailsScreen
            testID="DetailsScreenWorkSheetReport"
            headerBtnType="back"
            headerBtnClick={headerBtnClickHandler}
            headerTitle={"Report Screen"}>
            <View style={{ marginBottom: '15%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}>
                    <View style={{ marginTop: 40 }}>
                        {item && getQuestionItem()}
                    </View>
                </ScrollView>
            </View>
            <SelectionPopup
                testID="SelectionPopupStarredQuestion"
                show={showRemoveFavPopUp}
                svgText={attentionPleaseText}
                desc={thisWillRemoveDescText}
                cancelBtnText={noCancelBtnText}
                actionBtnText={yesRemoveBtnText}
                onCancelPress={onCancelPressHandler}
                onActionPress={onActionPressHandler}
            />
        </DetailsScreen>
    );
};

//make this component available to the app
export default CommonReportScreen;
