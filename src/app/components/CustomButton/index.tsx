import React from 'react';
import { Button, NativeBaseProvider } from 'native-base';
import styles from './indexCss';
import { SourceSansProBoldTextView } from '@components';

const CustomButton = props => {
  const { btnText, onSubmit, disabled, maroon } = props;

  return (
    <NativeBaseProvider>
      <Button
        disabled={disabled}
        block
        style={[
          styles.btn,
          disabled ? styles.disabledBtn : {},
          maroon ? styles.maroonBtn : {},
        ]}
        onPress={onSubmit}>
        <SourceSansProBoldTextView style={[styles.btnText, props.btnTextStyle]}>
          {btnText}
        </SourceSansProBoldTextView>
      </Button>
    </NativeBaseProvider>
  );
};

export default CustomButton;
