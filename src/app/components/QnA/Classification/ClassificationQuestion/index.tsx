import React, { useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import ClassificationPan from '@hooks/ClassificationPan';
import styles from './indexCss';
import { MyAutoHeightWebView } from '@components';
import { useStores } from '@mobx/hooks';
import PropTypes from 'prop-types';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { SourceSansProRegTextView } from '@components';

const ClassificationQuestion = props => {
  const {
    testID,
    item,
    dragToContainer1,
    dragToContainer2,
    dragAndDropCallback,
    disableClick,
    updatedZIndex,
    onDragEnd,
    isWebView
  } = props;

  const store = useStores();
  const [dataAvailable, setDataAvailable] = useState(false);
  const [questionTree, setQuestionTree] = useState([]);
  const isRTL = store?.uiStore?.isRTL;

  const [animateValue, panResponder] = ClassificationPan(
    item,
    dragToContainer1,
    dragToContainer2,
    isRTL,
    updatedZIndex,
  );

  const animatedStyle = { transform: animateValue.getTranslateTransform() };

  useEffect(() => {
    setQuestionTree(getHtmlTemplate(item?.value, false, isRTL));
    setDataAvailable(true);
  }, []);

  return (
    dataAvailable &&
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.arrangeLetterContainerParentView, zIndex: item.zIndex }}>
      {item.isSelected === false ? (
        <Animated.View style={{ ...animatedStyle }} {...panResponder.panHandlers}>
          <TouchableOpacity
            accessible={true}
            testID="ClarificationQuestionTouchableComp"
            accessibilityLabel="ClarificationQuestionTouchableComp"
            style={styles.elevatedContainer}
            disabled={disableClick}
            onPressIn={() => dragAndDropCallback(true)}
            onPressOut={() => dragAndDropCallback(false)}>
            <View
              pointerEvents={'none'}
              style={styles.arrangeLetterContainerChildView}>
              {(!isWebView) ? <SourceSansProRegTextView style={styles.bucketFont}>{item.value}</SourceSansProRegTextView> :
                <MyAutoHeightWebView
                  testID="MyAutoHeightWebViewClarificationQuestion"
                  key="mcqItemWebView"
                  style={styles.webviewContainer}
                  customScript={''}
                  scrollEnabled={false}
                  source={{ html: questionTree }}
                  zoomable={false}
                />
             }
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        onDragEnd(item.index)
      )}
    </View>
  );
};

ClassificationQuestion.propTypes = {
  testID: PropTypes.string,
};

ClassificationQuestion.defaultProps = {
  testID: 'ClassificationQuestion',
  onDragEnd: () => { console.log('on drag end'); }
};

export default ClassificationQuestion;
