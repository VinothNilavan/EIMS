import React from 'react';
import {Button, NativeBaseProvider} from 'native-base';
import styles from './indexCss';
import {SourceSansProBoldTextView} from '@components';

const RoundButtonN = props => {
  const {btnText, onSubmit, testId, disabled, maroon} = props;

  return (
    <NativeBaseProvider>
      <Button
        disabled={disabled}
        rounded
        block
        style={[
          styles.btn,
          disabled ? styles.disabledBtn : {},
          maroon ? styles.maroonBtn : {},
        ]}
        accessible={true}
        testID={testId}
        accessibilityLabel={testId}
        onPress={onSubmit}>
        <SourceSansProBoldTextView
          testID="onBoardingFooterText"
          style={[styles.btnText, props.btnTextStyle]}>
          {btnText}
        </SourceSansProBoldTextView>
      </Button>
    </NativeBaseProvider>
  );
};

export default RoundButtonN;
