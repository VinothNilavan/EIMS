import React from 'react';
import { View, Animated, Image, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import { BalooThambiBoldTextView } from '@components';
import { useStores } from '@mobx/hooks';
import { getWp, getHp, getImages } from '@utils';

const SortListAnswer = ({
  item,
  resetArrangeLettersElement,
  dragAndDropCallback,
  disableClick,
}) => {
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;
  const position = isRTL ? 'right' : 'center';

  return (
    <View
      ref={viewRef => {
        setTimeout(() => {
          if (item?.ref === null) {
            viewRef?.measure((fx, fy, width, height, px, py) => {
              item.ref = true;
              item.measures = { fx, fy, width, height, px, py };
            });
          }
        }, 4000);
      }}
      style={styles.arrangeLetterContainerParentView}>
      {item.items != null || item.isPrefilling ? (
        <Animated.View>
          <TouchableOpacity
            style={styles.elevatedContainer}
            disabled={disableClick}
            onPressIn={() => {
              console.log('Trigger - ');
              if (item.isPrefilling) {
                return false;
              }
              dragAndDropCallback(true);
              resetArrangeLettersElement(item);
            }}
            onPressOut={() => {
              dragAndDropCallback(false);
            }}>
            {item.isPrefilling ? null : <Text style={styles.crossBtn}>x</Text>}
            <View style={{ justifyContent: 'center', minHeight: getHp(60) }}>
              <View style={styles.arrangeLetterContainerChildView}>
                {item?.items?.isImage ? (
                  <Image
                    source={{
                      uri: getImages(item.isPrefilling ? item.stemVal.value : item?.items?.value)[0],           // Image Qcode : 12236 
                    }}
                    style={{ width: getWp(130), height: getHp(110) }}
                    resizeMode="contain"
                  />
                ) : (
                  <BalooThambiBoldTextView style={[styles.webviewContainer, { textAlign: position, marginRight: isRTL ? getWp(12) : 0 }]}>{item.isPrefilling ? item.stemVal.value : item?.items?.value}</BalooThambiBoldTextView>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default React.memo(SortListAnswer);
