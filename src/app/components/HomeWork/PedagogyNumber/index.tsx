import React from 'react';
import { View } from 'react-native';
import NormalText from '../../NormalText';
import styles from './indexCss';
import PropTypes from 'prop-types';

const PedagogyNumber = props => {
  const { testID, text, containerStyle, textStyle } = props;
  return (
    <View key="container" style={{ ...styles.container, ...containerStyle }}>
      <NormalText
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        key="text"
        text={text}
        styles={{ ...styles.text, ...textStyle }}
      />
    </View>
  );
};

PedagogyNumber.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

PedagogyNumber.defaultProps = {
  testID: 'PedagogyNumber'
};

export default PedagogyNumber;