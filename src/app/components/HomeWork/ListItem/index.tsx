/**
 * Topic list item
 * Upper Tag is in attempts or due date
 * isPriority and isRevice are upper left top strip
 */
import React from 'react';
import { View, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import NormalText from '../../NormalText';
import styles from '../../RoundedButton/indexCss';
import compStyles from './indexCss';
import PropTypes from 'prop-types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ListItem = props => {
  const {
    testID,
    title,
    desc,
    leftImage,
    isUpperTag,
    upperTagText,
    rightText,
    type,
    btnStyle,
    isDueExpire, //Due date is more than 2 days before current date
    onClickCallback,
  } = props;

  let cardUpperTag = null;
  let disabledStyle = {};

  if (isUpperTag) {
    let upperTagStyle = {};
    let upperTagTextStyle = {};
    upperTagStyle = { ...compStyles.cardUpperTag };
    upperTagTextStyle = { ...compStyles.cardUpperTagText };
    if (isDueExpire) {
      upperTagStyle = { ...upperTagStyle, ...compStyles.upperTagExpire };
      upperTagTextStyle = {
        ...upperTagTextStyle,
        ...compStyles.upperTagExpireText,
      };
    }
    cardUpperTag = (
      <View style={upperTagStyle}>
        <NormalText styles={upperTagTextStyle} text={upperTagText} />
      </View>
    );
  }

  return (
    <View>
      <AwesomeButton
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        {...styles[type]}
        width={btnStyle.width}
        height={btnStyle.height}
        borderRadius={25}
        onPress={onClickCallback}>
        <View key="btnContainer" style={compStyles.btnContainer}>
          <View key="btnLeftContainer" style={compStyles.btnLeftContainer}>
            <View style={compStyles.imageHolder}>
              <Image
                accessible={true}
                testID="ListItemImage"
                accessibilityLabel="ListItemImage"
                source={leftImage}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </View>
          </View>
          <View key="btnMidContainer" style={compStyles.btnMidContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <NormalText
                testID="ListItemTitle"
                styles={{ ...compStyles.btnMidUpperText, ...disabledStyle }}
                text={title}
              />
              <NormalText
                testID="ListItemDesc"
                styles={{ ...compStyles.btnMidLowerText, ...disabledStyle }}
                text={desc}
              />
            </View>
          </View>
          <View key="btnRightContainer" style={compStyles.btnRightContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <NormalText testID="ListItemRightText" styles={{ ...compStyles.rightText }} text={rightText} />
            </View>
          </View>
        </View>

        {cardUpperTag}
      </AwesomeButton>
    </View>
  );
};

ListItem.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  leftImage: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  showAttempt: PropTypes.string,
  isUpperTag: PropTypes.bool,
  upperTagText: PropTypes.bool,
  type: PropTypes.string,
  containerStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  textStyle: PropTypes.object,
  isDueExpire: PropTypes.bool,
  onClickCallback: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  testID: 'ListItem',
  btnStyle: {
    width: wp('71.4'),
    height: hp('11.7'),
  },
  type: 'secondaryWhite',
};

export default ListItem;
