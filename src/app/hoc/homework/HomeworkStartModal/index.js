// External Imports
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import moment from 'moment';
import {getWp, getHp} from '@utils';

// Internal Imports
import styles from './style';
import {BalooThambiRegTextView, RoundedButton} from '@components';
import {HeaderBackground} from '@images';
import {useLanguage} from '@hooks';

const HomeworkStartModal = props => {
  const {
    testID,
    isVisible,
    title,
    homework,
    onSkipBtnPressed,
    onStartBtnPressed,
  } = props;
  console.log('ss', homework?.description);
  const {dueOnText, teacherCommentText, noCommentsText, letsGoBtnText} =
    useLanguage();
  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={isVisible}
      animationIn="fadeIn"
      onBackdropPress={onSkipBtnPressed}
      animationOut="fadeOut">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <BalooThambiRegTextView
            testID="HomeworkStartTitle"
            style={styles.titleText}>
            {title}
          </BalooThambiRegTextView>
          <HeaderBackground
            accessible={true}
            testID="HomeworkStartHeaderBg"
            accessibilityLabel="HomeworkStartHeaderBg"
            style={styles.svgBackgroundImage}
          />
        </View>
        <BalooThambiRegTextView
          testID="HomeworkStartName"
          style={styles.subTitleText}>
          {homework?.name}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="HomeworkStartDueOn"
          style={styles.dueDateText}>
          {`${dueOnText} ${moment(homework?.endDate).format('DD MMM')}`}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="HomeworkStartComment"
          style={styles.subTitleText}>
          {teacherCommentText}
        </BalooThambiRegTextView>
        <View style={styles.commentContainer}>
          <BalooThambiRegTextView
            testID="HomeworkStartDecription"
            style={styles.commentText}>
            {homework?.description != ''
              ? homework?.description
              : noCommentsText}
          </BalooThambiRegTextView>
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            testID="RoundedButtonHomeworkStartLetsGoBtn"
            text={letsGoBtnText}
            type="elevatedOrange"
            width={getWp(150)}
            height={getHp(60)}
            onPress={() => onStartBtnPressed(homework)}
          />
        </View>
      </View>
    </Modal>
  );
};

HomeworkStartModal.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  homework: PropTypes.object.isRequired,
  title: PropTypes.string,
  onSkipBtnPressed: PropTypes.func,
  onStartBtnPressed: PropTypes.func,
  onHide: PropTypes.func,
};

HomeworkStartModal.defaultProps = {
  testID: 'HomeworkStart',
  isVisible: false,
  homework: null,
  title: 'Live \nHomework',
  onSkipBtnPressed: () => {console.log(`HomeworkStartModal onSkipBtnPressed`)},
  onStartBtnPressed: () => {console.log(`HomeworkStartModal onStartBtnPressed`)},
};

export default HomeworkStartModal;
