import React from 'react';
import { View } from 'react-native';
import {
  Clock,
  CorrectAnswer,
  WrongAnswer,
  TimedTest,
  ActivityTest,
} from '@images';
import { BalooThambiRegTextView, SourceSansProBoldTextView } from '@components';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import { useLanguage } from '@hooks';
import { replaceString } from '@utils';

const QuestionCard = props => {
  const {
    response,
    seqNum,
    permissions,
  } = props;

  const { topicTrailsStore } = useStores();

  const { questionText, timeTakenText, conceptText, questionTextPlural } = useLanguage();

  let concept = response.concept;
  let questionNumber = response.contentSeqNum;
  let timeTaken = response.userAttemptData && response.userAttemptData.timeTaken;
  let isCorrect = response.userAttemptData && response.userAttemptData.result === 'pass';

  let AnswerStatusSvg = CorrectAnswer;

  if (!isCorrect) {
    AnswerStatusSvg = WrongAnswer;
  }

  let Qtag = null;

  switch (response.contentMode) {
    case 'TimedTest':
      Qtag = TimedTest;
      break;
    case 'Activity':
      Qtag = ActivityTest;
      break;
    default:
      break;
  }

  const { userAttemptData } = response;

  return (
    <View key="container" style={styles.container}>
      <View key="questionContainer" style={styles.innerContainer}>
        <View style={styles.qTagContainer}>
          <Qtag />
        </View>
        <View style={styles.questionTimeTakenContainer}>
          <View style={styles.questionContainer}>
            <SourceSansProBoldTextView style={styles.questionText}>
              {`${questionText} ${seqNum ? seqNum : questionNumber}`}
            </SourceSansProBoldTextView>
            {permissions.correct && permissions.wrong && (
              <AnswerStatusSvg
                width={styles.questionSvg.width}
                height={styles.questionSvg.height}
              />
            )}
          </View>
          {permissions.timeTaken && (
            <View style={styles.timeContainer}>
              <Clock
                width={styles.timeSvg.width}
                height={styles.timeSvg.height}
                style={styles.timeSvg}
              />
              <BalooThambiRegTextView styles={styles.timeText}>
                {`${timeTakenText} ${timeTaken} sec`}
              </BalooThambiRegTextView>
            </View>
          )}
        </View>
        {topicTrailsStore.topicDetails && (
          <SourceSansProBoldTextView style={styles.topicText}>
            {topicTrailsStore.topicDetails.topicName}
          </SourceSansProBoldTextView>
        )}
        <BalooThambiRegTextView style={styles.conceptText}>
          {replaceString(conceptText, 'concept', ` ${concept}`)}
        </BalooThambiRegTextView>
      </View>
      {userAttemptData && userAttemptData.totalQuestion && userAttemptData.accuracy != null ?
        (<View style={styles.statsContainer}>
          <BalooThambiRegTextView style={styles.conceptText}>
            {`${userAttemptData.totalQuestion} ${questionTextPlural} ${userAttemptData.accuracy}%`}
          </BalooThambiRegTextView>
        </View>) : null}
    </View>
  );
};

QuestionCard.propTypes = {};

QuestionCard.defaultProps = {
  showAns: true,
  showTimeTaken: true,
  showAnswerStatus: true,
};

export default React.memo(QuestionCard);
