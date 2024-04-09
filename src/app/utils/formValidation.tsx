const formValidation = (fieldName, value, rules) => {
  let isValid = true;
  let errMsg = '';
  const {
    required,
    minLength,
    maxLength,
    noSpecialChars,
    noWhiteSpace,
    includeAtChar,
    noFirstDot,
    noSpecialCharsExceptAtChar,
  } = rules;

  ({ isValid, errMsg } = validateDotChars(required, isValid, value, errMsg, fieldName, noFirstDot));

  ({ isValid, errMsg } = validateMinLength(minLength, isValid, value, errMsg, fieldName, maxLength));

  ({ isValid, errMsg } = validateSplChars(noSpecialChars, isValid, value, errMsg, fieldName, noSpecialCharsExceptAtChar));

  ({ isValid, errMsg } = validateWhiteSpace(includeAtChar, isValid, value, errMsg, fieldName, noWhiteSpace));

  return { isValid, errMsg };
};

export default formValidation;

const validateDotChars = (required, isValid, value, errMsg, fieldName, noFirstDot) => {
  if (required) {
    isValid = value.trim() !== '';
    errMsg = !isValid && `${fieldName} is required`;
  }
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

const validateMinLength = (minLength, isValid, value, errMsg, fieldName, maxLength) => {
  if (minLength && isValid) {
    isValid = value.length >= minLength;
    errMsg = !isValid && `${fieldName} must be minimum of ${minLength} characters`;
  }

  if (maxLength && isValid) {
    isValid = value.length <= maxLength;
    errMsg = !isValid && `${fieldName} must be maximum of ${minLength} characters`;
  }
  return { isValid, errMsg };
}

function validateWhiteSpace(includeAtChar, isValid, value, errMsg, fieldName, noWhiteSpace) {
  let includeAtCharRegExp = /^[a-zA-Z0-9@_\-.]*$/;
  let whiteSpaceRegExp = /^\S+$/;

  if (includeAtChar && isValid) {
    console.log(`Val>>>${value}`);
    isValid = includeAtCharRegExp.test(value);
    console.log(`valid val>>>${isValid}`);
    errMsg = !isValid && `${fieldName} cannot contain special characters`;
  }

  if (noWhiteSpace && isValid) {
    isValid = whiteSpaceRegExp.test(value);
    errMsg = !isValid && `Space is not allowed`;
  }
  return { isValid, errMsg };
}

function validateSplChars(noSpecialChars, isValid, value, errMsg, fieldName, noSpecialCharsExceptAtChar) {
  let specialCharsRegExp = /^[a-zA-Z0-9_\-. ]+$/;
  let noSpecialCharsExceptA = /^[a-zA-Z0-9@_\-. ]+$/;

  if (noSpecialChars && isValid) {
    console.log(`Val>>>${value}`);
    isValid = specialCharsRegExp.test(value);
    console.log(`valid val>>>${isValid}`);
    errMsg = !isValid && `${fieldName} cannot contain special characters`;
  }

  if (noSpecialCharsExceptAtChar && isValid) {
    console.log(`Val>>>${value}`);
    isValid = noSpecialCharsExceptA.test(value);
    console.log(`valid val>>>${isValid}`);
    errMsg = !isValid && `${fieldName} cannot contain special characters`;
  }
  return { isValid, errMsg };
}