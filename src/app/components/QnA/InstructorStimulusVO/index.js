import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MyAutoHeightWebView } from '@components';
import { SoundSvg } from '@images';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { SimpleHtmlTemplate, getWp } from '@utils';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const InstructorStimulusVO = props => {
  const { testID, showInsStVO, playSound } = props;
  const { qnaStore, uiStore } = useStores();
  const [instStimulusVal, setInstStimulusVal] = useState();
  const isRTL = uiStore.isRTL;

  useEffect(() => {
    let local_instStimulusVal = qnaStore?.currentQuestion?.instructorStimulus?.value;
    if (local_instStimulusVal) {
      local_instStimulusVal = SimpleHtmlTemplate(local_instStimulusVal);
    }
    setInstStimulusVal(local_instStimulusVal);
  }, [qnaStore?.currentQuestion?.instructorStimulus?.value])

  return (
    (showInsStVO || instStimulusVal) ?
      <View
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={
          isRTL
            ? styles.RTLInstructorStimulusContainer
            : styles.instructorStimulusContainer
        }>
        {showInsStVO && (
          <TouchableOpacity
            accessible={true}
            testID="InstructorStimulusSound"
            accessibilityLabel="InstructorStimulusSound"
            style={{
              ...styles.soundIconContainer,
              ...{ marginRight: isRTL ? 0 : getWp(12) },
            }}
            onPress={() => playSound('instStimulusVO')}>
            <SoundSvg
              width={styles.soundIcon.width}
              height={styles.soundIcon.height}
            />
          </TouchableOpacity>
        )}
        <View
          accessible={true}
          testID="InstructorStimulusTextContainer"
          accessibilityLabel="InstructorStimulusTextContainer"
          style={
            isRTL
              ? styles.RTLInstructorStimulusTextContainer
              : styles.instructorStimulusTextContainer
          }>
          <MyAutoHeightWebView
            style={[
              isRTL
                ? styles.RTLInstructorStimulusText
                : styles.instructorStimulusText,
              { width: wp(80) },
            ]}
            files={[]}
            customScript={''}
            customStyle={``}
            onSizeUpdated={size => {
              console.log('height :', size.height);
            }}
            source={{
              html: instStimulusVal,
            }}
            zoomable={true}
          />
        </View>
      </View> : null
  );
};

InstructorStimulusVO.propTypes = {
  testID: PropTypes.string,
};

InstructorStimulusVO.defaultProps = {
  testID: 'InstructorStimulusVO',
};

export default InstructorStimulusVO;
