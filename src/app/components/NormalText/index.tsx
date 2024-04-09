import React from 'react';
import { Text } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';

const NormalText = props => (
  <Text
    accessible={true}
    testID={props.testID}
    accessibilityLabel={props.testID}
    style={{ ...styles.input, ...props.styles }}>
    {props.text}
  </Text>
);

NormalText.propTypes = {
  testID: PropTypes.string,
};

NormalText.defaultProps = {
  testID: 'NormalText',
};

export default NormalText;
