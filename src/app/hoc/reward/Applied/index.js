import React, {Fragment} from 'react';
import {View} from 'react-native';

import {CorrectAnswer} from '@images';
import {getWp, getHp} from '@utils';
import {BalooThambiRegTextView} from '@components';
import styles from './indexCss';
import {useLanguage} from '@hooks';

const AppliedComponent = props => {
  const {testID, isVisible} = props;
  const {appliedBtnText} = useLanguage();
  return (
    <Fragment>
      {isVisible ? (
        <View
          accessible={true}
          testID={testID}
          accessibilityLabel={testID}
          style={styles.appliedContainer}>
          <CorrectAnswer
            accessible={true}
            testID="AppliedRewardCorrectAns"
            accessibilityLabel="AppliedRewardCorrectAns"
            width={getWp(26)}
            height={getWp(26)}
          />
          <BalooThambiRegTextView
            testID="AppliedRewardAppliedBtnText"
            style={styles.appliedTextStyle}>
            {appliedBtnText}
          </BalooThambiRegTextView>
        </View>
      ) : null}
    </Fragment>
  );
};

export default AppliedComponent;
