import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './style';
import { RobotoRegTextView, MyAutoHeightWebView } from '@components';
import PropTypes from 'prop-types';
import { COLORS } from '@constants';
import getHtmlTemplate from '@utils/getHtmlTemplate';

const MCQOption = props => {
  const {
    testID,
    index,
    option,
    showAns,
    answer,
    userAnswer,
    containerStyle,
    optionContainerStyle,
    optionTextStyle,
    webContentStyle,
    resultFlag,
    isRTL,
  } = props;

  const [bgColor, setBGcolor] = useState({});
  const [optionHtml, setOptionHtml] = useState({});

  const char = 'A';

  useEffect(() => {
    setBGcolor(getWSCountBGcolor(userAnswer, index, resultFlag, answer));
    setOptionHtml(getHtmlTemplate(option, false, isRTL));
  }, []);


  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      pointerEvents="none"
      style={[isRTL ? styles.RTLContainer : styles.container, containerStyle]}>
      <View
        style={[
          styles.optionContainer,
          optionContainerStyle,
          bgColor
        ]}>
        <RobotoRegTextView
          testID="MCQOptionTextView"
          style={[
            styles.option,
            optionTextStyle,
            showAns &&
            index === userAnswer && userAnswer === answer && { color: COLORS.white },
            userAnswer !== answer && index === userAnswer && { color: COLORS.white },
          ]}>
          {String.fromCharCode(char.charCodeAt(0) + index)}
        </RobotoRegTextView>
      </View>

      <MyAutoHeightWebView
        testID="MyAutoHeightWebViewMCQOption"
        style={[styles.webViewStyle, webContentStyle]}
        files={[]}
        customScript={''}
        customStyle={`
          `}
        onSizeUpdated={(size) => { console.log(size) }}
        source={{
          html: optionHtml,
        }}
        zoomable={true}
      />
    </View>
  );
};

MCQOption.propTypes = {
  testID: PropTypes.string,
  index: PropTypes.number,
  showAns: PropTypes.bool,
  containerStyle: PropTypes.any,
  optionContainerStyle: PropTypes.any,
  optionTextStyle: PropTypes.any,
  webContentStyle: PropTypes.any,
};

MCQOption.defaultProps = {
  testID: 'MCQOption',
  type: 'neutral',
};
export default MCQOption;

const getWSCountBGcolor = (userAnswer, index, resultFlag, answer) => {
  let background = { backgroundColor: COLORS.worksheetWrongCountBackgroundColor };

  if (Array.isArray(userAnswer)) {
    for (let item of userAnswer) {
      if (item == index && (resultFlag == "pass")) {
        background = { backgroundColor: COLORS.worksheetCorrectCountBackgroundColor };
        break;
      }
    }
  } else {
    if (userAnswer === answer && index === userAnswer) {
      background = { backgroundColor: COLORS.worksheetCorrectCountBackgroundColor };
    }
  }
  return background;
}