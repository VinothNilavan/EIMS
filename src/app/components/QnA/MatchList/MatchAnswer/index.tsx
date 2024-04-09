import React from 'react';
import { View, Image } from 'react-native';
import styles from './style';
import { BalooThambiBoldTextView } from '@components';
import PropTypes from 'prop-types';
import { COLORS } from '@constants';
import AwesomeButton from 'react-native-really-awesome-button';
import { getWp, getHp } from '@utils';
import { useStores } from '@mobx/hooks';

const MatchAnswer = props => {
  const { item, drag, isExplaination } = props;
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


  return (
    <AwesomeButton
      width={item?.isImage ? getWp(130) : getWp(170)}
      height={item?.isImage ? getHp(110) : getHp(68)}
      raiseLevel={0}
      onPress={drag}
      borderWidth={getWp(1)}
      borderColor={COLORS.dotLineColor}
      borderRadius={getWp(5)}
      borderStyle="dashed"
      style={item?.isImage ? styles.imageContainer : styles.container}
      backgroundDarker={
        isExplaination ? COLORS.white : COLORS.sortListQuestionBackgroundColor
      }
      backgroundColor={
        isExplaination ? COLORS.white : COLORS.sortListQuestionBackgroundColor
      }>
      <View
        style={item?.isImage ? {} : styles.arrangeLetterContainerChildView}
        accessible={false}
        pointerEvents={'none'}>
        {item?.isImage ? (
          <Image
            source={{
              uri: getImages(item?.value)[0],
            }}
            style={{ width: getWp(130), height: getHp(110) }}
            resizeMode="contain"
          />
        ) : (item &&
          <BalooThambiBoldTextView
            style={[styles.webviewContainer, { textAlign: direction }]}>
            {item.value}
          </BalooThambiBoldTextView>

        )}
      </View>
    </AwesomeButton>
  );
};

MatchAnswer.propTypes = {
  isExplaination: PropTypes.bool,
};

MatchAnswer.defaultProps = {
  isExplaination: false,
};

export default MatchAnswer;
