import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './indexCss';
import { PropTypes } from 'prop-types';

const SearchInput = props => {
  const {
    testID,
    containerStyle,
    inputContainerStyle,
    inputStyle,
    iconStyle,
    onChangeText,
  } = props;
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} key="container" style={{ ...styles.container, ...containerStyle }}>
      <View
        accessible={true}
        testID="SearchInputItem"
        accessibilityLabel="SearchInputItem"
        key="inputContainer"
        rounded
        style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        <TextInput
          accessible={true}
          testID="SearchInputInput"
          accessibilityLabel="SearchInputInput"
          key="input"
          placeholder="search"
          placeholderTextColor="white"
          style={{ ...styles.input, ...inputStyle }}
          onChangeText={onChangeText}
          multiline={false}
          numberOfLines={1}
          keyboardType="default"
          returnKeyType="search"
          {...props}
        />
        <Icon
          accessible={true}
          testID="SearchInputIcon"
          accessibilityLabel="SearchInputIcon"
          name="search1"
          style={{ ...styles.icon, ...iconStyle }}
          key="icon"
          type="AntDesign"
        />
      </View>
    </View>
  );
};

SearchInput.propTypes = {
  testID: PropTypes.string,
  containerStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  input: PropTypes.object,
  onChangeText: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  testID: 'SearchInput'
};

export default SearchInput;
