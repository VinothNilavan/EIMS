import React from 'react';
import { View, Image } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { getWp, getHp } from '@utils';
import { COLORS } from '@constants';
import { BalooThambiBoldTextView } from '@components';
import { useStores } from '@mobx/hooks';

const MatchQuestion = props => {
  const { testID, item, isExplaination } = props;
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;
  const direction = isRTL ? 'right' : 'left';

  const getImages = string => {
    const imgRex = /<img.*?src='(.*?)'[^>]+>/g;
    const images = [];
    let img;
    while ((img = imgRex.exec(string))) {
      images.push(img[1]);
    }
    return images;
  };

  const isImage = `${item?.value}`.includes('<img') ? true : false;

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[
        styles.container,
        {
          minHeight: item?.isImage ? getHp(110) : getHp(68),
          marginTop: getWp(12),
          backgroundColor: isExplaination
            ? COLORS.white
            : COLORS.sortListQuestionBackgroundColor,
        },
      ]}>
      <View style={styles.arrangeLetterContainerChildView}>
        {isImage ? (
          <Image
            source={{
              uri: getImages(item?.value)[0],
            }}
            style={{ width: getWp(130), height: getHp(110) }}
            resizeMode="contain"
          />
        ) : (item &&
          <BalooThambiBoldTextView
            style={[item?.isImage ? styles.imageContainer : styles.webviewContainer, { textAlign: direction }]}>
            {item.value}
          </BalooThambiBoldTextView>
        )}
      </View>
    </View>
  );
};

MatchQuestion.propTypes = {
  testID: PropTypes.string,
  item: PropTypes.object,
  index: PropTypes.number,
  isExplaination: PropTypes.bool,
};

MatchQuestion.defaultProps = {
  testID: 'MatchQuestion',
  isExplaination: false,
};

export default MatchQuestion;
