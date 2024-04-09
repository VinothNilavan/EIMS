/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, ImageBackground } from 'react-native';
import { ThemeContext } from '@contexts/theme-context';
import { themeSvg } from '@themeSvgs';
import PropTypes from 'prop-types';
import styles from './indexCss';


const SVGImageBackground = props => {
  const theme = useContext(ThemeContext);
  let {
    testID,
    SvgImage,
    style,
    themeBased,
    screenBg,
    containerStyle,
    customContainerStyle
  } = props;

  let container = { ...styles.container, ...containerStyle };

  if (customContainerStyle) {
    container = { ...customContainerStyle };
  }

  if (screenBg) {
    container = { ...styles.screenBg, ...containerStyle };
  }
  if (themeBased) {
    SvgImage = themeSvg[theme.name][SvgImage];
  }
  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={container}>
      <ImageBackground
        resizeMode="stretch"
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}>

        <View
          key="svgContainer"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...style,
          }}>
          <SvgImage accessible={true} testID="SVGImage" accessibilityLabel="SVGImage" width="100%" height="100%" preserveAspectRatio="none" />
        </View>
        {props.children}
      </ImageBackground>
    </View>
  );
};


SVGImageBackground.propTypes = {
  testID: PropTypes.string,
  subjectSelection: PropTypes.bool,
};

SVGImageBackground.defaultProps = {
  testID: 'SVGImageBackground',
  subjectSelection: false
};

export default SVGImageBackground;
