import React, { useState } from 'react';
import { View } from 'react-native';
import Item from './Item';
import {
  CorretGrey,
  WrongGrey,
  CorrectAnswer,
  WrongAnswer,
} from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';

const Header = props => {
  const [mode, setMode] = useState(props.mode);
  const { uiStore } = useStores();
  const {
    allText,
  } = useLanguage();
  const isRTL = uiStore.isRTL;
  const {
    testID,
    questionCount,
    wrongCount,
    rightCount,
    containerStyle,
    onClick,
  } = props;

  const onPress = modeType => {
    setMode(modeType);
    onClick(modeType);
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={[isRTL ? styles.RTLContainer : styles.container, containerStyle]}>
      <View style={styles.itemContainer}>
        <Item
          testID="ItemHowIDidHeaderAll"
          leftText={allText}
          rightText={questionCount}
          isActive={mode === 'all'}
          onPress={() => onPress('all')}
        />
      </View>
      <View style={styles.itemContainer}>
        <Item
          testID="ItemHowIDidHeaderRight"
          LeftSvg={mode === 'right' ? CorrectAnswer : CorretGrey}
          rightText={rightCount}
          isActive={mode === 'right'}
          onPress={() => onPress('right')}
        />
      </View>
      <View style={styles.itemContainer}>
        <Item
          testID="ItemHowIDidHeaderWrong"
          LeftSvg={mode === 'wrong' ? WrongAnswer : WrongGrey}
          rightText={wrongCount}
          isActive={mode === 'wrong'}
          onPress={() => onPress('wrong')}
        />
      </View>
    </View>
  );
};

Header.propTypes = {
  testID: PropTypes.string,
  questionCount: PropTypes.number.isRequired,
  wrongCount: PropTypes.number.isRequired,
  rightCount: PropTypes.number.isRequired,
  subjectiveCount: PropTypes.number,
  unAttemptedQuestionCount: PropTypes.number,
  containerStyle: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.string,
  hasHomework: PropTypes.bool,
};

Header.defaultProps = {
  testID: 'Header',
  mode: 'all',
  hasHomework: false,
};

export default Header;
