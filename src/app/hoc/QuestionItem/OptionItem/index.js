import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import MCQOption from '@components/HowIDid/MCQOption';
import {COLORS} from '@constants/COLORS';
import styles from './indexCss';
import PropTypes from 'prop-types';

const OptionItem = props => {
  const {optionNumber, option, isActive, containerStyle, onPress} = props;

  let optionNumberStyle = null;
  if (!isActive) {
    optionNumberStyle = {backgroundColor: COLORS.infoMessageGray};
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View key="container" style={{...styles.container, ...containerStyle}}>
        <View key="optionNumber" style={styles.optionNumberContainer}>
          <MCQOption text={optionNumber} containerStyle={optionNumberStyle} />
        </View>

        <Text key="option" style={styles.optionText}>
          {option}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

OptionItem.propTypes = {
  optionNumber: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

OptionItem.defaultProps = {};

export default OptionItem;
