import React, { useRef, useEffect } from 'react';
import { TextInput, Keyboard } from 'react-native';
import styles from './indexCss';
import { COLORS } from '../../constants/COLORS';
import PropTypes from 'prop-types';

const CustomTextInput = props => {
  const { testID } = props;
  let bdrColor = null;
  const { isError } = props;

  if (isError) {
    bdrColor = { borderColor: COLORS.red };
  }

  const localInputRef = useRef();

  const keyboardDidHideCallback = () => {
    if (localInputRef && localInputRef.current) {
      localInputRef.current.blur();
    }
  }

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallback);
    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  return (
    <TextInput
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      ref={(ref) => { localInputRef && (localInputRef.current = ref); }}
      {...props}
      style={{ ...styles.input, ...props.style, ...bdrColor }}
      autoCapitalize="none"
      autoCompleteType="off"
      autoCorrect={false}
    />
  );
};

CustomTextInput.propTypes = {
  styles: PropTypes.object,
  onTextChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default CustomTextInput;