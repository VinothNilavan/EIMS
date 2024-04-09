import React from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import { BalooThambiRegTextView } from '@components';

import PropTypes from 'prop-types';

const NumberSquareButton = props => {
  const { testID, text, containerStyle, title, contentStyle, isLastItem } = props;
  let wrapperStyle = styles.wrapper;
  if (isLastItem) {
    wrapperStyle = {...wrapperStyle, ...{marginRight: 0}}
  }
  return (
    <View style={wrapperStyle}>
      <View accessible={true} testID={testID} accessibilityLabel={testID} style={{ ...contentStyle }}>
        <View style={{ ...styles.container, ...containerStyle }}>
          <BalooThambiRegTextView testID="NumberSquareButtonText" style={styles.text}>
            {text}
          </BalooThambiRegTextView>
        </View>
        {title != null && title.length > 0 && (
          <BalooThambiRegTextView testID="NumberSquareButtonTitle" style={styles.normalText}>
            {title}
          </BalooThambiRegTextView>
        )}
      </View>
    </View>

  );
};

NumberSquareButton.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.any,
  title: PropTypes.string,
  containerStyle: PropTypes.object,
};

NumberSquareButton.defaultProps = {
  testID: 'NumberSquareButton',
  text: '',
  title: '',
};

export default NumberSquareButton;
