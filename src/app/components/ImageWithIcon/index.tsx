import React from 'react';
import { View, Image } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { SvgCssUri } from 'react-native-svg/css';
import { BoyPng, GirlPng, NeutralPng } from '@images';

const ImageWithIcon = props => {
  const {
    testID,
    imageUrl,
    containerStyle,
    imageStyle,
    gender,
    avatarWidth,
    avatarHeight
  } = props;

  const checkForUserDefaultProfileImage = userDefaultAvatarImage(imageUrl, gender)

  const getProfileUrl = getProfileImageUrl(imageUrl, gender)

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={{ ...styles.container, ...containerStyle }}>
      {checkForUserDefaultProfileImage() ? (
        <SvgCssUri
          accessible={true}
          testID="ImageWithIconImage"
          accessibilityLabel="ImageWithIconImage"
          width={avatarWidth}
          height={avatarHeight}
          uri={imageUrl}
        />
      ) :
        (
          <Image
            accessible={true}
            testID="ImageWithIconImage"
            accessibilityLabel="ImageWithIconImage"
            style={{ ...styles.image, ...imageStyle }}
            source={getProfileUrl()}
          />
        )
      }
    </View>
  );
};

ImageWithIcon.propTypes = {
  testID: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  iconContainerStyle: PropTypes.object,
  avatarHeight: PropTypes.object,
  avatarWidth: PropTypes.object,
};

ImageWithIcon.defaultProps = {
  testID: 'ImageWithIcon',
  imageUrl: '',
  iconUrl: '',
  imageStyle: styles.image,
  avatarHeight: 70,
  avatarWidth: 70
};

export default ImageWithIcon;

const getProfileImageUrl = (imageUrl: any, gender: string) => {
  return () => {
    if (imageUrl !== '') {
      let neutralImg = `${imageUrl}`.includes("neutral.svg");
      if (neutralImg) {
        if (gender === 'M')
          return BoyPng;
        return gender === 'F' ? GirlPng : NeutralPng;
      } else {
        return { uri: imageUrl };
      }
    }
    return NeutralPng;
  };
}

const userDefaultAvatarImage = (imageUrl: any, gender: string) => {
  return () => {
    let extension = imageUrl.split('.').pop();
    let neutralImg = `${imageUrl}`.includes("neutral.svg");
    let isdefaultImg = false;

    if ((gender === 'N' && extension == 'svg' && neutralImg) || (extension == 'svg' && !neutralImg)) {
      isdefaultImg = true;
    }
    return isdefaultImg;
  };
}