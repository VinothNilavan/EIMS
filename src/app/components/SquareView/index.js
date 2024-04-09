import React from 'react';
import {Text, View} from 'react-native';
import {Coin} from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';

const SquareView = props => {
  const {testID, text, containerStyle, textStyle} = props;

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{...styles.container, ...containerStyle}}>
      <View style={styles.iconView}>
        <Coin
          accessible={true}
          testID="SquareViewCoin"
          accessibilityLabel="SquareViewCoin"
          width={styles.icon.width}
          height={styles.icon.height}
        />
      </View>
      <Text
        accessible={true}
        testID="SquareViewText"
        accessibilityLabel="SquareViewText"
        style={{...styles.text, ...textStyle}}>
        {text}
      </Text>
    </View>
  );
};

SquareView.propTypes = {
  testID: PropTypes.string,
  //text: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

SquareView.defaultProps = {
  testID: 'SquareView',
  text: '',
};

export default SquareView;
