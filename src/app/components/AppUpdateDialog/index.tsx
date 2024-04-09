/* eslint-disable prettier/prettier */
import React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableOpacity, Linking } from 'react-native';
import { RobotoMediumTextView, RobotoRegTextView } from '@components';
import { AppUpdateIcon } from '@images';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { Config } from 'react-native-config';

import { useToast } from 'native-base';
import { useLanguage } from '@hooks';
import styles from './style';

const AppUpdateDialog = props => {
  const { loginStore } = useStores();
  const Toast = useToast();
  const {
    appUpdateAlertMsg,
    appInstallInstructionMsg,
    appInstallMSG,
    updateLabel,
    laterLabel,
    unableToOpenUrlText,
    appMaintenanceDescription,
    appMaintenanceTitle
  } = useLanguage();

  const { underMaintenance } = props;

  const titleText = appUpdateAlertMsg;
  const instalInstructionText = appInstallInstructionMsg;
  const descriptionText = appInstallMSG;

  const updateText = updateLabel;
  const laterText = laterLabel;

  const APKDetails = loginStore?.apkDetails;
  const APKURL = Config.APK_URL + '/' + APKDetails?.localPath;
  const disableLaterButton = APKDetails?.isForceUpdate === 'true' ? true : false;

  const updateBtnPressed = async () => {
    try {
      const supported = await Linking.canOpenURL(APKURL);
      if (supported) {
        await Linking.openURL(APKURL);
      } else {
        if (!Toast.isActive(2)) {
          Toast.show({ id: 2, description: unableToOpenUrlText });
        }
      }
    } catch (error) {
      console.log(`updateBtnPressed error ${error}`);
    }
  };

  return underMaintenance ? (
    <Modal isVisible={underMaintenance}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <RobotoMediumTextView style={styles.titleText}>
            {appMaintenanceTitle}
          </RobotoMediumTextView>
        </View>
        <View style={styles.childContainer}>
          <AppUpdateIcon />
          <RobotoRegTextView style={[styles.descriptionText, { padding: 10 }]}>
            {appMaintenanceDescription}
          </RobotoRegTextView>
        </View>
      </View>
    </Modal>
  ) : (
    <Modal isVisible={loginStore?.appUpdateDialog}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <RobotoMediumTextView style={styles.titleText}>
            {titleText}
          </RobotoMediumTextView>
        </View>
        <View style={styles.childContainer}>
          <AppUpdateIcon />
          <RobotoRegTextView style={styles.descriptionText}>
            {instalInstructionText}
          </RobotoRegTextView>
          <RobotoRegTextView style={styles.descriptionText}>
            {descriptionText}
          </RobotoRegTextView>
          <View style={styles.buttonMainContainer}>
            {disableLaterButton === false && (
              <TouchableOpacity
                onPress={() => loginStore?.setAppUpdateDialog(false)}
                style={styles.secondaryButtonContainer}>
                <RobotoMediumTextView style={styles.secondaryButtonText}>
                  {laterText}
                </RobotoMediumTextView>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => updateBtnPressed()}
              style={styles.buttonContainer}>
              <RobotoMediumTextView style={styles.buttonText}>
                {updateText}
              </RobotoMediumTextView>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default observer(AppUpdateDialog);
