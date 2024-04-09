import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';
import { OrderingQuestion } from '@components';
import styles from './style';
import { useStores } from '@mobx/hooks';

const OrderingCorrectAnswer = props => {
  const { response, onSoundBtnClicked } = props;
  let responseValidation = response.hasOwnProperty('data') ? response?.data?.responseValidation : response?.responseValidation;
  const store = useStores();
  const [dataAvailable, set_dataAvailable] = useState(false);
  const [RightAnswers, set_RightAnswers] = useState([]);

  const choices = response.hasOwnProperty('data') ? response?.data?.response?.choices : response?.response?.choices;
  useEffect(() => {
    let identifier = responseValidation?.validResponse?.identifier;
    let rightAnswers = [];
    let options = choices.map((option, index) => {
      option.index = index;
      option.store = store;
      return option;
    });

    identifier?.map(rightAnswerItr => {
      options.map((choiceMap, choiceIndex) => {
        if (rightAnswerItr === choiceMap.identifier) {
          rightAnswers.push({
            ...choiceMap,
          });
        }
      });
    });
    set_RightAnswers(rightAnswers);
    set_dataAvailable(true);
  }, []);

  return (
    dataAvailable &&
    <Fragment>
      <View style={styles.container}>
        {RightAnswers?.map(item => {
            return (
              <OrderingQuestion
                item={item}
                key={`OrderingQuestion${item?.index}`}
                index={item?.index}
                dragType={false}
                onSoundBtnClicked={onSoundBtnClicked}
                isExplaination={true}
              />
            );
          })}
      </View>
    </Fragment>
  );
};

export default OrderingCorrectAnswer;
