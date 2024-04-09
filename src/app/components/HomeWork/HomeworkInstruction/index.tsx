// External Imports
import React, { useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// Internal Imports
import { SourceSansProBoldTextView, MyAutoHeightWebView } from '@components';
import styles from './style';
import { SimpleHtmlTemplate } from '@utils';

const HomeworkInstruction = props => {
  let { testID, instruction, containerStyle, instructionStyle } = props;

  useEffect(() => {
    if (instruction && typeof instruction !== 'undefined' && instruction !== '' && instruction.value) {
      instruction = SimpleHtmlTemplate(instruction.value);
    }
  }, [instruction]);

  return (
    <View
      accessible={true}
      testID={testID}
      style={[styles.container, containerStyle]}>
      <SourceSansProBoldTextView
        testID="HomeworkInstructionText"
        style={styles.titleText}>
        Instructions:
      </SourceSansProBoldTextView>
      <View style={[styles.webViewContainer, instructionStyle]}>
        <MyAutoHeightWebView
          testID="MyAutoHeightWebViewHomeworkInstructions"
          style={[styles.webViewContainer, instructionStyle]}
          files={[]}
          customScript={``}
          customStyle={``}
          onSizeUpdated={(size) => { console.log(size) }}
          source={{
            html: instruction,
          }}
          zoomable={true}
        />
      </View>
    </View>
  );
};

HomeworkInstruction.propTypes = {
  testID: PropTypes.string,
  instruction: PropTypes.string.isRequired,
  containerStyle: PropTypes.func,
  instructionStyle: PropTypes.func,
};

HomeworkInstruction.defaultProps = {
  testID: 'HomeworkInstruction',
  instruction: '',
};

export default HomeworkInstruction;