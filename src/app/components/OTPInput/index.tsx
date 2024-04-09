import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import styles from './indexCss';

const OTPInput = forwardRef((props, refs) => {
  const { testID, otpLength, otp, isNewFlow, enableMethod } = props;
  const [otpFields, setOtpFields] = useState([]);
  let assignOtpVal = new Array(otpLength).fill(0);
  const [otpValue, setOtpValue] = useState([...assignOtpVal.map(itr => '')]);
  let inputRefs = Array.from({ length: otpLength });
  inputRefs[0] = useRef(null);
  inputRefs[1] = useRef(null);
  inputRefs[2] = useRef(null);
  inputRefs[3] = useRef(null);

  useImperativeHandle(refs, () => ({
    getInputOtp: () => {
      return otp && otp.length > 0 ? otp.join('') : otpValue.join('');
    },
    resetOtp: () => {
      let otpV = '';
      for (let index = otpFields.length - 1; index >= 0; index--) {
        inputRefs[index].current.clear();
        if (inputRefs[index]) {
          otpV = otpValue;
          otpV[index] = '';
          setOtpValue(otpV);
        }
      }
    },
  }));

  const initOtpFields = () => {

    let otpInputField = [];
    for (let i = 0; i < otpLength; i++) {
      otpInputField.push({
        i,
        component: (
          <TouchableOpacity style={isNewFlow ? styles.newOtpInputContainer : styles.otpInputContainer}>
            {!otp || otp.length === 0 ? <TextInput
              style={{ width: '100%', height: 45, fontSize: DeviceInfo.isTablet() ? 40 : 20 }}
              accessible={true}
              testID={`OTPInput${i}`}
              accessibilityLabel={`OTPInput${i}`}
              maxLength={1}
              keyboardType='numeric'
              ref={inputRefs[i]}
              onChangeText={text => {
                otpInputHandler(i, text);
              }}
              textAlign={'center'}
              secureTextEntry={true}
              onKeyPress={e => focusPrevious(e.nativeEvent.key, i)}
            /> :
              <TextInput
                style={{ width: '100%', height: 45, fontSize: DeviceInfo.isTablet() ? 40 : 20 }}
                accessible={true}
                testID={`OTPInput${i}`}
                accessibilityLabel={`OTPInput${i}`}
                maxLength={1}
                keyboardType='numeric'
                ref={inputRefs[i]}
                textAlign={'center'}
                secureTextEntry={true}
                value={otp[i]}
                editable
              />}
          </TouchableOpacity>
        ),
      });
    }
    setOtpFields(otpInputField);
  };

  const otpInputHandler = (index, value) => {
    try {
      if (index < otpValue.length - 1 && value) {
        inputRefs[index + 1].current.focus();
      }
      if (index === otpValue.length - 1) {
        if (inputRefs && inputRefs[index] && inputRefs[index].current) {
          inputRefs[index].current.blur();
        }
      }
      const otpNew = otpValue;
      otpNew[index] = value;
      setOtpValue(otpNew);
      setTimeout(() => { enableMethod(); }, 200);
    } catch (error) {
      console.log('otp handler error ', error);
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) {
      if (inputRefs[index]) {
        const otpNew = otpValue;
        otpNew[index] = '';
        setOtpValue(otpNew);
        inputRefs[index - 1].current.focus();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      initOtpFields();
    }, 1000);
  }, [otp]);

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={styles.container}>
      {otpFields.map((singleField, index) => { return singleField.component; })}
    </View>
  );
});

OTPInput.propTypes = {
  testID: PropTypes.string,
  otpLength: PropTypes.number
};

OTPInput.defaultProps = {
  testID: 'OTPInput',
  otpLength: 4,
};

export default OTPInput;
