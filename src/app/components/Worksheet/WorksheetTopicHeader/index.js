/* eslint-disable react-native/no-inline-styles */
import React, { } from 'react';
import { View } from 'react-native';
import { BalooThambiRegTextView, SVGImageBackground } from '@components';
import { CorrectAnswer, WrongAnswer } from '@images';
import styles from './style';
import PropTypes from 'prop-types';
import { getHp } from '@utils';
import { useLanguage } from '@hooks';

const WorksheetTopicHeader = props => {
  const {
    testID,
    accuracy,
    correct,
    wrong,
    topicList,
    hasHomework,
  } = props;

  const { questionText, questionTextPlural, acuracyText, exerciseWiseSumaryText, topicWiseSumaryText } = useLanguage();
  const getTopicItems = () => {
    let topicItems = [];

    if (topicList !== null && typeof topicList !== 'undefined' && topicList.length > 0) {
      topicList.forEach(item => {
        topicItems.push(
          <View style={styles.topicDetailsContainer}>
            <BalooThambiRegTextView testID="WorkSheetTopicHeaderTopicOrExcercieName" style={styles.topicTitle}>
              {item?.topicName !== null && typeof item?.topicName !== 'undefined'
                ? item?.topicName : item?.exerciseName}
            </BalooThambiRegTextView>
            <View style={styles.itemContainer}>
              {getItem(
                item.totalQuestions,
                null,
                item.totalQuestions !== 1 ? questionTextPlural : questionText,
              )}
              {getItem(item.accuracy, '%', acuracyText)}
            </View>
          </View>,
        );
      });
    }

    return topicItems;
  };

  const getItem = (number, symbol, title) => {
    return (
      <View style={styles.itemStyle}>
        <View style={styles.row}>
          <BalooThambiRegTextView testID="WorkSheetTopicHeaderNumber" style={styles.number}>
            {number}
          </BalooThambiRegTextView>
          {symbol && (
            <BalooThambiRegTextView testID="WorkSheetTopicHeaderSymbol" style={styles.itemTitle}>
              {symbol}
            </BalooThambiRegTextView>
          )}
        </View>
        <BalooThambiRegTextView testID="WorkSheetTopicHeaderTitle" style={[styles.itemTitle, { marginTop: getHp(-5) }]}>
          {title}
        </BalooThambiRegTextView>
      </View>
    );
  };

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={styles.container}>
      <BalooThambiRegTextView testID="WorkSheetTopicHeaderSummaryText" style={styles.title}>
        {hasHomework ? exerciseWiseSumaryText : topicWiseSumaryText}
      </BalooThambiRegTextView>
      <View style={[styles.subContainer]}>
        <View style={styles.accuracyContainer}>
          <View style={styles.svgContainer}>
            <SVGImageBackground
              testID="SVGImageBackgroundWorkSheetTopicHeader"
              SvgImage={'accuracy'}
              themeBased
              style={styles.svgStyle}>
            </SVGImageBackground>
          </View>
          <BalooThambiRegTextView testID="WorkSheetTopicHeaderAccuracyText" style={[styles.text, styles.background]}>
            {` ${accuracy}% ${acuracyText}`}
          </BalooThambiRegTextView>
        </View>
        <View style={[styles.row, { width: '40%' }]}>
          <CorrectAnswer accessible={true} testID="WorkSheetTopicHeaderCorrectAnsImage" accessibilityLabel="WorkSheetTopicHeaderCorrectAnsImage" height={getHp(29)} />
          <BalooThambiRegTextView testID="WorkSheetTopicHeaderCorrect" style={styles.text}>
            {correct}
          </BalooThambiRegTextView>
          <WrongAnswer accessible={true} testID="WorkSheetTopicHeaderWrongAnsImage" accessibilityLabel="WorkSheetTopicHeaderWrongAnsImage" style={styles.marginLeft} height={getHp(29)} />
          <BalooThambiRegTextView testID="WorkSheetTopicHeaderWrong" style={styles.text}>
            {wrong}
          </BalooThambiRegTextView>
        </View>
      </View>
      {getTopicItems()}
    </View>
  );
};

WorksheetTopicHeader.propTypes = {
  testID: PropTypes.string,
  accuracy: PropTypes.number,
  correct: PropTypes.number,
  wrong: PropTypes.number,
  topicList: PropTypes.array,
  hasHomework: PropTypes.bool,
};

WorksheetTopicHeader.defaultProps = {
  testID: 'WorksheetTopicHeader',
  hasHomework: false,
};

export default WorksheetTopicHeader;
