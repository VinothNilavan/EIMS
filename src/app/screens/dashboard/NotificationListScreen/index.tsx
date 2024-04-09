// External Import
import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
// Internal Imports
import { BalooThambiRegTextView, DetailsScreen, NotificationListItem } from '@components';
import styles from './style';
import { notificationTimeDifference, notificationRedirection } from '@utils';
import { ApiEndPoint } from '@constants';
import { API } from '@api';
import { useLanguage } from '@hooks';

const NotificationListScreen = props => {
  const { notificationPlural } = useLanguage();
  const store = useStores();
  const { uiStore, notificationStore } = useStores();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchNotification(1);
  }, []);

  const fetchNotification = async index => {
    try {
      if (index !== 1) {
        index = notificationStore?.paginationDetails?.currentPage + 1;
        if (index > notificationStore?.paginationDetails?.totalPages) {
          return;
        }
      }
      const reqBody = {
        store: store,
        body: { limit: 10, page: index }
      };

      const response = await API(ApiEndPoint.VIEW_ALL_NOTIFICATIONS, reqBody);
      if (response?.data?.resultCode === 'C001') {
        const notificationInformation = response?.data?.notificationInformation;
        if (index === 1) {
          let userData = store?.appStore?.userData;
          userData.notificationCount = notificationInformation?.totalUnreadNotification;
          // store.appStore.setUserData(userData);
          notificationStore.init(notificationInformation);
        } else {
          notificationStore.setNotificationList(notificationStore?.notificationList.concat(notificationInformation?.notificationList));
          notificationStore.setPaginationDetails(notificationInformation?.paginationDetails);
        }
      } else if (response?.data?.resultCode === 'V3S039') {
        setErrorMessage(response?.data?.resultMessage);
      } else {
        let msg = response.data?.resultMessage;
        if (response.status && msg && msg != '') {
          uiStore.apiErrorInit({ code: response.status, message: msg });
        }
      }
    } catch (error) {
      console.log('fetch notification error', error);
    }
  };

  const markAsReadNotification = async notification => {
    try {
      const params = { notificationIDs: Array.isArray(notification?._id) ? notification?._id : [notification?._id] };
      const reqBody = { store: store, body: params };
      const response = await API(ApiEndPoint.MARK_AS_READ_NOTIFICATION, reqBody);
      console.log('Mark as read Response', response?.data);
      if (response?.data?.resultCode === 'C001') {
        fetchNotification(1);
        notificationRedirection(notification?.details, props.navigation);
      } else {
        store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
    } catch (error) {
      console.log('mark as read notification error', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <NotificationListItem
        testID={item._id}
        imageURL={item?.details?.notificationIcon}
        title={item?.details?.title}
        message={item?.details?.body}
        dateTime={notificationTimeDifference(item?.updatedAt)}
        isActive={!item?.read}
        onPress={() => markAsReadNotification(item)}
      />
    );
  };

  const renderEmptyMessage = () => {
    return (
      <View style={styles.errorMessageContainer}>
        <BalooThambiRegTextView style={styles.errorMessage}>
          {errorMessage}
        </BalooThambiRegTextView>
      </View>
    );
  };

  return (
    <DetailsScreen
      testID="DetailsScreenNotificationListBackBtn"
      headerBtnType="back"
      headerBtnClick={() => props.navigation.pop()}>
      <BalooThambiRegTextView
        testID="NotificationListNotificationPlural"
        style={styles.titleText}>
        {notificationPlural}
      </BalooThambiRegTextView>
      {notificationStore?.notificationList !== null &&
        notificationStore?.notificationList.length > 0 ? (
        <FlatList
          style={styles.notificationContainer}
          data={notificationStore?.notificationList}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          onEndReached={event => { fetchNotification(event); }}
          onEndReachedThreshold={0.9}
          windowSize={4}
          removeClippedSubviews={true}
          initialNumToRender={2}
        />) : (
        renderEmptyMessage()
      )}
    </DetailsScreen>
  );
};

NotificationListScreen.propTypes = {};

NotificationListScreen.defaultProps = {};

export default observer(NotificationListScreen);
