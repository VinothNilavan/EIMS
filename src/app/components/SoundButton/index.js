import React from 'react';
import {SoundSvg} from '@images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './style';
import {getWp} from '@utils';
import PropTypes from 'prop-types';

const SoundButton = props => {
  const {ContainerStyle, onPress, isRTL} = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        ContainerStyle,
        {
          marginLeft: isRTL ? getWp(12) : getWp(0),
          marginRight: !isRTL ? getWp(12) : getWp(0),
        },
      ]}
      onPress={onPress}>
      <SoundSvg height={getWp(33)} width={getWp(24)} />
    </TouchableOpacity>
  );
};

SoundButton.propTypes = {
  ContainerStyle: PropTypes.any,
  onPress: PropTypes.func,
  isRTL: PropTypes.bool,
};

SoundButton.defaultProps = {
  onPress: () => {console.log(`SoundButton default onPress`)},
  isRTL: false,
};

export default SoundButton;
