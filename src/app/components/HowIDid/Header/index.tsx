import React from 'react';
import { View } from 'react-native';
import Item from './Item';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';

const Header = props => {
  const {
    testID,
    attempts,
    questionsDone,
    accuracy,
    containerStyle,
    permissions,
  } = props;

  const { attemptText, questionDoneText, acuracyText } = useLanguage();

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} key="container" style={{ ...styles.container, ...containerStyle }}>
      {permissions.attempt && (
        <View key="atItemContainer" style={styles.itemContainer}>
          <Item text={attemptText} svgText={attempts} SvgImage="attempt" />
        </View>
      )}
      {permissions.questionDone && (
        <View key="qItemContainer" style={styles.itemContainer}>
          <Item
            text={questionDoneText}
            svgText={questionsDone}
            SvgImage="questionsDone"
          />
        </View>
      )}
      {permissions.accuracy && (
        <View key="accItemContainer" style={styles.itemContainer}>
          <Item
            text={acuracyText}
            svgText={accuracy}
            SvgImage="accuracy"
            svgTextStyle={styles.svgTextStyle}
            percentage
          />
        </View>
      )}
    </View>
  );
};

Header.propTypes = {
  testID: PropTypes.string
};

Header.defaultProps = {
  testID: 'Header'
};

export default Header;
