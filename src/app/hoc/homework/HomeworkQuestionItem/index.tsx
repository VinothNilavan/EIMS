// External Imports
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Internal Imports
import { StarAdd, CorrectAnswer, WrongAnswer, Clock } from '@images';
import { Question, getNewHtmlTemplate } from '@hoc';
import { SourceSansProBoldTextView, HomeworkInstruction } from '@components';
import styles from './style';
import Footer from './Footer';
import { useLanguage } from '@hooks';
import PropTypes from 'prop-types';

const HomeworkQuestionItem = props => {
  const { testID, response, howIDid, permissions, fromCommonReport } = props;
  const [questionContent, setQuestionContent] = useState('');

  const questionData = response?.data;

  const { subjectiveText, questionText, timeTakenText } = useLanguage();
  let type = questionData?.template; //MCQ/Blank/Dropdown/Blank_Dropdown/Interactive
  let questionNumber = response.contentSeqNum;
  let timeTaken = questionData?.timeTake;
  let explanation = questionData?.explanation;

  useEffect(() => {
    if (fromCommonReport) {
      setQuestionContent(getNewHtmlTemplate(response));
    }
  }, []);


  const getStatus = () => {
    let isCorrect = questionData?.userResult && questionData?.userResult === 'pass';

    if (questionData?.template == 'TextInteraction') {
      return (
        <SourceSansProBoldTextView style={styles.notAttempted}>
          {subjectiveText}
        </SourceSansProBoldTextView>
      );
    }

    let AnswerStatusSvg = isCorrect ? CorrectAnswer : WrongAnswer;
    return (
      <AnswerStatusSvg
        width={styles.generic.questionSvg.width}
        height={styles.generic.questionSvg.height}
      />
    );
  };

  const renderInstructionView = baseInstructionView(questionData);

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={styles.generic.container}>
      <View key="questionContainer" style={styles.generic.innerContainer}>
        <View style={styles.generic.questionTimeTakenContainer}>
          <View style={styles.generic.questionContainer}>
            <SourceSansProBoldTextView
              testID="HomeWorkQuestionTextAndNumber"
              style={styles.generic.questionText}>
              {`${questionText} ${questionNumber}`}
            </SourceSansProBoldTextView>
            {permissions.correct && permissions.wrong && getStatus()}
          </View>
          {permissions.timeTaken && (
            <View style={styles.generic.timeContainer}>
              <Clock
                accessible={true}
                testID="HomeWorkQuestionClockImg"
                accessibilityLabel="HomeWorkQuestionClockImg"
                width={styles.generic.timeSvg.width}
                height={styles.generic.timeSvg.height}
                style={styles.generic.timeSvg}
              />
              <BalooThambiRegTextView
                testID="HomeWorkQuestionTimeTaken"
                styles={styles.generic.timeText}>
                {`${timeTakenText} ${timeTaken} sec`}
              </BalooThambiRegTextView>
            </View>
          )}
        </View>
        {renderInstructionView()}
        {fromCommonReport ? questionContent :
          <Question
            testID="QuestionHomeworkQuestionItem"
            accessible
            style={styles.generic.questions}
            userAnswer={
              type === 'MCQ'
                ? response?.userAttemptData?.userResponse?.mcqPattern?.userAnswer
                : 0
            }
            question={questionData}
            qresponse={response}
            showAns={howIDid}
            permissions={permissions}
          />
        }
      </View>
      <Footer
        testID="FooterHomeworkQuestionItem"
        type={type}
        explanation={explanation}
        response={response}
        howIDid={howIDid}
        enableExplaination={permissions?.viewExplanation}
      />
      <View style={styles.generic.star}>
        {permissions.removeButton && showStarQues && (
          <StarSvg
            accessible={true}
            testID="HomeworkQuestionItemStarSvg1"
            accessibilityLabel="HomeworkQuestionItemStarSvg1"
            width={styles.generic.starSvg.width}
            height={styles.generic.starSvg.height}
            onPress={onPressStar}
          />
        )}
        {permissions.starredQuestions && showStarQues && (
          <StarSvg
            accessible={true}
            testID="HomeworkQuestionItemStarSvg2"
            accessibilityLabel="HomeworkQuestionItemStarSvg2"
            width={styles.generic.starSvg.width}
            height={styles.generic.starSvg.height}
            onPress={onPressStar}
          />
        )}
      </View>
    </View>
  );
};

HomeworkQuestionItem.propTypes = {
  testID: PropTypes.string,
};

HomeworkQuestionItem.defaultProps = {
  testID: 'HomeworkQuestionItem',
  showAns: true,
  showTimeTaken: true,
  showAnswerStatus: true,
  howIDid: true,
  StarSvg: StarAdd,
};

export default React.memo(HomeworkQuestionItem);

const baseInstructionView = (questionData: any) => {
  return () => {
    const questionInstruction = questionData?.instructorStimulus?.value;
    if (questionInstruction &&
      typeof questionInstruction !== 'undefined' &&
      questionInstruction !== '') {
      return (
        <HomeworkInstruction
          instruction={questionInstruction}
          containerStyle={styles.generic.instructionContainer} />
      );
    }
    return <View />;
  };
}