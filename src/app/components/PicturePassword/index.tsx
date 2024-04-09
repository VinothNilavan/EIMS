import React, { useState } from 'react';
import { View } from 'react-native';
import { PicturePasswordItem, SourceSansProRegTextView } from '@components';
import { Cat } from '@images';
import { PicturePasswordSvgs } from '@helpers';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';

const PicturePassword = props => {
  const { uiStore } = useStores();
  const [selectedIndex, setselectedIndex] = useState(0);
  const {
    selectYourFavouriteAnimal,
    selectYourFavouriteFruit,
    selectYourFavoriteFood,
  } = useLanguage();
  const {
    category,
    onSelectPassword,
    containerStyle,
    onPress,
    textStyle,
    text,
    row,
  } = props;

  const { svg1, svg2, svg3, svg4, svg5, svg6 } = PicturePasswordSvgs[category];

  const onSelect = index => {
    if (selectedIndex === index) {
      setselectedIndex(0);
      onSelectPassword('dec');
    } else {
      if (selectedIndex === 0) {
        onSelectPassword('inc');
      }
      setselectedIndex(index);
    }
  };

  const getTitle = category => {
    if (category) {
      if (category === 'animals') {
        return selectYourFavouriteAnimal;
      } else if (category === 'fruits') {
        return selectYourFavouriteFruit;
      } else if (category === 'food') {
        return selectYourFavoriteFood;
      } else {
        return `${text} ${category}`;
      }
    }
  };
  const isRTL = uiStore.isRTL;

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <SourceSansProRegTextView
        testID="PicturePasswordTitle"
        style={{ ...styles.text, ...textStyle }}>
        {getTitle(category)}
      </SourceSansProRegTextView>
      <View
        style={
          isRTL
            ? styles.picturePasswordRTLContainer
            : styles.picturePasswordContainer
        }>
        <PicturePasswordItem
          testID="ItemPicturePasswordImg1"
          SvgImage={svg1}
          onSelectPassword={() => {
            onSelect(1);
            onPress(row + 'img1');
          }}
          isSelected={selectedIndex === 1}
        />
        <PicturePasswordItem
          testID="ItemPicturePasswordImg2"
          SvgImage={svg2}
          onSelectPassword={() => {
            onSelect(2);
            onPress(row + 'img2');
          }}
          isSelected={selectedIndex === 2}
        />
        <PicturePasswordItem
          testID="ItemPicturePasswordImg3"
          SvgImage={svg3}
          onSelectPassword={() => {
            onSelect(3);
            onPress(row + 'img3');
          }}
          isSelected={selectedIndex === 3}
        />
        <PicturePasswordItem
          testID="ItemPicturePasswordImg4"
          SvgImage={svg4}
          onSelectPassword={() => {
            onSelect(4);
            onPress(row + 'img4');
          }}
          isSelected={selectedIndex === 4}
        />
        <PicturePasswordItem
          testID="ItemPicturePasswordImg5"
          SvgImage={svg5}
          onSelectPassword={() => {
            onSelect(5);
            onPress(row + 'img5');
          }}
          isSelected={selectedIndex === 5}
        />
        <PicturePasswordItem
          testID="ItemPicturePasswordImg6"
          SvgImage={svg6}
          onSelectPassword={() => {
            onSelect(6);
            onPress(row + 'img6');
          }}
          isSelected={selectedIndex === 6}
        />
      </View>
    </View>
  );
};

PicturePassword.propTypes = {
  testID: PropTypes.string,
  category: PropTypes.string.isRequired,
  svgObj: PropTypes.object.isRequired,
  text: PropTypes.string,
  textStyle: PropTypes.object,
};

PicturePassword.defaultProps = {
  testID: 'PicturePassword',
  category: 'animals',
  text: 'Select your favourite',
  svgObj: {
    svg1: Cat,
    svg2: Cat,
    svg3: Cat,
    svg4: Cat,
    svg5: Cat,
    svg6: Cat,
  },
};

export default PicturePassword;
