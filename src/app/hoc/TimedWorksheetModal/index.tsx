import React from 'react';
import { View } from 'react-native';
import {
  CustomModal,
  BalooThambiRegTextView,
  RoundedButton,
} from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { HeaderBackground } from '@images';
import { getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';

const TimedWorksheetModal = props => {
  const {
    isVisible,
    onPress,
    onCompleteLater,
    infoMessage,
    subtitle,
    showAttemptLaterModal,
    showSubmitModal,
    isTimed,
    topic,
    time,
    buttonText,
    title,
  } = props;

  const {
    completeNowBtnText,
    submitText,
    attemptWoksheetOnego,
    submitWorksheetModalText,
    timedWorksheetoneGoMessage,
    worksheetWillBeSubmited,
    completeLaterBtnText,
    closeText,
    timeLimitText,
  } = useLanguage();

  if (showAttemptLaterModal || showSubmitModal) {
    return (
      <CustomModal
        containerStyle={styles.containerWhiteStyle}
        show={isVisible}
        onPress={onPress}
        btnText={showAttemptLaterModal ? completeNowBtnText : submitText}>
        <View style={styles.container}>
          <View style={styles.whiteBackground}>
            <HeaderBackground
              width={getWp(250)}
              height={getHp(130)}
              style={styles.headerSvg}
            />
            <BalooThambiRegTextView style={styles.modalHeader}>
              {showAttemptLaterModal
                ? attemptWoksheetOnego
                : submitWorksheetModalText}
            </BalooThambiRegTextView>
          </View>
          <BalooThambiRegTextView style={styles.messageTitle}>
            {showAttemptLaterModal
              ? timedWorksheetoneGoMessage
              : worksheetWillBeSubmited}
          </BalooThambiRegTextView>
        </View>
        <RoundedButton
          onPress={onCompleteLater}
          type="secondaryWhite"
          text={showAttemptLaterModal ? completeLaterBtnText : closeText}
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
        btnText={buttonText}>
        <View style={styles.container}>
          <HeaderBackground
            width={getWp(250)}
            height={getHp(130)}
            style={styles.headerSvg}
          />
          <BalooThambiRegTextView style={styles.modalHeader}>
            {title}
          </BalooThambiRegTextView>

          <View style={styles.detailsContainer}>
            <BalooThambiRegTextView style={styles.testTitle}>
              {topic}
            </BalooThambiRegTextView>

            <BalooThambiRegTextView style={styles.info}>
              {infoMessage}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView style={styles.subTitle}>
              {subtitle}
            </BalooThambiRegTextView>
            {isTimed && (
              <View>
                <BalooThambiRegTextView
                  style={[styles.testTitle, styles.timeTest]}>
                  {timeLimitText}
                </BalooThambiRegTextView>
                <View style={styles.timercontainer}>
                  <View style={styles.innerContainer}>
                    <BalooThambiRegTextView style={styles.text}>
                      {Math.floor(time / 60)
                        .toString()
                        .padStart(2, '0')}{' '}
                      {`: `}
                    </BalooThambiRegTextView>
                    <BalooThambiRegTextView style={[styles.text, styles.label]}>
                      Min
                    </BalooThambiRegTextView>
                  </View>
                  {/* <View style={styles.separatorContainer}>
                    <BalooThambiRegTextView style={[styles.separator]}>
                      :
                    </BalooThambiRegTextView>
                  </View> */}
                  <View style={styles.innerContainer}>
                    <BalooThambiRegTextView style={styles.text}>
                      {((time % 60) / 1000)
                        .toFixed(0)
                        .toString()
                        .padStart(2, '0')}
                    </BalooThambiRegTextView>
                    <BalooThambiRegTextView style={[styles.text, styles.label]}>
                      Sec
                    </BalooThambiRegTextView>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </CustomModal>
    );
  }
};

TimedWorksheetModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onCompleteLater: PropTypes.func.isRequired,
  topic: PropTypes.string,
  isStatusShown: PropTypes.bool,
  correct: PropTypes.number,
  wrong: PropTypes.number,
  accuracy: PropTypes.number,
  infoMessage: PropTypes.string,
  subtitle: PropTypes.string,
  showAttemptLaterModal: PropTypes.bool,
  showSubmitModal: PropTypes.bool,
  buttonText: PropTypes.string,
  title: PropTypes.string,
};

TimedWorksheetModal.defaultProps = {
  isVisible: true,
  isStatusShown: true,
  showSubmitModal: false,
  showAttemptLaterModal: false,
  title: 'Live\nWorksheet',
  buttonText: 'Let’s Go',
  onCompleteLater: () => { console.log(`TimedWorksheetModal default onCompleteLater`) },
  onPress: () => { console.log(`TimedWorksheetModal default onPress`) },
};

export default TimedWorksheetModal;
