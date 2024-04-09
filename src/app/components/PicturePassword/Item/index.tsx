import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Cat } from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Item = props => {
  const {
    testID,
    SvgImage,
    onSelectPassword,
    containerStyle,
    isSelected,
  } = props;

  let selectedStyle = null;
  if (isSelected) {
    selectedStyle = styles.selected;
  }

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={{ ...styles.container, ...containerStyle }}>
      <TouchableWithoutFeedback onPress={onSelectPassword}>
        <View
          style={{
            flex: 1,
            ...selectedStyle,
          }}>
          <SvgImage accessible={true} testID="SVGImageItem" accessibilityLabel="SVGImageItem" width={styles.image.width} height={styles.image.height} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

Item.propTypes = {
  testID: PropTypes.string,
  SvgImage: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  svgStyle: PropTypes.object,
  isSelected: PropTypes.bool,
};

Item.defaultProps = {
  testID: 'Item',
  SvgImage: Cat,
  isSelected: false,
};

export default Item;
