import React from 'react';
import { View } from 'react-native';
import {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  SimpleLottie,
} from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Onboarding = props => {
  const { testID, title, desc, lottieFileName, currIndex } = props;
  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={styles.container}>
      <View style={styles.textContainer}>
        <SourceSansProBoldTextView
          testID="OnBoardingTitle"
          style={styles.title}>
          {title}
        </SourceSansProBoldTextView>
        <SourceSansProRegTextView testID="OnBoardingDesc" style={styles.desc}>
          {desc}
        </SourceSansProRegTextView>
      </View>
      <View style={styles.lottieContainer}>
        <SimpleLottie
          testID="SimpleLottieOnboarding"
          jsonFileName={lottieFileName}
          theme="generic"
          style={styles.image}
          loop={false}
          autoPlay={false}
          currIndex={currIndex}
        />
      </View>
    </View>
  );
};

Onboarding.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  lottieFileName: PropTypes.string.isRequired,
};

Onboarding.defaultProps = {
  testID: 'Onboarding',
  lottieFileName: 'titles',
};

export default Onboarding;
