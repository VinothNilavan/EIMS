import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Play, Locked } from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';

const PlayButton = props => {
  const { testID, isActive, onPress, containerStyle } = props;
  let SvgImage = Play;
  if (!isActive) {
    SvgImage = Locked;
  }
  return (
    <TouchableWithoutFeedback
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      disabled={false}
      onPress={onPress}>
      <View style={{ ...styles.container, ...containerStyle }}>
        <SvgImage width={styles.svg.width} height={styles.svg.height} />
      </View>
    </TouchableWithoutFeedback>
  );
};

PlayButton.propTypes = {
  testID: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

PlayButton.defaultProps = {
  testID: 'PlayButton',
  isActive: false,
};

export default PlayButton;
