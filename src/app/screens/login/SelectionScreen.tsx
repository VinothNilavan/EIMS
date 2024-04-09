import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';

import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE, ScreenNames } from '@constants';
import { CustomButton, CommonHeader } from '@components';
import { observer } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import { HeaderType } from '../../utils/helper';

const SelectionScreen = props => {
  const navigation = useNavigation();
  const { loginStore } = useStores();

  const login = () => {
    loginStore.setIsOtpLogin(true);
    navigation.navigate(ScreenNames.LoginScreen);
  };

  const register = () => {
    navigation.navigate(ScreenNames.StudentDetailsScreen);
  };

  return (
    <Fragment>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={{ backgroundColor: 'white' }}>
        <View style={styles.screen}>
          <CommonHeader
            headerType={HeaderType.login}
            testID="LoginHeaderTextPassword"
            containerStyle={styles.header}
            hideBackButton={false}
            iconStyle={{
              iconName: 'left',
              iconColor: COLORS.maroon,
              iconTheme: 'AntDesign',
              type: 'maroon',
              width: 30,
              height: 30,
            }}
            isNewFlow={true}
            onBack={() => {
              navigation.navigate(ScreenNames.LoginScreen);
            }}
          />
          <View style={styles.innerContainer}>
            <View style={styles.btnContainer}>
              <CustomButton
                disabled={false}
                testId={'showlogin'}
                onSubmit={login}
                btnText={'I am already using Mindspark'}
              />
            </View>
            <View style={styles.btnContainer}>
              <CustomButton
                disabled={false}
                testId={'showRegister'}
                onSubmit={register}
                btnTextStyle={styles.btnTextStyle}
                btnText={'Register as a new user to Mindspark'}
                maroon
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: getHp(840),
  },
  header: {
     marginBottom: getHp(42) 
  },
  innerContainer: {
    paddingHorizontal: getWp(33),
    paddingVertical: getHp(50),
    width: '100%',
  },
  errorMessage: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text16,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: getHp(60),
  },
  btnTextStyle: {
    textAlign: 'center',
  },
});

export default observer(SelectionScreen);
