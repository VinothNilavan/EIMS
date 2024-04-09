// External Import
import React, { useState, useEffect } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { useStores } from '@mobx/hooks';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '@hooks';
import { ApiEndPoint, ScreenNames } from '@constants';
import { notificationRedirection } from '@utils';

// Internal Imports
import { BalooThambiRegTextView, NotificationListItem, RobotoBoldTextView } from '@components';
import styles from './style';
import { notificationTimeDifference, getWp } from '@utils';
import { API } from '@api';
import { ErrorClose } from '@images';

const NotificationListModal = props => {
  const { isVisible, onPress } = props;
  const { emptyNotificationText, notificationPlural, viewAll } = useLanguage();
  const store = useStores();
  const navigation = useNavigation();
  const [notification, setNotification] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchNotification();
  }, [isVisible]);

  const fetchNotification = async () => {
    if (!isVisible) return;       // if isVisible flag true then only have to call the getNotificationApi
    const reqBody = { store: store, body: {} };

    const response = await API(ApiEndPoint.GET_NOTIFICATION_LIST, reqBody);
    if (response?.data?.resultCode === 'C001') {
      let userData = store?.appStore?.userData;
      userData.notificationCount = response?.data?.notificationInformation?.totalUnreadNotification;
      // store.appStore.setUserData(userData);
      setNotification(response?.data?.notificationInformation);
    } else if (response?.data?.resultCode === 'V3S039') {
      setErrorMessage(response?.data?.resultMessage);
    }
  };

  const markAsReadNotification = async notification => {
    const params = { notificationIDs: Array.isArray(notification?._id) ? notification?._id : [notification?._id] };
    const reqBody = { store: store, body: params };
    const response = await API(ApiEndPoint.MARK_AS_READ_NOTIFICATION, reqBody);
    onPress();
    fetchNotification();
    if (response?.data?.resultCode === 'C001') {
      notificationRedirection(notification?.details, navigation);
    } else {
      store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <NotificationListItem
        imageURL={item?.details?.notificationIcon}
        title={item?.details?.title}
        message={item?.details?.body}
        dateTime={notificationTimeDifference(item?.updatedAt)}
        isActive={!item?.read}
        onPress={() => markAsReadNotification(item)}
        hasNotificationScreen={false}
      />
    );
  };

  const renderEmptyMessage = () => {
    return (
      <View style={styles.errorMessageContainer}>
        <BalooThambiRegTextView style={styles.errorMessage}>
          {errorMessage ? errorMessage : emptyNotificationText}
        </BalooThambiRegTextView>
      </View>
    );
  };
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut" onBackButtonPress={onPress}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <RobotoBoldTextView style={styles.titleText}>
            {`${notificationPlural} (${notification?.notificationList !== null &&
              typeof notification?.notificationList !== 'undefined'
              ? notification?.notificationList?.length : 0
              })`}
          </RobotoBoldTextView>
          <TouchableOpacity onPress={onPress}>
            <ErrorClose width={getWp(24)} height={getWp(24)} />
          </TouchableOpacity>
        </View>
        {notification?.notificationList !== null && notification?.notificationList?.length > 0 ? (
          <FlatList
            data={notification?.notificationList}
            renderItem={renderItem}
            keyExtractor={item => item?._id}
          />
        ) : (
          renderEmptyMessage()
        )}
        {notification?.notificationList !== null && notification?.notificationList?.length > 0 ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('NotificationScreen');
              setTimeout(() => { onPress(); }, 200);
            }}>
            <BalooThambiRegTextView style={styles.buttonText}>
              {viewAll}
            </BalooThambiRegTextView>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </Modal>
  );
};

NotificationListModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
};

NotificationListModal.defaultProps = {
  isVisible: false,
  onPress: () => { console.log('on press'); },
};

export default NotificationListModal;
const configTopicListPage = (notification, navigation) => {
  if (typeof notification?.details?.redirectionData === 'object') {
    navigation.navigate(ScreenNames.TopicMapScreen, {
      topicID: notification?.details?.redirectionData?.id,
    });
  } else {
    navigation.navigate(ScreenNames.TopicListingScreen);
  }
}
