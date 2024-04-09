import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StarAdd, CorrectAnswer, WrongAnswer } from '@images';
import { Question, getNewHtmlTemplate } from '@hoc';
import { SourceSansProBoldTextView } from '@components';
import { useLanguage } from '@hooks';
import styles from './indexCss';
import PropTypes from 'prop-types';
import Footer from './Footer';

const QuestionItem = props => {
  const { testID, response, howIDid, permissions, fromCommonReport } = props;
  const { notAttemptedLabel, questionText } = useLanguage();
  const [questionContent, setQuestionContent] = useState('');

  const questionData = response.data;
  let type = questionData?.template;
  let questionNumber = response.contentSeqNum;

  const getStatus = () => {
    let isCorrect = response.userAttemptData && response.userAttemptData.result === 'pass';

    if (!isCorrect && !response.userAttemptData.userResponse) {
      return (<SourceSansProBoldTextView style={styles.notAttempted}> {notAttemptedLabel} </SourceSansProBoldTextView>);
    }

    let AnswerStatusSvg = isCorrect ? CorrectAnswer : WrongAnswer;
    return (<AnswerStatusSvg width={styles.generic.questionSvg.width} height={styles.generic.questionSvg.height} />);
  };

  useEffect(() => {
    if (fromCommonReport) {
      setQuestionContent(getNewHtmlTemplate(response));
    }
  }, []);

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} key="container" style={styles.generic.container}>
      <View key="questionContainer" style={styles.generic.innerContainer} pointerEvents={type === 'MCQ' ? 'none' : 'auto'}>
        <View style={styles.generic.questionTimeTakenContainer}>
          <View style={styles.generic.questionContainer}>
            <SourceSansProBoldTextView testID="WorksheetQuestionItemQuestionText" style={styles.generic.questionText}>
              {`${questionText} ${questionNumber}`}
            </SourceSansProBoldTextView>
            {permissions.correct && permissions.wrong && getStatus()}
          </View>
        </View>
        {fromCommonReport ? questionContent :
          <Question
            testID="QuestionWorksheetQuestionItem"
            style={styles.generic.questions}
            userAnswer={ type === 'MCQ' ? response.userAttemptData?.userResponse?.mcqPattern?.userAnswer : 0 }
            question={questionData}
            qresponse={response}
            showAns={howIDid}
            permissions={permissions}
          />}
      </View>

      <Footer
        testID="FooterWorksheetQuestionItem"
        type={type}
        userAttemptData={response.userAttemptData}
        qdata={response?.data?.response}
        response={response}
        howIDid={howIDid}
      />
    </View>
  );
};

QuestionItem.propTypes = {
  testID: PropTypes.string
};

QuestionItem.defaultProps = {
  showAns: true,
  showTimeTaken: true,
  showAnswerStatus: true,
  howIDid: true,
  StarSvg: StarAdd,
};

export default React.memo(QuestionItem);
