import React from 'react';
import { View } from 'react-native';
import { SourceSansProRegTextView } from '@components/TextComponents';
import styles from './styles';
import PropTypes from 'prop-types';

const CircleView = props => {
  const { testID, text, containerStyle, textStyle } = props;
  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{
        ...styles(containerStyle.width, containerStyle.height).container,
        ...containerStyle,
      }}>
      <SourceSansProRegTextView style={{ ...styles().text, ...textStyle }}>
        {text}
      </SourceSansProRegTextView>
    </View>
  );
};

CircleView.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

CircleView.defaultProps = {
  testID: 'CircleView',
  text: 1,
  containerStyle: {
    width: 30,
    height: 30,
  },
};

export default CircleView;
