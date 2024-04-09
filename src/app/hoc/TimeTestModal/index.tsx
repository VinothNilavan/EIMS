import React from 'react';
import { View } from 'react-native';
import {
  CustomModal,
  BalooThambiRegTextView,
  TimedTestStats,
  RoundedButton,
} from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { HeaderBackground } from '@images';
import { getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';


const TimeTestModal = props => {
  const {
    isVisible,
    onPress,
    onCompleteLater,
    title,
    topic,
    isStatusShown,
    correct,
    wrong,
    accuracy,
    infoMessage,
    subtitle,
    showAttemptLaterModal,
  } = props;

  const { completeNowBtnText, attempTimedTestOneGo, youOftenPerformTimedTestOneGo, completeLaterBtnText, nextText, timedTestText } = useLanguage();

  if (showAttemptLaterModal) {
    return (
      <CustomModal
        containerStyle={styles.containerWhiteStyle}
        show={isVisible}
        onPress={onPress}
        btnText={completeNowBtnText}>
        <View style={styles.container}>
          <View style={styles.whiteBackground}>
            <HeaderBackground
              width={getWp(250)}
              height={getHp(130)}
              style={styles.headerSvg}
            />
            <BalooThambiRegTextView style={styles.modalHeader}>
              {attempTimedTestOneGo}
            </BalooThambiRegTextView>
          </View>
          <BalooThambiRegTextView style={styles.messageTitle}>
            {youOftenPerformTimedTestOneGo}
          </BalooThambiRegTextView>
        </View>
        <RoundedButton
          onPress={onCompleteLater}
          type="secondaryWhite"
          text={completeLaterBtnText}
          width={styles.btn.width}
          height={styles.btn.height}
          containerStyle={{ ...styles.btnContainer }}
          textStyle={{ ...styles.btnText }}
        />
      </CustomModal>
    );
  } else {
    return (
      <CustomModal
        containerStyle={styles.containerStyle}
        show={isVisible}
        onPress={onPress}
        btnText={nextText}>
        <View style={styles.container}>
          <View style={styles.whiteBackground}>
            <HeaderBackground
              width={getWp(250)}
              height={getHp(130)}
              style={styles.headerSvg}
            />
            <BalooThambiRegTextView style={styles.modalHeader}>
              {timedTestText}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView style={styles.title}>
              {title}
            </BalooThambiRegTextView>
          </View>
          <View style={styles.detailsContainer}>
            <BalooThambiRegTextView style={styles.testTitle}>
              {topic}
            </BalooThambiRegTextView>
            {isStatusShown && (
              <TimedTestStats
                accuracy={accuracy}
                correct={correct}
                wrong={wrong}
                containerStyle={styles.timeStatsStyle}
              />
            )}
            <BalooThambiRegTextView style={styles.info}>
              {infoMessage}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView style={styles.subTitle}>
              {subtitle}
            </BalooThambiRegTextView>
          </View>
        </View>
      </CustomModal>
    );
  }
};

TimeTestModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onCompleteLater: PropTypes.func.isRequired,
  title: PropTypes.string,
  topic: PropTypes.string,
  isStatusShown: PropTypes.bool,
  correct: PropTypes.number,
  wrong: PropTypes.number,
  accuracy: PropTypes.number,
  infoMessage: PropTypes.string,
  subtitle: PropTypes.string,
  showAttemptLaterModal: PropTypes.bool,
};

TimeTestModal.defaultProps = {
  isVisible: true,
  isStatusShown: true,
  showAttemptLaterModal: false,
  onCompleteLater: () => { console.log(`onCompleteLater default`) },
  onPress: () => { console.log(`onCompleteLater onPress default`) },
};

export default TimeTestModal;
