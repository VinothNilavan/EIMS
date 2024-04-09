import React, { Fragment, useState, useEffect } from 'react';
import { View } from 'react-native';
import { MatchAnswer, MatchQuestion } from '@components';
import styles from './style';
import { Base64 } from 'js-base64';
import { useStores } from '@mobx/hooks';

const MatchListCorrectAnswer = props => {
  const store = useStores();
  const { response: responseobj } = props;
  let { responseValidation, response, stems } = responseobj;
  let identifier = responseValidation?.validResponse?.identifier;

  const [options, setOptions] = useState([]);
  const [stemsList, setStemsList] = useState([]);
  const [Answer, setAnswer] = useState([]);
  const [encrypted, setEncrypted] = useState(false);

  console.log('mathclist stems list set :>> ', stemsList);

  useEffect(() => {
    configOptions(response, store, setOptions);
    setEncrypted(responseobj.encrypted);
  }, [responseobj]);

  useEffect(() => {
    configStemsList(setStemsList, stems, options, store);
  }, [options]);

  useEffect(() => {
    configAns(identifier, options, encrypted, setAnswer);
  }, [stemsList]);

  return (
    <Fragment>
      <View style={store?.uiStore?.isRTL ? styles.RTLContainer : styles.container}>
        <View>
          {stemsList && stemsList.map((item, index) => {
            return (<MatchQuestion item={item} key={`matchQuestion${index}`} index={index} isExplaination={true} />);
          })}
        </View>
        <View style={styles.dragableListContainer}>
          {Answer && Answer.length > 0 && Answer.map((item, index) => {
            return (<MatchAnswer key={`matchAnswer${index}`} item={item} index={index} isExplaination={true} />);
          })}
        </View>
      </View>
    </Fragment>
  );
};

export default MatchListCorrectAnswer;

const configOptions = (response: any, store: any, setOptions: any) => {
  let choicesNew = response?.choices && response?.choices.map((item, index) => {
    item.index = index;
    item.store = store;
    item.isImage = item.value.includes('img')
    return item;
  });
  setOptions(choicesNew);
}

const configAns = (identifier: any, options: any, encrypted: boolean, setAnswer: any) => {
  let ansArr = [];
  for (let key in identifier) {
    let choiceFind = options.find(choiceItr => {
      let decodeValidResponse = encrypted ? Base64.decode(identifier[key]) : identifier[key];
      let decodeOptionIdentifier = encrypted ? Base64.decode(choiceItr?.identifier) : choiceItr?.identifier;
      if (decodeValidResponse.indexOf(decodeOptionIdentifier) != -1) { return choiceItr; }
    });
    ansArr.push(choiceFind);
  }
  setAnswer(ansArr);
}

const configStemsList = (setStemsList: any, stems: any, options: any, store: any) => {
  setStemsList(stems && options && options.length > 0 && stems.map((item, index) => {
    item.isImage = options[index]?.isImage;
    item.store = store;
    return item;
  }));
}