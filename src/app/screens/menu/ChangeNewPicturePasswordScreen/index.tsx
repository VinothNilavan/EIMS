/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { BalooThambiRegTextView, RoundedButton, PicturePassword, DetailsScreen } from '@components';
import { observer } from 'mobx-react';
import { ScreenNames } from '@constants';
import { screenLogging } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';
import styles from './style';

const ChangeNewPicturePasswordScreen = props => {
  const [passwordSeleted, setPasswordSelected] = useState(0);
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [row3, setRow3] = useState('');

  const text = 'Select your favorite';
  const currentPassword = props?.route?.params?.selectedPassword;
  const { changePassNolineBreak, nextText, newPassText } = useLanguage()

  const onSelectPassword = type => {
    setPasswordSelected(passwordSeleted => type === 'inc' ? passwordSeleted + 1 : passwordSeleted - 1);
    console.log('passwordSeleted:', passwordSeleted);
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    screenLogging('Change picture password screen');
  });

  return (
    <DetailsScreen
      testID="DetailsScreenChangeNewPicPass"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <ScrollView>
        <View style={styles.contentStyle}>
          <BalooThambiRegTextView
            testID="ChangeNewPicPasschangePassNoLineBreakTxt"
            style={styles.title}>
            {changePassNolineBreak}
          </BalooThambiRegTextView>
          <View style={styles.flexOne}>
            <BalooThambiRegTextView
              testID="ChangeNewPicPassNewPassText"
              style={styles.subtitle}>
              {newPassText}
            </BalooThambiRegTextView>
            <PicturePassword
              testID="ChangeNewPicPassAnimals"
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
              testID="ChangeNewPicPassFruits"
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
              testID="ChangeNewPicPassFood"
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
              testID="RoundButtonchangeNewPicPass"
              text={nextText}
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
                props.navigation.navigate(ScreenNames.ChangePicturePasswordScreen, {
                  currentPassword: currentPassword, newPassword: selectedPassword
                });
              }}
              textStyle={styles.whiteButtonText}
              containerStyle={styles.btnContainerStyle}
            />
          </View>
        </View>
      </ScrollView>
    </DetailsScreen>
  );
};

export default observer(ChangeNewPicturePasswordScreen);