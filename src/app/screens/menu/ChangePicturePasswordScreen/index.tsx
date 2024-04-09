/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BalooThambiRegTextView,
  RoundedButton,
  PicturePassword,
  SuccessPopup,
  DetailsScreen,
  MessagePopup,
} from '@components';
import styles from './style';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { ApiEndPoint, ScreenNames } from '@constants';
import { API } from '@api';
import { ScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';

const ChangePicturePasswordScreen = props => {
  const store = useStores();
  const [passwordSeleted, setPasswordSelected] = useState(0);
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [row3, setRow3] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const { changePassNolineBreak, passChangedSuccessfully, incorrectPassLabel, tryAgainBtnText, uhHoText, confirYourPasswodText, newAndConfirmPassMissMatch } = useLanguage();

  const text = 'Select your favorite';
  const currentPassword = props?.route?.params?.currentPassword;
  const newPassword = props?.route?.params?.newPassword;

  const updatePassword = async body => {
    try {
      let req = {
        body: body,
        store: store,
      };
      console.log('APP respp reqbody', body)
      let res = await API(ApiEndPoint.UPDATE_PASSWORD, req);
      if (res.data.resultCode === 'C001') {
        setShowSuccessPopup(true);
      } else {
        setErrorMessage(incorrectPassLabel)
        setShowMessagePopup(true);
      }
    } catch (error) {
      console.log(`updatePassword error ${error}`)
    }

  };

  const onSelectPassword = type => {
    setPasswordSelected(passwordSeleted =>
      type === 'inc' ? passwordSeleted + 1 : passwordSeleted - 1,
    );

    console.log('passwordSeleted:', passwordSeleted);
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  const onMessageCloseHandler = () => {
    setShowSuccessPopup(false);
    props.navigation.navigate(ScreenNames.ProfileScreen);
  };

  return (
    <DetailsScreen
      testID="DetailsScreenChangePicPassBackBtn"
      accessibilityLabel="changePicPassBackBtn"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <ScrollView>
        <View style={styles.contentStyle}>
          <BalooThambiRegTextView
            testID="changePicPassNoLineBreak"
            style={styles.title}>
            {changePassNolineBreak}
          </BalooThambiRegTextView>
          <View style={styles.flexOne}>
            <BalooThambiRegTextView
              testID="changePicPassText"
              style={styles.subtitle}>
              {confirYourPasswodText}
            </BalooThambiRegTextView>
            <PicturePassword
              testID="PicturePasswordChangePicPassAnimals"
              onSelectPassword={onSelectPassword}
              category="animals"
              textStyle={styles.whiteText}
              row="a"
              text={text}
              onPress={val => {
                setRow1(val);
              }}
            />
            <PicturePassword
              testID="PicturePasswordChangePicPassFruits"
              onSelectPassword={onSelectPassword}
              category="fruits"
              textStyle={styles.whiteText}
              row="b"
              selectedIndex={0}
              text={text}
              onPress={val => {
                setRow2(val);
              }}
            />
            <PicturePassword
              testID="PicturePasswordChangePicPassFood"
              category="food"
              textStyle={styles.whiteText}
              onSelectPassword={onSelectPassword}
              row="c"
              selectedIndex={0}
              text={text}
              onPress={val => {
                setRow3(val);
              }}
            />

            <RoundedButton
              testID="RoundedButtonChangePicPassNoRoundBtn"
              text={changePassNolineBreak}
              type={
                passwordSeleted === 3
                  ? 'elevatedOrange'
                  : 'squareDisabledElevated'
              }
              width={styles.btnStyle.width}
              height={styles.btnStyle.height}
              disabled={passwordSeleted === 3 ? false : true}
              onPress={() => {
                let selectedPassword = row1 + '|' + row2 + '|' + row3;
                if (selectedPassword === newPassword) {
                  let reqBody = {
                    passwordType: 'picture',
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: selectedPassword,
                    // password : selectedPassword,
                  };
                  updatePassword(reqBody);
                } else {
                  setErrorMessage(newAndConfirmPassMissMatch)
                  setShowMessagePopup(true);
                }

              }}
              textStyle={styles.whiteButtonText}
              containerStyle={styles.btnContainerStyle}
            />
          </View>
        </View>
      </ScrollView>
      <SuccessPopup
        testID="SuccessPopupChangePicPass"
        isVisible={showSuccessPopup}
        text={passChangedSuccessfully}
        onPress={onMessageCloseHandler}
      />
      <MessagePopup
        testID="MessagePopupChangePicPass"
        accessible={true}
        accessibilityLabel="changePicPassMsgPopup"
        isVisible={showMessagePopup}
        text={errorMessage}
        onPress={() => {
          setShowMessagePopup(false);
        }}
        svgText={uhHoText}
        buttonText={tryAgainBtnText}
      />
    </DetailsScreen>

  );
};

export default observer(ChangePicturePasswordScreen);