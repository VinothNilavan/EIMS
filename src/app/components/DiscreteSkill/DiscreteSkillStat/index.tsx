/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { SVGImageBackground, BalooThambiRegTextView } from '@components';
import { useLanguage } from '@hooks';

const DiscreteSkillStat = props => {
  const { passageAttempt, questionAttempt, accuracy, isRTL } = props;

  const {
    passagesAttemptedText,
    questionsAttemptedText,
    accuracyText,
  } = useLanguage();

  let accuracyPercentage = (
    <BalooThambiRegTextView style={styles.accuracyVal}>
      {accuracy}
      <BalooThambiRegTextView
        style={{ ...styles.accuracyVal, ...styles.accuracyPerVal }}>
        %
      </BalooThambiRegTextView>
    </BalooThambiRegTextView>
  );

  return (
    <View style={styles.container} key="container">
      <View key="attempt" style={styles.subContainer}>
        <BalooThambiRegTextView style={styles.title}>
          {passagesAttemptedText}
        </BalooThambiRegTextView>
        <View style={styles.svgContainer}>
          <SVGImageBackground
            SvgImage="attempt"
            themeBased
            customContainerStyle={styles.svgBgStyle}
            style={styles.svgStyle}
          />
        </View>
        <BalooThambiRegTextView
          style={{ ...styles.title, ...styles.attemptText }}>
          {passageAttempt}
        </BalooThambiRegTextView>
      </View>
      <View key="attempt" style={styles.subContainer}>
        <BalooThambiRegTextView style={styles.title}>
          {questionsAttemptedText}
        </BalooThambiRegTextView>
        <View style={styles.svgContainer}>
          <SVGImageBackground
            SvgImage="attempt"
            themeBased
            customContainerStyle={styles.svgBgStyle}
            style={styles.svgStyle}
          />
        </View>
        <BalooThambiRegTextView
          style={{ ...styles.title, ...styles.attemptText }}>
          {questionAttempt}
        </BalooThambiRegTextView>
      </View>

      <View key="accuracy" style={styles.subContainer}>
        <BalooThambiRegTextView style={[styles.title, isRTL ? {} : styles.accuractText]}>
          {accuracyText}
        </BalooThambiRegTextView>
        <View style={styles.svgContainer}>
          <SVGImageBackground
            SvgImage="accuracy"
            themeBased
            customContainerStyle={styles.svgBgStyle}
            style={styles.svgStyle}
          />
        </View>
        <BalooThambiRegTextView
          style={{ ...styles.title, ...styles.attemptText }}>
          {accuracyPercentage}
        </BalooThambiRegTextView>
      </View>
    </View>
  );
};

DiscreteSkillStat.propTypes = {
  passageAttempt: PropTypes.number,
  questionAttempt: PropTypes.number,
  accuracy: PropTypes.string,
  isRTL: PropTypes.bool
};

DiscreteSkillStat.defaultProps = {
  passageAttempt: 0,
  questionAttempt: 0,
  accuracy: '0',
  isRTL: false
};

export default DiscreteSkillStat;
