import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './style';
import { BalooThambiRegTextView, RobotoRegTextView } from '@components';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';

const CorrectMultiSelectMCQ = props => {
  const { response: responseobj } = props;
  let { responseValidation, response } = responseobj;
  const { uiStore } = useStores();
  const [correctAnswersResponse, setCorrectAnswersResponse] = useState([]);
  const isRTL = uiStore.isRTL;

  const { correctAnswerText } = useLanguage();

  useEffect(() => {
    let identifier = responseValidation?.validResponse?.identifier;
    let options = response?.mcqPattern?.choices.map((item, index) => {
      item.index = index;
      return item;
    });

    const correctAnswer = identifier?.map(item => {
      return options.find(option => option.identifier === item);
    });
    setCorrectAnswersResponse(correctAnswer);
  }, []);

  return correctAnswersResponse && correctAnswersResponse.length > 0 ? (
    <View style={[isRTL ? styles.RTLAnswerContainer : styles.answerContainer]}>
      <BalooThambiRegTextView style={styles.text}> {correctAnswerText} </BalooThambiRegTextView>
      <View style={styles.optionContainer}>
        {correctAnswersResponse.map((answer, indexID) => {
          let option = String.fromCharCode(answer.index + 65);
          option = indexID !== correctAnswersResponse.length - 1 ? option + ', ' : option;
          return (<RobotoRegTextView key="correctAnswerOptions" style={styles.optionText}> {option} </RobotoRegTextView>);
        })}
      </View>
    </View>
  ) : null;
};

CorrectMultiSelectMCQ.propTypes = {
  response: PropTypes.object,
  data: PropTypes.array,
};

CorrectMultiSelectMCQ.defaultProps = { data: [] };

export default CorrectMultiSelectMCQ;