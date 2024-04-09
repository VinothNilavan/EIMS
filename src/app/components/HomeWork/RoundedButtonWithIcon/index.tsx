import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import styles from './indexCss';
import PropTypes from 'prop-types';

const RoundedButtonWithIcon = props => {
  const {
    testID,
    text,
    btnStyle,
    textStyle,
    iconStyle,
    iconName,
    iconTheme,
    onClickCallback,
  } = props;
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID}>
      <Button
        iconRight
        rounded
        style={{ ...styles.btnContainer, ...btnStyle }}
        onPress={onClickCallback}>
        <Text
          accessible={true}
          testID="RoundedButtonWithIconText"
          accessibilityLabel="RoundedButtonWithIconText"
          style={{ ...styles.text, ...textStyle }}
          uppercase={false}>
          {text}
        </Text>
        <Icon
          accessible={true}
          testID="RoundedButtonWithIconName"
          accessibilityLabel="RoundedButtonWithIconName"
          name={iconName}
          style={{ ...styles.icon, ...iconStyle }}
          type={iconTheme}
        />
      </Button>
    </View>
  );
};

RoundedButtonWithIcon.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  textStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  iconTheme: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

RoundedButtonWithIcon.defaultProps = {
  testID: 'RoundedButtonWithIcon',
  iconName: 'upload',
  iconTheme: 'AntDesign',
};

export default RoundedButtonWithIcon;
