/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';

import {
  SVGImageBackground,
  SimpleLottie,
  BalooThambiRegTextView
} from '@components';

import { ThemeContext } from '@contexts/theme-context';

/**
 * Blue Background remove while developing from the container style
 */
const TopicStat = props => {
  const theme = useContext(ThemeContext);
  const { profileStore } = useStores();
  const { testID, attempt, progress, accuracy, permissions, showProgress } = props;
  const { attemptText, progressLabel, acuracyText } = useLanguage();

  let progressSvg = '';

  progressSvg = configProgressSVG(profileStore.grade, progress);

  const getProgress = () => {
    if (!Number(progress) && progress.includes('/')) {
      const Parray = progress.split('/')
      return ((Parray[0] / Parray[1]) * 100).toFixed(0)
    } else {
      return progress
    }
  }

  if (Number(progress) && progress > 0 && progress < 30) {
    progressSvg = 'progress30';
  } else if (Number(progress) && progress > 30 && progress < 90) {
    progressSvg = 'progress60';
  }




  let accuracyPercentage = (
    <BalooThambiRegTextView style={styles.accuracyVal}>
      -
    </BalooThambiRegTextView>
  );

  if (attempt) {
    accuracyPercentage = (
      <BalooThambiRegTextView style={styles.accuracyVal}>
        {accuracy}
        <BalooThambiRegTextView
          style={{ ...styles.accuracyVal, ...styles.accuracyPerVal }}>
          {profileStore.grade <= 3 ? '' : '%'}
        </BalooThambiRegTextView>
      </BalooThambiRegTextView>
    );
  }

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={styles.container} key="container">
      {permissions.attempt && (
        <View key="attempt" style={styles.subContainer}>
          <BalooThambiRegTextView testID="TopicStatAttemptText" style={styles.title}>
            {attemptText}
          </BalooThambiRegTextView>
          <View style={styles.svgContainer}>
            <SVGImageBackground
              testID="SVGImageBackgroundTopicStatAttempImg"
              SvgImage="attempt"
              themeBased
              customContainerStyle={styles.svgBgStyle}
              style={styles.svgStyle}
            />
          </View>
          <BalooThambiRegTextView
            testID="TopicStatAttempt"
            style={{ ...styles.title, ...styles.attemptText }}>
            {attempt}
          </BalooThambiRegTextView>
        </View>
      )}
      {showProgress ? <View key="progress" style={styles.subContainer}>
        <BalooThambiRegTextView testID="TopicStatProgressLabel" style={styles.title}>
          {progressLabel}
        </BalooThambiRegTextView>
        {getProgress() < 90 && (
          <View style={styles.svgContainer}>
            <SVGImageBackground
              testID="TopicStatSVGImageBackgroundProgressSvg"
              SvgImage={progressSvg}
              themeBased
              customContainerStyle={styles.svgBgStyle}
              style={styles.svgStyle}
            />
          </View>
        )}
        {getProgress() > 90 && (
          <View style={styles.svgContainer}>
            <SimpleLottie
              testID="SimpleLottieTopicStatProgress100"
              jsonFileName="progress100"
              theme={theme.name}
              styles={styles.svgStyle}
            />
          </View>
        )}
        <BalooThambiRegTextView testID="TopicStatProgressPercentage" style={styles.title}>
          {progress}
        </BalooThambiRegTextView>
      </View> : null}
      {permissions.accuracy && (
        <View key="accuracy" style={styles.subContainer}>
          <BalooThambiRegTextView testID="TopicStatAcuracyText" style={styles.title}>
            {acuracyText}
          </BalooThambiRegTextView>
          <View style={styles.svgContainer}>
            <SVGImageBackground
              testID="SVGImageBackgroundTopicStatAccuracySvg"
              SvgImage="accuracy"
              themeBased
              customContainerStyle={styles.svgBgStyle}
              style={styles.svgStyle}
            />
          </View>
          <BalooThambiRegTextView
            testID="TopicStatAccuracyPercentage"
            style={{ ...styles.title, ...styles.attemptText }}>
            {accuracyPercentage}
          </BalooThambiRegTextView>
        </View>
      )}
    </View>
  );
};

TopicStat.propTypes = {
  testID: PropTypes.string,
  attempt: PropTypes.number,
  progress: PropTypes.string,
  accuracy: PropTypes.string,
};

TopicStat.defaultProps = {
  testID: 'TopicStat',
  attempt: 2,
  progress: '91',
  accuracy: '90%',
};

export default TopicStat;

const configProgressSVG = (grade, progress) => {
  let progressSvg = 'progress0';
  if (grade <= 3) {
    if (!Number(progress) && progress.includes('/')) {
      const pArray = progress.split('/');
      const progressNew = ((pArray[0] / pArray[1]) * 100).toFixed(0);
      if (progressNew > 0 && progressNew < 30) {
        progressSvg = 'progress30';
      } else if (progressNew > 30 && progressNew < 90) {
        progressSvg = 'progress60';
      }
    }
  }
  return progressSvg;
}