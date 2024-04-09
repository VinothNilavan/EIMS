import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SoundSvg } from '@images';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import PropTypes from 'prop-types';

const QBodyVO = props => {
  const { testID, show, playSound, type } = props;
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  let voContainerStyle = isRTL ? styles.RTLQbodyVoiceOverContainer : styles.QbodyVoiceOverContainer;

  if (type == 'quesVo') {
    voContainerStyle = styles.quesVOContainer;
  }

  let voView = null;
  if (show) {
    voView = (
      <View
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={voContainerStyle}>
        <TouchableOpacity
          style={styles.soundIconContainer}
          key="questionBodyVoiceover"
          onPress={() => playSound(type)}>
          <SoundSvg
            width={styles.soundIcon.width}
            height={styles.soundIcon.height}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return voView;
};

QBodyVO.propTypes = {
  testID: PropTypes.string,
};

QBodyVO.defaultProps = {
  testID: 'QBodyVO',
  type: 'quesBodyVO',
};

export default QBodyVO;