import React from 'react';
import { Image } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './style';
import { BoyPng, GirlPng, NeutralPng, Done } from '@images';
import PropTypes from 'prop-types';
import { getWp } from '@utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';

const GenderItem = props => {
  const { testID, type, selectedType, onSelected, style } = props;
  const { boyText, girlText, neutralText } = useLanguage();

  const getGenderTitle = () => {
    if (type === 'F') {
      return `${girlText}`;
    } else {
      return type === 'M' ? `${boyText}` : `${neutralText}`;
    }
  }

  const getAvatorImage = () => {
    if (type === 'F') {
      return GirlPng;
    } else {
      return type === 'M' ? BoyPng : NeutralPng;
    }
  }

  return (
    <TouchableOpacity
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.container, style]}
      onPress={() => { onSelected(type); }}>
      <Image
        accessible={true}
        testID="ImageWithIconImage"
        accessibilityLabel="ImageWithIconImage"
        style={{ width: getWp(80), height: getWp(80) }}
        source={getAvatorImage()}
      />
      <BalooThambiRegTextView testID="GenderItemTitleTxt" style={styles.text}> {getGenderTitle()} </BalooThambiRegTextView>
      {type === selectedType && (
        <Done
          accessible={true}
          testID="GenderItemDoneImg"
          accessibilityLabel="GenderItemDoneImg"
          width={getWp(20)}
          height={getWp(20)}
          style={styles.selected}
        />
      )}
    </TouchableOpacity>
  );
};

GenderItem.propTypes = {
  testID: PropTypes.string,
  type: PropTypes.string,
  selectedType: PropTypes.string,
  onSelected: PropTypes.func,
  style: PropTypes.object,
};

GenderItem.defaultProps = {
  testID: 'GenderItem',
  type: 'F',
  selectedType: 'F',
  onSelected: () => { console.log('on selected .. '); }
};
export default GenderItem;
