import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  RobotoRegTextView,
  BalooThambiRegTextView,
  MyAutoHeightWebView,
  SourceSansProBoldTextView,
} from '@components';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import { Base64 } from 'js-base64';
import { useLanguage } from '@hooks';

const CorrectMCQ = props => {
  const { response: responseobj, mcqData, isCorrect } = props;

  let { responseValidation, response, encrypted } = responseobj;
  const [DisplayAnswer, setDisplayAnswer] = useState();
  const { correctAnswerTextOther } = useLanguage();

  const [CorrectAnswer, setCorrectAnswer] = useState([]);
  const { uiStore } = useStores();

  useEffect(() => {
    let identifier = responseValidation?.validResponse?.identifier;
    configCorrectAns(identifier, response, setCorrectAnswer);

    if (mcqData) {
      let disAnswer = mcqData?.item?.displayAnswer
      if (disAnswer) {
        setDisplayAnswer(encrypted ? Base64.decode(disAnswer) : disAnswer);
      }
    }
  }, []);

  const isRTL = uiStore.isRTL;

  return (
    <View>
      <View
        key="container"
        style={isRTL ? styles.RTLContainer : styles.container}>
        <BalooThambiRegTextView style={styles.text}>
          {correctAnswerTextOther}
        </BalooThambiRegTextView>
        <View key="optionContainer" style={styles.optionContainer}>
          <RobotoRegTextView style={styles.optionText}>
            {CorrectAnswer && String.fromCharCode(CorrectAnswer[0]?.index + 65)}
          </RobotoRegTextView>
        </View>
      </View>
      {DisplayAnswer && DisplayAnswer !== '' && (
        <View style={{ margin: 16 }}>
          <SourceSansProBoldTextView
            style={
              isRTL ? styles.RTLDisplayAnswerText : styles.displayAnswerText
            }>
            {isCorrect
              ? 'Why you are correct'
              : 'Why you might have gone wrong'}
          </SourceSansProBoldTextView>
          <MyAutoHeightWebView
            style={styles.webViewContainer}
            onMessage={() => { console.log('onMessage'); }}
            customScript={''}
            onSizeUpdated={size => {
              console.log(size.height);
            }}
            source={{ html: DisplayAnswer }}
            zoomable={false}
          />
        </View>
      )}
    </View>
  );
};

CorrectMCQ.propTypes = {
  response: PropTypes.object,
};

CorrectMCQ.defaultProps = {};

export default CorrectMCQ;

const configCorrectAns = (identifier, response, setCorrectAnswer) => {
  try {
    let correctNewAnswer = [];
    let options = response?.mcqPattern?.choices.map((item, index) => {
      item.index = index;
      return item;
    });

    if (identifier && identifier.length > 0) {
      correctNewAnswer = identifier.map(item => {
        return options.find(option => option.identifier === item);
      });
    } else if (response.mcqPattern.correctAnswer && response.mcqPattern.correctAnswer !== '') {
      let index = [Number(Base64.decode(response.mcqPattern.correctAnswer))];
      correctNewAnswer = [options[index]];
    }
    setCorrectAnswer(correctNewAnswer);
  }
  catch (error) {
    console.log('error in correct mcq ', error);
  }
}