import React from 'react';
import { View, Image } from 'react-native';
import styles from './indexCss';
import { BalooThambiBoldTextView } from '@components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getWp, getHp, getImages } from '@utils';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';

const SortListQuestion = props => {
  const {
    testID,
    item,
    index,
    callBackForAssignAnswer,
    dragAndDropCallback,
    disableClick,
    updatedZIndex,
  } = props;
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;
  const position = isRTL ? 'right' : 'center';

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{
        ...styles.arrangeLetterContainerParentView,
        zIndex: item.zIndex,
      }}>
      {item.isSelected === false ? (
        <TouchableOpacity
          accessible={true}
          testID="SortListQuestionTouchableComp"
          accessibilityLabel="SortListQuestionTouchableComp"
          style={styles.elevatedContainer}
          disabled={disableClick}
          onLongPress={() => {
            dragAndDropCallback(false);
          }}
          onPressOut={() => {
            dragAndDropCallback(true);
            callBackForAssignAnswer(
              item,
              index,
              callBackForAssignAnswer,
              updatedZIndex);
          }}>
          <View
            pointerEvents={'none'}
            style={styles.arrangeLetterContainerChildView}>
            {item?.isImage ? (
              <Image
                source={{
                  uri: getImages(item?.value)[0],
                }}
                style={{ width: getWp(130), height: getHp(110) }}
                resizeMode="contain"
              />
            ) : (
              <BalooThambiBoldTextView style={[styles.webviewContainer, { textAlign: position, marginRight: isRTL ? getWp(12) : 0 }]}>{item.value}</BalooThambiBoldTextView>
            )}
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

SortListQuestion.propTypes = {
  testID: PropTypes.string,
};

SortListQuestion.defaultProps = {
  testID: 'SortListQuestion',
};

export default SortListQuestion;
