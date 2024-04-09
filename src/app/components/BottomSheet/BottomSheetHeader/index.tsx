import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { SourceSansProRegTextView } from '@components';
import { Gift, ArrowUp, Coin } from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';

const BottomSheetHeader = props => {
  const { SvgRight, title, desc, onPress, containerStyle } = props;

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.leftImageContainer}>
        <Coin width={styles.svgLeft.width} height={styles.svgLeft.height} />
      </View>
      <View style={styles.textContainer}>
        <SourceSansProRegTextView style={styles.title}>
          {title}
        </SourceSansProRegTextView>
        <SourceSansProRegTextView style={styles.desc}>
          {desc}
        </SourceSansProRegTextView>
      </View>
      <View style={styles.rightImageContainer}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <SvgRight
              width={styles.svgRight.width}
              height={styles.svgRight.height}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

BottomSheetHeader.propTypes = {
  SvgLeft: PropTypes.func,
  SvgRight: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
};

BottomSheetHeader.defaultProps = {
  SvgLeft: Gift,
  SvgRight: ArrowUp,
  title: 'Sparkies Champ',
  desc: '',
  onPress: () => alert('arrow clicked!'),
};

export default BottomSheetHeader;
