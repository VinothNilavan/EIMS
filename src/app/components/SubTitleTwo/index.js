import React from 'react';
import {Text, View} from 'react-native';
import styles from './indexCss';

const SubTitleTwo = props => (
  <View accessible={true} testID={props.testID} accessibilityLabel={props.testID}>
    <Text style={{...styles.input, ...props.styles}}>{props.text}</Text>
  </View>
);

export default SubTitleTwo;
