//import liraries
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Mcq from './Qtypes/Mcq';
import Blank from './Qtypes/Blank';
import SortList from './Qtypes/Sortlist';
import ReadOnlyDropdown from './Qtypes/ReadOnlyDropdown';
import Interactive from './Qtypes/Interactive';
import Matchlist from './Qtypes/Matchlist';
import MultiselectMcq from "./Qtypes/MultiselectMcq";
import { QTypes } from '../../helpers';
import TextInteractive from './Qtypes/TextInteractive';
import { OrderingQuestion, BlankDropdown, Classification } from '@components';

const isMultiMCQ = (userAnswer) => {
    // from api Mcq/MMcq are considering as same here after app wil be treating as separate.
    if (userAnswer?.mcqPattern?.userAnswer && (Array.isArray(userAnswer?.mcqPattern?.userAnswer)))
        return true;
    else if (userAnswer?.userAnswer && (Array.isArray(userAnswer?.userAnswer)))
        return true;
    else return false;
}

const classificationDragAndDropEmpty = isLongPressed => { }

const renderQuestion = (questionData, response) => {
    let result;
    let userResponse;
    if (response?.userAttemptData?.result) {
        result = response?.userAttemptData?.result;
    } else if (questionData?.userResult) {
        result = questionData?.userResult;
    }

    if (questionData.userAnswer?.mcqPattern?.userAnswer) {
        userResponse = questionData.userAnswer?.mcqPattern?.userAnswer;
    } else {
        userResponse = response?.userAttemptData?.userResponse
    }

    switch (`${questionData.template}`.toLocaleLowerCase()) {
        case QTypes.MCQ:
            if (isMultiMCQ(questionData?.userAnswer))
                return <MultiselectMcq QuestionData={questionData} result={result} />;
            else
                return <Mcq QuestionData={questionData} result={result} userResponse={userResponse} />;

        case QTypes.Matchlist:
            return <Matchlist QuestionData={questionData} />;

        case QTypes.Blank:
            return <Blank QuestionData={response} />;

        case QTypes.Dropdown:
            return <ReadOnlyDropdown QuestionData={questionData} result={response} />;

        case QTypes.BlankDD:
            return <BlankDropdown questionRes={questionData.questionBody} responses={questionData.response}
                userResponse={userResponse} isReport={true} />;

        case QTypes.Classification:
            return (<Classification questionTree={questionData} questions={response}
                isWorkSheetOrHomeWork={true} dragAndDropCallback={classificationDragAndDropEmpty} isReport={true} />);

        case QTypes.Interactive:
            return <Interactive QuestionData={questionData} />;

        case QTypes.Ordering:
            return questionData?.response?.choices.map((item, index) => {
                return (
                    <OrderingQuestion
                        testID="OrderingQuestionQuestionItem"
                        item={item}
                        index={index}
                        dragType={false}
                        key={`OrderingQuestion${index}`}
                        containerStyle={style.orderOptionContainer}
                        dragAndDropCallback={() => { console.log('drag call back'); }}
                        fromCommonReportScreen={true}
                    />
                );
            });

        case QTypes.SortList:
            return <SortList questionData={response} />;

        case QTypes.TextInteraction:
            return (<TextInteractive QuestionData={response.data} />);
        default: return <Text>Question template cannot be empty</Text>;
    }
}

const getNewHtmlTemplate = (response) => {
    const questionData = response.data;
    return (
        renderQuestion(questionData, response)
    );
};

const style = StyleSheet.create({
    orderOptionContainer: {
        marginLeft: 0,
    }
})
export default getNewHtmlTemplate;