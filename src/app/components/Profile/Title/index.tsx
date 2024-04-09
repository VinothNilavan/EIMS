import React from 'react';
import { Text, View } from 'react-native';
import { SvgTitle } from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { SvgCssUri } from 'react-native-svg/css';

const Title = props => {
  const { testID, text, containerStyle, textStyle, svgURI } = props;
  let { SvgImage } = props;
  if (!SvgImage) {
    SvgImage = SvgTitle;
  }
  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={{ ...styles.container, ...containerStyle }}>
      <View key="svgContainer" style={styles.svgContainer}>
        {svgURI ? (
          <SvgCssUri
            accessible={true}
            testID="TitleSvgUri"
            accessibilityLabel="TitleSvgUri"
            uri={svgURI}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
        ) : (
          <SvgImage
            accessible={true}
            testID="TitleSvgImage"
            accessibilityLabel="TitleSvgImage"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
        )}
      </View>
      <View key="textContainer" style={styles.textContainer}>
        <Text
          accessible={true}
          testID="TitleText"
          accessibilityLabel="TitleText"
          style={{ ...styles.text, ...textStyle }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

Title.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  SvgImage: PropTypes.func,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

Title.defaultProps = {
  testID: 'Title',
  SvgImage: SvgTitle,
};

export default Title;
