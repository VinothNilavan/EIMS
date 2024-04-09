import React, { Fragment } from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import { BalooThambiRegTextView } from '@components';

import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';

const Footer = props => {
  const { testID, type, userAttemptData, qdata, response } = props;
  const char = 'A';
  const { yourAnswerLabel, correctAnswerText } = useLanguage();

  let showYourAnswer = true;
  let showCorrectAnswer = true;

  const yourAnswerText = yourAnswerLabel;
  const rightAnswerText = correctAnswerText;

  if (userAttemptData.result == 'pass') {
    showYourAnswer = true;
    showCorrectAnswer = true;
  } else {
    showYourAnswer = userAttemptData?.userResponse && true;
    showCorrectAnswer = true;
  }

  const getConcatenatedMcqOptions = (array) => {
    let your_ans = "";
    array.forEach((data, index) => {
      if (index != array.length - 1)
        your_ans = your_ans + String.fromCharCode(char.charCodeAt(0) + parseInt(data)) + ', ';
      else
        your_ans = your_ans + String.fromCharCode(char.charCodeAt(0) + parseInt(data));
    });
    return your_ans;
  };

  const getYourMCQOptions = () => {
    if (userAttemptData?.userResponse?.mcqPattern?.userAnswer != null) {
      return Array.isArray(userAttemptData?.userResponse?.mcqPattern?.userAnswer) ?
        getConcatenatedMcqOptions(userAttemptData?.userResponse?.mcqPattern?.userAnswer) :
        String.fromCharCode(char.charCodeAt(0) + userAttemptData?.userResponse?.mcqPattern?.userAnswer);
    } else {
      return Array.isArray(userAttemptData?.userResponse?.userAnswer) ?
        getConcatenatedMcqOptions(userAttemptData?.userResponse?.userAnswer) :
        String.fromCharCode(char.charCodeAt(0) + userAttemptData?.userResponse?.userAnswer);
    }
  };

  const getCorrectMCQOption = () => {
    if (qdata?.mcqPattern?.correctAnswer != null) {
      return Array.isArray(qdata?.mcqPattern?.correctAnswer) ?
        getConcatenatedMcqOptions(qdata?.mcqPattern?.correctAnswer) :
        String.fromCharCode(char.charCodeAt(0) + qdata?.mcqPattern?.correctAnswer);
    } else {
      return Array.isArray(response?.data?.responseValidation?.validResponse?.identifier) ?
        getConcatenatedMcqOptions(response?.data?.responseValidation?.validResponse?.identifier) :
        String.fromCharCode(char.charCodeAt(0) + response?.data?.responseValidation?.validResponse?.identifier);
    }
  };

  const showAnswer = () => {
    if (type === 'MCQ') {
      return (
        <View style={styles.generic.answerContainer}>
          {showYourAnswer && (
            <View style={styles.generic.answerSubContainer}>
              <BalooThambiRegTextView
                testID="FooterYourAnswerText"
                style={styles.generic.answerHeading}>
                {yourAnswerText}
              </BalooThambiRegTextView>
              <View
                style={[
                  getYourMCQOptions().length > 1 ? styles.generic.optionContainerWithDim : styles.generic.optionContainer,
                  userAttemptData?.result != 'pass' &&
                  styles.generic.optionContainerWrong,
                ]}>
                <BalooThambiRegTextView
                  testID="FooterUserAttemptData"
                  style={[
                    styles.generic.option,
                    userAttemptData?.result != 'pass' &&
                    styles.generic.optionWrong,
                  ]}>
                  {getYourMCQOptions()}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}
          {showCorrectAnswer && (
            <View style={styles.generic.answerSubContainer}>
              <BalooThambiRegTextView testID="FooterUserAttemptData">
                {rightAnswerText}
              </BalooThambiRegTextView>
              <View
                style={[
                  getCorrectMCQOption().length > 1 ? styles.generic.optionContainerWithDim : styles.generic.optionContainer,
                  styles.generic.optionContainerRight,
                ]}>
                <BalooThambiRegTextView
                  testID="FooterUserCorrectAnswer"
                  style={[styles.generic.option, styles.generic.optionRight]}>
                  {getCorrectMCQOption()}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}
        </View>
      );
    } else if (qdata != null) {
      let correct_answers = null;
      switch (type) {
        case 'Blank':
          correct_answers = Object.keys(qdata).map(ans => {
            return qdata[ans]?.correctAnswers.join(', ');
          });
          break;
        case 'Dropdown':
          correct_answers = Object.keys(qdata).map(ans => {
            return qdata[ans].choices[qdata[ans].correctAnswer].value;
          });
          break;
        case 'Blank_Dropdown':
          let template;
          correct_answers = Object.keys(qdata).map(ans => {
            template = qdata[ans].type;
            if (template == 'Blank') {
              return qdata[ans]?.correctAnswers.join(', ');
            } else {
              return qdata[ans].choices[qdata[ans].correctAnswer].value;
            }
          });
          break;
        case 'MatchList':
        case 'SortList':
          correct_answers = Object.keys(response?.data?.responseValidation?.validResponse?.identifier).map(key => {
            let userAnswer = response?.data?.responseValidation?.validResponse?.identifier[key][0];
            return String.fromCharCode(userAnswer + 65);
          });
          break;
        case 'Classification':
          correct_answers = Object.keys(response?.data?.responseValidation?.validResponse?.identifier).map(key => {
            let userAnswer = response?.data?.responseValidation?.validResponse?.identifier[key];
            return userAnswer.map(stem => { return String.fromCharCode(stem + 65); })
          });
          break;
        case 'Ordering':
          correct_answers = Object.keys(response?.data?.responseValidation?.validResponse?.identifier).map(key => {
            let userAnswer = response?.data?.responseValidation?.validResponse?.identifier[key];
            return String.fromCharCode(userAnswer + 65);
          });
        default:
          break;
      }

      if (correct_answers) {
        return (
          <Fragment>
            {showCorrectAnswer && (
              <View style={styles.generic.answerContainer}>
                <BalooThambiRegTextView
                  testID="FooterYourAnswerText"
                  style={styles.generic.answers}>
                  {userAttemptData.result == 'pass' ? yourAnswerText : rightAnswerText}
                  <BalooThambiRegTextView
                    testID="FooterCoorectAns"
                    style={styles.generic.answerVal}>
                    {`: ${correct_answers.join(', ')}`}
                  </BalooThambiRegTextView>
                </BalooThambiRegTextView>
              </View>
            )}
          </Fragment>
        );
      }
    }
    return <View />;
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={styles.generic.container}>
      <View key="innerContainer" style={styles.generic.innerContainer}>
        {showAnswer()}
      </View>
    </View>
  );
};

Footer.propTypes = {
  testID: PropTypes.string,
};

Footer.defaultProps = {
  testID: 'Footer',
};

export default Footer;