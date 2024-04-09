/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  CommonHeader,
  BalooThambiRegTextView,
  RoundedButton,
  PicturePassword,
} from '@components';
import styles from './style';
import { useStores } from '@mobx/hooks';
import { getWp, getHp } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';
import { ApiEndPoint, ScreenNames } from '@constants';
import { API } from '@api';
import { screenLogging, setAsValue } from '@utils';
import { getVersion } from 'react-native-device-info';

const CurrentPicturePasswordScreen = props => {
  const [passwordSeleted, setPasswordSelected] = useState(0);
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [row3, setRow3] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');

  const text = 'Select your current favorite';
  const { changePassNolineBreak, currentPassText, nextText } = useLanguage();
  const store = useStores();
  const { loginStore } = store;

  const validatePassword = passwordValidation(row1, row2, row3, loginStore, store, setErrorMessage, props);

  const onSelectPassword = type => {
    setPasswordSelected(passwordSeleted =>
      type === 'inc' ? passwordSeleted >= 3 ? 3 : passwordSeleted + 1 : passwordSeleted <= 0 ? 0 : passwordSeleted - 1,
    );
  };

  useEffect(() => {
    screenLogging('Change picture password screen');
  }, []);

  return (
    <View style={styles.flexOne}>
      <View style={{ flex: 0.1 }}>
        <CommonHeader
          testID="HeaderChangeCurrPicPassBackBtn"
          type={'back'}
          containerStyle={{ flex: 1 }}
          onClick={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.contentStyle}>
          <BalooThambiRegTextView
            testID="ChangeCurrPicPassNoLineBreak"
            style={styles.title}>
            {changePassNolineBreak}
          </BalooThambiRegTextView>
          <View style={styles.flexOne}>
            <BalooThambiRegTextView
              testID="ChangeCurrPicPassText"
              style={styles.subtitle}>
              {currentPassText}
            </BalooThambiRegTextView>
            <PicturePassword
              testID="PicturePasswordChangeCurrPicPassAnimals"
              onSelectPassword={onSelectPassword}
              category="animals"
              textStyle={styles.whiteText}
              onPress={val => {
                setRow1(val);
              }}
              row="a"
              text={text}
            />
            <PicturePassword
              testID="PicturePasswordChangeCurrPicPassAnimals"
              onSelectPassword={onSelectPassword}
              category="fruits"
              textStyle={styles.whiteText}
              row="b"
              text={text}
              onPress={val => {
                setRow2(val);
              }}
            />
            <PicturePassword
              testID="PicturePasswordChangeCurrPicPassFood"
              category="food"
              textStyle={styles.whiteText}
              onSelectPassword={onSelectPassword}
              row="c"
              text={text}
              onPress={val => {
                setRow3(val);
              }}
            />

            {ErrorMessage ?
              <Text
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: 18,
                  padding: '5%',
                }}>
                {ErrorMessage}
              </Text> : null}
            <RoundedButton
              testID="RoundedButtonChangeCurrPicPass"
              text={nextText}
              type={
                passwordSeleted === 3
                  ? 'elevatedOrange'
                  : 'squareDisabledElevated'
              }
              width={getWp(180)}
              height={getHp(70)}
              disabled={passwordSeleted === 3 ? false : true}
              onPress={() => {
                validatePassword();
              }}
              textStyle={styles.whiteButtonText}
            />
          </View>
        </View>
      </ScrollView>
      {/* </LottieBackground> */}
    </View>
  );
};

export default CurrentPicturePasswordScreen;

const passwordValidation = (row1, row2, row3, loginStore, store, setErrorMessage, props) => {
  return async () => {
    try {
      let selectedPassword = row1 + '|' + row2 + '|' + row3;
      let versionString = getVersion()
      const req = {
        body: {
          username: loginStore.username,
          password: selectedPassword,
          passwordType: 'picture',
          app_id: store.loginStore.appId,
          platform: 'app',
          version: versionString
        },
        store,
      };

      let response;
      response = await API(ApiEndPoint.VALID_PASSWORD_V3, req);
      if (response.data.resultCode === 'CL001') {
        setErrorMessage(response.data.resultMessage);
        await setAsValue('HeartBeatInterval', response?.data?.heartbeatInterval);
        store.appStore.setValidatePassordApiCalled(!store.appStore.validatepasswordApiCalled);
      } else {
        setErrorMessage('');
        props.navigation.navigate(ScreenNames.ChangeNewPicturePasswordScreen, { selectedPassword: selectedPassword });
      }
    } catch (err) {
      console.log('Validate_Password = ', err);
    }
  };
}

