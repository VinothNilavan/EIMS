import React from 'react';
import { View } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS } from '@constants';
import { SimpleLottie, SmallRoundButton } from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Header = props => {
  const { testID, theme, lottieFileName, onPress, containerStyle, iconStyle } = props;
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={{ ...styles.container, ...containerStyle }}>
      <SimpleLottie
        testID="SimpleLottieHeaderPicturePasssword"
        jsonFileName={lottieFileName}
        theme={theme}
        style={styles.lottie}
      />
      <View style={{ ...styles.roundBtn, ...iconStyle }}>
        <SmallRoundButton
          testID="SmallRoundButtonPicturePassword"
          onPress={() => onPress}
          iconName={iconStyle.iconName}
          iconColor={iconStyle.iconColor}
          iconTheme={iconStyle.iconTheme}
          type={iconStyle.type}
          width={40}
          height={40}
          borderRadius={20}
        />
      </View>
    </View>
  );
};

Header.propTypes = {
  testID: PropTypes.string,
  theme: PropTypes.string,
  lottieFileName: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  iconStyle: PropTypes.object,
};

Header.defaultProps = {
  testID: 'Header',
  theme: 'ocean',
  lottieFileName: 'header',
  iconStyle: {
    iconName: 'left',
    iconColor: COLORS.progressBlue,
    iconTheme: 'AntDesign',
    type: 'primaryWhite',
    width: getWp(40),
    height: getHp(40),
  },
};

export default Header;
