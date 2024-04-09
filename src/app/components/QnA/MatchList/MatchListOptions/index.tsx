import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { MatchQuestion, MatchAnswer } from '@components';
import styles from './indexCss';

const MatchListOptions = props => {
  const { response } = props;
  const [optionItems, set_Options] = useState();
  const [stemsItems, set_Stems] = useState();

  useEffect(() => {
    const options = response?.response?.choices && response?.response?.choices.map((item, index) => {
      item.index = index;
      item.isImage = item.value.indexOf('img') > 0;
      return item;
    });

    const stems = response?.stems && response?.stems.map((item, index) => {
      item.isImage = options[index]?.isImage;
      return item;
    });
    set_Options(options);
    set_Stems(stems)
  }, [])

  return (
    <View style={styles.matchQuestionContainer}>
      <View style={styles.boxMargin}>
        {stemsItems && stemsItems.map((item, index) => {
          return <MatchQuestion key={`matchQuestion${index}`} item={item} index={index} />;
        })}
      </View>
      <View>
        {optionItems && optionItems.map((item, index) => {
          return <MatchAnswer key={`matchAnswer${index}`} item={item} index={index} drag={() => { console.log('drag match ans'); }} />;
        })}
      </View>
    </View>
  );
};

MatchListOptions.propTypes = {};

MatchListOptions.defaultProps = {};

export default MatchListOptions;
