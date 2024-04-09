import React, {Fragment,useEffect,useState} from 'react';
import {View} from 'react-native';
import {Base64} from 'js-base64';
import styles from './style';
import {MyAutoHeightWebView} from '@components';
import {useStores} from '@mobx/hooks';
import getHtmlTemplate from '@utils/getHtmlTemplate';

const SortListCorrectAnswer = props => {
  const store = useStores();
  const [dataAvailable,set_dataAvailable]=useState(false);
  const [CorrectAnswerBody,set_CorrectAnswerBody]=useState([]);
  const {response: responseobj, questionType} = props;
  let {responseValidation, response} = responseobj;
  let identifier = responseValidation?.validResponse?.identifier;

  const isRTL = store.uiStore?.isRTL;

  useEffect(() => {
    let renderAns = configAnswers(identifier, response);
    let correctAnswerBody = questionType === 'word' ? renderAns.join('') : renderAns.join('&nbsp;');
    correctAnswerBody = getHtmlTemplate(correctAnswerBody, false, isRTL);
    set_CorrectAnswerBody(correctAnswerBody);
    set_dataAvailable(true);
  },[]);
  
  return (
    <Fragment>
      <View style={[styles.container,{minHeight:50},isRTL ? styles.RTLContainer : '']}>
        {dataAvailable && 
          <MyAutoHeightWebView
            style={styles.webviewContainer}
            onSizeUpdated={size => {
              console.log(size.height);
            }}
            source={{html: CorrectAnswerBody}}
            zoomable={false}
          />}
      </View>
    </Fragment>
  );
};

export default SortListCorrectAnswer;

const configAnswers = (identifier, response) => {
  let renderAns = [];
  for (let key in identifier) {
    let rightAnswer = response?.choices.find(choiceItr => {
      let decodeValidResponse = Base64.isValid(identifier[key]) ? Base64.decode(identifier[key]) : `${identifier[key]}`;
      let decodeOptionIdentifier = Base64.isValid(choiceItr?.identifier) ? Base64.decode(choiceItr?.identifier) : `${choiceItr?.identifier}`;
      if (decodeValidResponse.indexOf(decodeOptionIdentifier) !== -1) {
        return choiceItr;
      }
    });
    renderAns.push(rightAnswer?.value);
  }
  return renderAns;
}

