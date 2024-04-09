import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import { notificationRedirection } from './ViewUtils';

export function configurePushNotification(appStore, navigation, enableSound) {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('Push Notification Token', token);
      appStore.setPushNotificationToken(token?.token);
    },
    onNotification: async function (notification) {
      console.log('Push Notification Response:', JSON.stringify(notification));
      handlePushNotification(notification, navigation);
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION in ACTION:', notification);

      handlePushNotification(notification, navigation);
    },
    onRegistrationError: function (error) {
      console.log(error.message, error);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: enableSound,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.popInitialNotification(notification => {
    console.log('Push Notification Response:', JSON.stringify(notification));
    handlePushNotification(notification, navigation);
  });
}

const handlePushNotification = (notification, navigation) => {
  notificationRedirection(navigation);
};