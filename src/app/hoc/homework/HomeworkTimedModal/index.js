import React from 'react';
import {View} from 'react-native';
import {CustomModal, BalooThambiRegTextView, RoundedButton} from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';
import {HeaderBackground} from '@images';
import {getWp, getHp} from '@utils';
import moment from 'moment';
import {useLanguage} from '@hooks';

const HomeworkTimedModal = props => {
  const {isVisible, onPress, onCompleteLater, homework, submitHwModal} = props;

  const {
    completeNowBtnText,
    attemptHwInOneGo,
    dueOnText,
    youPerformbetterInOneGo,
    completeLaterBtnText,
    submitHwModalText,
    hwWillBeSubmitedText,
    submitText,
    closeText,
  } = useLanguage();

  return (
    <CustomModal
      testID="CustomModalHomeworkTimedModal"
      containerStyle={styles.container}
      show={isVisible}
      onPress={onPress}
      largeWidth={styles.btn.width}
      btnText={submitHwModal ? closeText : completeNowBtnText}
      btnType={submitHwModal ? 'secondaryWhite' : 'elevatedOrange'}>
      <View style={styles.subContainer}>
        <View style={styles.whiteBackground}>
          <HeaderBackground
            accessible={true}
            testID="HeaderBackgroundHomeworkTimedModal"
            accessibilityLabel="HeaderBackgroundHomeworkTimedModal"
            width={getWp(250)}
            height={getHp(130)}
            style={styles.headerSvg}
          />
          <BalooThambiRegTextView
            testID="HomeworkTimedModalAttemptHwInOneGoText"
            style={
              submitHwModal ? styles.hwSubmitmodalHeader : styles.modalHeader
            }>
            {submitHwModal ? submitHwModalText : attemptHwInOneGo}
          </BalooThambiRegTextView>
        </View>
        {!submitHwModal && (
          <BalooThambiRegTextView
            testID="HomeworkTimedModalDueOnText"
            style={styles.dueDateText}>
            {`${dueOnText} ${moment(homework?.endDate).format('DD MMM')}`}
          </BalooThambiRegTextView>
        )}
        <BalooThambiRegTextView
          testID="HomeworkTimedModalYouPerformbetterInOneGoText"
          style={
            submitHwModal ? styles.submitHwmessageTitle : styles.messageTitle
          }>
          {submitHwModal ? hwWillBeSubmitedText : youPerformbetterInOneGo}
        </BalooThambiRegTextView>
      </View>
      <RoundedButton
        testID="RoundedButtonHomeworkTimedModalCompleteLaterBtnText"
        onPress={onCompleteLater}
        type={submitHwModal ? 'elevatedOrange' : 'secondaryWhite'}
        text={submitHwModal ? submitText : completeLaterBtnText}
        height={styles.btn.height}
        width={styles.btn.width}
        containerStyle={{...styles.btnContainer}}
        textStyle={submitHwModal ? {...styles.btnHwText} : {...styles.btnText}}
      />
    </CustomModal>
  );
};

HomeworkTimedModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onCompleteLater: PropTypes.func.isRequired,
  homework: PropTypes.object,
};

HomeworkTimedModal.defaultProps = {
  isVisible: true,
  onCompleteLater: () => {console.log(`onCompleteLater default`)},
  onPress: () => {console.log(`HomeworkTimedModal default`)},
  homework: null,
};

export default HomeworkTimedModal;
