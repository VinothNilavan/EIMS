import React from 'react';
import { View, Image } from 'react-native';
import { themeSvg } from '@themeSvgs';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Shade = props => {
  const { theme, imageName, containerStyle } = props;
  let image = themeSvg[theme][imageName];

  let container = styles.container;

  if (containerStyle) {
    container = containerStyle;
  }

  return (
    <View style={container}>
      <Image
        source={image}
        width={styles.imgStyle.width}
        height={styles.imgStyle.height}
      />
    </View>
  );
};

Shade.propTypes = {
  theme: PropTypes.string,
  imageName: false,
  containerStyle: PropTypes.string,
};

Shade.defaultProps = {
  theme: 'ocean',
  imageName: 'shadeTop',
};

export default Shade;
