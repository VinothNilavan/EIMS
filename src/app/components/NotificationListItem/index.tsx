// External Imports
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SvgCssUri } from 'react-native-svg/css';
import { BalooThambiRegTextView, RobotoRegTextView } from '@components';
import PropTypes from 'prop-types';
import styles from './style';

const NotificationListItem = props => {
  const {
    testID,
    imageURL,
    title,
    message,
    dateTime,
    isActive,
    hasNotificationScreen,
    onPress,
  } = props;

  const renderSvg = () => {
    return imageURL !== null && imageURL !== '' && (
      <View style={styles.imageContainer}>
        <SvgCssUri
          width={styles.imageHolder.width}
          height={styles.imageHolder.height}
          uri={imageURL}
        />
      </View>
    );
  }

  const getFileExtension = (filename: string) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : null;
  }

  const renderImage = () => {
    return imageURL !== null && imageURL !== '' && (
      <View style={styles.imageContainer}>
        <Image
          accessible={true}
          testID="NotificationListItemPng"
          accessibilityLabel="NotificationListItemPng"
          style={styles.imageHolder}
          source={{ uri: imageURL }}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      accessible={true}
      testID={`NotificationListItem${testID}`}
      accessibilityLabel={`NotificationListItem${testID}`}
      style={hasNotificationScreen ? styles.container : styles.popupContainer}
      onPress={onPress}>
      {getFileExtension(imageURL) == 'png' ? renderImage() : renderSvg()}
      {isActive && <View style={styles.unreadDot} />}
      <View style={hasNotificationScreen ? styles.messageContainer : styles.popupMessageContainer}>
        {title !== null && title !== '' && isActive && (
          <BalooThambiRegTextView
            testID="NotificationListItemTitleTextUnread"
            style={hasNotificationScreen ? styles.titleTextUnRead : styles.popupTitleTextUnRead}>
            {title.replace('_', ' ')}
          </BalooThambiRegTextView>
        )}
        {title !== null && title !== '' && !isActive && (
          <BalooThambiRegTextView
            testID="NotificationListItemTitleTextRead"
            style={hasNotificationScreen ? styles.titleTextRead : styles.popupTitleTextRead}>
            {title.replace('_', ' ')}
          </BalooThambiRegTextView>
        )}
        {message !== null && message !== '' && isActive && (
          <RobotoRegTextView
            testID="NotificationListItemPopupMessage"
            style={hasNotificationScreen ? styles.messageTextUnread : styles.popupMessageText}>
            {message}
          </RobotoRegTextView>
        )}
        {message !== null && message !== '' && !isActive && (
          <RobotoRegTextView
            testID="NotificationListItemReadMessage"
            style={hasNotificationScreen ? styles.messageTextRead : styles.popupMessageText}>
            {message}
          </RobotoRegTextView>
        )}
      </View>
      <>
        {dateTime !== null && dateTime !== '' && isActive && (
          <BalooThambiRegTextView
            testID="NotificationListItemDateTimeUnread"
            style={hasNotificationScreen ? styles.timeTextUnRead : styles.popupMessageTimeTextUnRead}>
            {dateTime}
          </BalooThambiRegTextView>
        )}
        {dateTime !== null && dateTime !== '' && !isActive && (
          <BalooThambiRegTextView
            testID="NotificationListItemdateTimeRead"
            style={hasNotificationScreen ? styles.timeTextRead : styles.popupMessageTimeText}>
            {dateTime}
          </BalooThambiRegTextView>
        )}
      </>
    </TouchableOpacity>
  );
};

NotificationListItem.propTypes = {
  testID: PropTypes.string,
  imageURL: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  dateTime: PropTypes.string,
  isActive: PropTypes.bool,
  hasNotificationScreen: PropTypes.bool,
  onPress: PropTypes.func,
};

NotificationListItem.defaultProps = {
  testID: 'NotificationListItem',
  isActive: false,
  hasNotificationScreen: true,
  onPress: () => {console.log(`NotificationListItem default`)},
};

export default NotificationListItem;
