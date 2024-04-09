import React, { Fragment, useRef } from 'react';
import { View } from 'react-native';
import { Base64 } from 'js-base64';
import styles from './style';
import { useStores } from '@mobx/hooks';
import { ClassificationBucket } from '@components';

const ClassificationCorrectAnswer = props => {
  const store = useStores();
  const { response: responseobj, reportPage, withoutWebView } = props;
  let { responseValidation, response, stems, userAnswer } = responseobj;

  responseValidation = configResponseValidation(responseValidation, responseobj);

  stems = configStems(stems, responseobj);

  response = configResponse(response, responseobj);

  let identifier = configIdentifier(responseValidation, reportPage, userAnswer);

  const isRTL = store?.uiStore?.isRTL;

  let { answerArray, stemsArray } = configAnsStempsValues(identifier, stems, response);

  let { container1, container2 } = configContainers(answerArray);

  let bucketRef1 = useRef();
  let bucketRef2 = useRef();

  return (
    <Fragment>
      <View style={isRTL ? styles.RTLContainer : styles.container}>
        {(container1 && container1.length > 0) || reportPage ? (
          <ClassificationBucket
            ref={bucketRef1}
            containerType={'1'}
            data={container1}
            disableClick={true}
            callbackForResetComponent={() => { console.log('call back'); }}
            containerLabel={
              stemsArray && stemsArray.length > 0 && stemsArray[0] ? stemsArray[0].value : ''
            }
            withoutWebView={withoutWebView}
          />
        ) : null}

        {(container2 && container2.length > 0) || reportPage ? (
          <ClassificationBucket
            ref={bucketRef2}
            containerType={'2'}
            data={container2}
            disableClick={true}
            callbackForResetComponent={() => { console.log('call back'); }}
            containerLabel={
              stemsArray && stemsArray.length > 0 && stemsArray[1] ? stemsArray[1].value : ''
            }
            withoutWebView={withoutWebView}
          />
        ) : null}
      </View>
    </Fragment>
  );
};

export default ClassificationCorrectAnswer;

const configResponseValidation = (responseValidation: any, responseobj: any) => {
  if (responseValidation == null) {
    responseValidation = responseobj?.data?.responseValidation;
  }
  return responseValidation;
}

const configResponse = (response: any, responseobj: any) => {
  if (response == null) {
    response = responseobj?.data?.response;
  }
  return response;
}

const configStems = (stems: any, responseobj: any) => {
  if (stems == null) {
    stems = responseobj?.data?.stems;
  }
  return stems;
}

const configContainers = (answerArray: any) => {
  let container1 = [];
  let container2 = [];
  if (answerArray && answerArray.length > 0) {
    container1 = answerArray[0] && answerArray[0].length > 0 ? answerArray[0] : [];
    if (answerArray.length > 1) {
      container2 = answerArray[1] && answerArray[1].length > 0 ? answerArray[1] : [];
    }
  }
  return { container1, container2 };
}

const configAnsStempsValues = (identifier: any, stems: any, response: any) => {
  let stemsArray = [];
  let answerArray = [];
  for (let key in identifier) {
    let stemIdentifier = stems.find(stemItr => stemItr?.identifier === key);
    if (Array.isArray(identifier[key])) {
      let res = response?.choices.filter(el => {
        return identifier[key].some(element => {
          return element === el.identifier;
        });
      });
      answerArray.push(res);
    } else {
      let stemKeysArr = Base64.decode(identifier[key])
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .map(itr => parseInt(itr, 10))
        .map(i => i)
        .map(itr => response?.choices.find(item => Base64.decode(item?.identifier) == itr));
      answerArray.push(stemKeysArr);
    }
    stemsArray.push(stemIdentifier);
  }
  return { answerArray, stemsArray };
}

const configIdentifier = (responseValidation: any, reportPage: any, userAnswer: any) => {
  let identifier = responseValidation?.validResponse?.identifier;
  if (reportPage) {
    identifier = userAnswer?.Classification;
  }
  return identifier;
}
