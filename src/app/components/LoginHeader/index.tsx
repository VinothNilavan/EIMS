import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SmallRoundButton, NeedHelp } from '@components';
import styles from './indexCss';
import { clearUserData } from '@utils';
import PropTypes from 'prop-types';
import { Logo, GuestAccount, Leaves, BackgroundFigure } from '@images';
import { COLORS, ScreenNames } from '@constants';
import { useStores } from '@mobx/hooks';

const Header = props => {
  const { testID, containerStyle, iconStyle, hideBackButton, onBack, isNewFlow, helpNeedEnable, fromSubscription } =
    props;
  const [show, setShow] = useState(false);
  let navigation = useNavigation();
  const store = useStores();
  const onBackPress = () => {
    if (fromSubscription) {
      clearUserData(store, navigation, ScreenNames.LoginScreen)
    } else if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const NeedHelpSymbol = (
    <TouchableOpacity style={styles.NeedHelpContainer} onPress={() => { setShow(true) }}>
      <Text style={styles.NeedHelpTextStyle}>
        ?
      </Text>
    </TouchableOpacity>
  )

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.lottieContainer}>
        {show ? <NeedHelp showModal={true} onClick={() => setShow(false)} /> : null}
        <BackgroundFigure
          accessible={true}
          testID="LoginHeaderBackgroundImg"
          accessibilityLabel="LoginHeaderBackgroundImg"
          style={styles.backgroundFigure}
        />
        <Leaves
          accessible={true}
          testID="LoginHeaderLeavesImg"
          accessibilityLabel="LoginHeaderLeavesImg"
          style={styles.leaves}
        />
        {helpNeedEnable ? NeedHelpSymbol : null}
        <Logo
          accessible={true}
          testID="LoginHeaderLogoImg"
          accessibilityLabel="LoginHeaderLogoImg"
          style={styles.logo}
          height={styles.logo.height}
          width={styles.logo.width}
        />
        <GuestAccount
          accessible={true}
          testID="LoginGuestAccountImg"
          accessibilityLabel="LoginGuestAccountImg"
          style={styles.students}
        />
      </View>
      {!hideBackButton && (
        <View
          style={{
            ...(isNewFlow ? styles.newRoundBtn : styles.roundBtn),
            ...iconStyle,
          }}>
          <SmallRoundButton
            testID={'SmallRoundButtonLoginHeader'}
            onPress={() => onBackPress()}
            iconName={iconStyle.iconName}
            iconColor={iconStyle.iconColor}
            iconTheme={iconStyle.iconTheme}
            type={iconStyle.type}
            width={iconStyle.width}
            height={iconStyle.height}
            borderRadius={20}
          />
        </View>
      )}
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
  hideBackButton: PropTypes.bool,
};

Header.defaultProps = {
  testID: 'LoginHeader',
  theme: 'ocean',
  lottieFileName: 'naandi_header',
  hideBackButton: false,
  iconStyle: {
    iconName: 'left',
    iconColor: COLORS.white,
    iconTheme: 'AntDesign',
    type: 'lightPink',
    width: 40,
    height: 40,
  },
  onPress: () => { console.log("Login header on click default") }
};

export default Header;