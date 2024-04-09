import React from 'react';
import { View } from 'react-native';
import { NormalText } from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Item = props => {
  const { title, text, containerStyle, titleStyle, textStyle } = props;
  return (
    <View key="container" style={{ ...styles.container, ...containerStyle }}>
      <NormalText
        key="title"
        text={title}
        styles={{ ...styles.title, ...titleStyle }}
      />
      <NormalText
        key="text"
        text={text}
        styles={{ ...styles.text, ...textStyle }}
      />
    </View>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  titleStyle: PropTypes.object,
};

Item.defaultProps = {};

export default Item;
