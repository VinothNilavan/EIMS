import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles, { pickerSelectStyles } from './indexCss.ts';
import { ArrowDownRed } from '@images';
import PropTypes from 'prop-types';

const CustomDropDown = props => {
  const {
    testID,
    items,
    onSelect,
    containerStyle,
    preSelectedValue,
    showPlaceHolder,
    placeHolderValue,
  } = props;

  let placeHolder = {};
  if (showPlaceHolder) {
    placeHolder = { label: placeHolderValue, value: null, color: '#707070' };
  }

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.container, ...containerStyle }}>
      <RNPickerSelect
        items={items}
        onValueChange={onSelect}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 20,
            right: 15,
          },
        }}
        Icon={ArrowDownRed}
        value={preSelectedValue}
        placeholder={placeHolder}
      />
    </View>
  );
};

CustomDropDown.propTypes = {
  testID: PropTypes.string,
};

CustomDropDown.defaultProps = {
  testID: 'CustomDropDown',
  onSelect: value => {
    console.log(`Selected Value>>>>${value}`);
  },
};

export default CustomDropDown;