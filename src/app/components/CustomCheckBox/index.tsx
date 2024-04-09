import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './indexCss';
import { CheckedBox, UncheckedBox } from '@images';

const CustomCheckBox = props => {
  const { isSelected, setIsSelected } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setIsSelected(isSelected ? false : true)}>
        <View style={styles.checkboxContainer}>
          {isSelected ? <CheckedBox /> : <UncheckedBox />}
          <Text style={styles.label}>{props.label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomCheckBox;
