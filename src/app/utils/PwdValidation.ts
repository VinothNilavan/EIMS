const PwdValidation = (fieldName, value, rules) => {
  let isValid = true;
  let errMsg = '';

  const { required, minLength, maxLength, noSpecialChars, noWhiteSpace, noFirstDot, shouldMatchPassword, password } = rules;

  ({ isValid, errMsg } = emptyValidate(required, isValid, value, errMsg, fieldName));
  
  ({ isValid, errMsg } = dotValidate(noFirstDot, isValid, value, errMsg));

  ({ isValid, errMsg } = lengthValidate(minLength, isValid, value, errMsg));

  ({ isValid, errMsg } = maxLengthValidate(maxLength, isValid, value, errMsg, fieldName, minLength));

  ({ isValid, errMsg } = splCharValidate(noSpecialChars, isValid, value, errMsg, fieldName));

  ({ isValid, errMsg } = matchValidate(shouldMatchPassword, isValid, value, password, errMsg, fieldName));

  ({ isValid, errMsg } = whiteSpaceValidate(noWhiteSpace, isValid, value, errMsg));

  return { isValid, errMsg };
};

export default PwdValidation;

const whiteSpaceValidate = (noWhiteSpace, isValid, value, errMsg) => {
  let whiteSpaceRegExp = /^\S+$/;
  if (noWhiteSpace && isValid) {
    isValid = whiteSpaceRegExp.test(value);
    errMsg = !isValid && `Space is not allowed`;
  }
  return { isValid, errMsg };
}

const matchValidate = (shouldMatchPassword, isValid, value, password, errMsg, fieldName) => {
  if (shouldMatchPassword && isValid) {
    isValid = value === password;
    errMsg =
      !isValid && `${fieldName} doesn't match`;
  }
  return { isValid, errMsg };
}

const splCharValidate = (noSpecialChars, isValid, value, errMsg, fieldName) => {
  let specialCharsRegExp = /^[a-zA-Z0-9_@\-.]*$/;
  if (noSpecialChars && isValid) {
    isValid = specialCharsRegExp.test(value);
    errMsg = !isValid && `${fieldName} cannot contain special characters`;
  }
  return { isValid, errMsg };
}

const maxLengthValidate = (maxLength, isValid, value, errMsg, fieldName, minLength) => {
  if (maxLength && isValid) {
    isValid = value.length <= maxLength;
    errMsg =
      !isValid && `${fieldName} must be maximum of ${minLength} characters`;
  }
  return { isValid, errMsg };
}

const lengthValidate = (minLength, isValid, value, errMsg) => {
  if (minLength && isValid) {
    isValid = value.length >= minLength;
    errMsg = "";
  }
  return { isValid, errMsg };
}

const dotValidate = (noFirstDot, isValid, value, errMsg) => {
  if (noFirstDot) {
    isValid = value.charAt(0) !== '.';
    errMsg = !isValid && `Dot is not allowed as the first character`;
    if (isValid) {
      isValid = value.indexOf('..') == -1;
      errMsg = !isValid && `Two or more consecutive dots are not allowed`;
    }
  }
  return { isValid, errMsg };
}

const emptyValidate = (required, isValid, value, errMsg, fieldName) => {
  if (required) {
    isValid = value.trim() !== '';
    errMsg = !isValid && `${fieldName} is required`;
  }
  return { isValid, errMsg };
}