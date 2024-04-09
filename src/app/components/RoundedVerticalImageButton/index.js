import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import { BalooThambiRegTextView } from '@components';
import { useStores } from '@mobx/hooks';
import { TEXTFONTSIZE } from '@constants';
import { getHp } from '@utils';

const RoundedVerticalImageButton = props => {
  const { SvgImage, containerStyle, text, textStyle, onPress } = props;
  const { appStore } = useStores();

  let lanTextStyle = null;
  let userLanguage = appStore?.userLanguage;

  if (userLanguage === 'ta') {
    lanTextStyle = { 
      ...lanTextStyle,
      fontSize: TEXTFONTSIZE.Text12,
      lineHeight: getHp(16),
    };
  }

  let btnTextStyle = {
    ...styles.text,
    ...textStyle,
    ...lanTextStyle,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <SvgImage />
      <BalooThambiRegTextView style={btnTextStyle}>
        {text}
      </BalooThambiRegTextView>
    </TouchableOpacity>
  );
};

RoundedVerticalImageButton.propTypes = {
  SvgImage: PropTypes.any,
  containerStyle: PropTypes.any,
};

RoundedVerticalImageButton.defaultProps = {
  onPress: () => { console.log(`RoundedVerticalImageButton default`) },
};

export default RoundedVerticalImageButton;
