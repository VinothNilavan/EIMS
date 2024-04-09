import React, { useState } from 'react';
import { FlatList, View, Linking } from 'react-native';
import CardView from 'react-native-cardview';
import styles from './indexCss';
import {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  CustomButton,
  InfoPopup,
  TrustedDeviceCallout,
} from '@components';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage, useAuth } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import { ScreenNames } from '@constants';

const RenewUserList = props => {
  const { hangOnText, cantOpenUrl } = useLanguage();
  const navigation = useNavigation();
  const { loginStore } = useStores();
  const { isNewFlow } = props;

  let SUBSCRIPTION_PURCHASE = '';

  const [selectedItem, setSelectedItem] = useState(loginStore.renewStudents[0]);
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const {
    dispatch,
    TRUSTED_DEVICE,
    trustedDevice,
    trusetedDeviceConfirmed,
    TRUSTED_DEVICE_CONFIRMED,
  } = useAuth('text');

  const userItemPressed = item => {
    setSelectedItem(item);
  };

  const onSaveMySession = async () => {
    dispatch({ type: TRUSTED_DEVICE_CONFIRMED, value: !trusetedDeviceConfirmed });
    loginStore.setTrusted(true);
  };

  const disableTrustedDevice = () => {
    dispatch({ type: TRUSTED_DEVICE, value: !trustedDevice });
  };

  const userListItem = itemData => {
    const { class: classId, username } = itemData.item;
    let isSelected = selectedItem.username == username;
    const { item } = itemData;

    return (
      <TouchableOpacity onPress={() => userItemPressed(itemData.item)}>
        <CardView
          style={styles.card}
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={1}
        >
          <View style={isSelected ? { backgroundColor: '#2875df' } : {}}>
            <View style={styles.userListContainer}>
              <SourceSansProBoldTextView
                style={[styles.userName, isSelected ? { color: 'white' } : {}]}>
                {`${item.firstName} ${item.lastName}`}
              </SourceSansProBoldTextView>
              <SourceSansProRegTextView
                style={[styles.classText, isSelected ? { color: 'white' } : {}]}>
                {`Class ${classId ? classId : ''}`}
              </SourceSansProRegTextView>
            </View>
          </View>
        </CardView>
      </TouchableOpacity>
    );
  };

  const proceedBtn = async () => {
    if (isNewFlow) {
      props.hideRenewModel();
      navigation.navigate(ScreenNames.LoginScreen);
    } else {
      SUBSCRIPTION_PURCHASE = `https://www.mindspark.in/subscription?username=${selectedItem.username}&m_source=mobile`;
      await renewUserNavigation(SUBSCRIPTION_PURCHASE, navigation, setShowInactiveModal);
    }
  };

  return (
    <View style={styles.container}>
      <InfoPopup
        testID="InfoPopupSubscriptionEndedPurchaseSubcription"
        show={showInactiveModal}
        svgText={hangOnText}
        desc={`${cantOpenUrl} ${SUBSCRIPTION_PURCHASE}`}
        onPress={() => setShowInactiveModal(false)}
      />
      <View style={styles.wrapper}>
        <SourceSansProBoldTextView style={styles.heading}>
          {isNewFlow
            ? 'Select a user to proceed with'
            : 'For which student you like to renew Mindspark?'}
        </SourceSansProBoldTextView>
        <View style={styles.tableWrapper}>
          <FlatList
            scrollEnabled={true}
            data={loginStore.renewStudents}
            renderItem={userListItem}
            keyExtractor={(item, index) => `${item.username}_${index}`}
          />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            disabled={false}
            testId={'proceedBtn'}
            btnText={'Proceed'}
            onSubmit={proceedBtn}
          />
        </View>
        {trustedDevice && !trusetedDeviceConfirmed && (
          <TrustedDeviceCallout
            onSaveMySession={onSaveMySession}
            disableTrustedDevice={disableTrustedDevice}
          />
        )}
      </View>
    </View>
  );
};

export default RenewUserList;

const renewUserNavigation = async (SUBSCRIPTION_PURCHASE, navigation, setShowInactiveModal) => {
  const canOpenURL = await Linking.canOpenURL(SUBSCRIPTION_PURCHASE);
  if (canOpenURL) {
    await Linking.openURL(SUBSCRIPTION_PURCHASE);
    navigation.navigate(ScreenNames.LoginScreen, {});
  } else {
    setShowInactiveModal(true);
  }
}