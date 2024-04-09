/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import CardView from 'react-native-cardview'
import {NativeBaseProvider} from 'native-base';
import {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
} from '@components';
import {Gift, SparkyIcon} from '@images';
import styles from './indexCss';
/**
 *
 * @param {title,sutitles,pts} props
 */

const SparkyCard = props => {
  const {testID, title, subtitle, pts } = props;
  return (
    <View
      accessible={true}
      testID={`SparkyCard${testID}`}
      accessibilityLabel={`SparkyCard${testID}`}>
      <NativeBaseProvider>
        <CardView 
             style={styles.card}
             cardElevation={2}
             cardMaxElevation={2}
             cornerRadius={10}
        >
          {/* <View style={styles.card}> */}
          <View style={styles.mainView}>
            <View style={styles.firstView}>
              {/* Spark image and pts in column*/}
              <Image
                accessible={true}
                testID={`SparkyImage${testID}`}
                accessibilityLabel={`SparkyImage${testID}`}
                source={SparkyIcon}
                width={styles.svgStyle.width}
                height={styles.svgStyle.height}
              />
              <SourceSansProBoldTextView
                testID={`SparkyPts${testID}`}
                style={styles.pts}>
                {pts}
              </SourceSansProBoldTextView>
            </View>
            <View style={styles.secondView}>
              {/* Title and subtitle in column */}
              <SourceSansProBoldTextView
                testID={`SparkyTitle${testID}`}
                style={styles.title}>
                {title}
              </SourceSansProBoldTextView>
              <SourceSansProRegTextView
                testID={`SparkySubtitle${testID}`}
                style={styles.subtitle}>
                {subtitle}
              </SourceSansProRegTextView>
            </View>
          </View>
        </CardView>
        {/* </View> */}
      </NativeBaseProvider>
    </View>
  );
};

SparkyCard.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  pts: PropTypes.number,
  SvgLeft: PropTypes.func,
};

SparkyCard.defaultProps = {
  testID: 'SparkyCard',
  title: '',
  subtitle: '',
  pts: '0',
  SvgLeft: Gift,
};

export default SparkyCard;
