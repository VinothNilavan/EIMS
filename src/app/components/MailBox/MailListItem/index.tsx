import React from 'react';
import { View, Image } from 'react-native';
import { BalooThambiRegTextView, BalooThambiMediumTextView } from '@components';
import styles from './style';
import { Attached } from '@images';
import PropTypes from 'prop-types';
import { getParsedTimeDifference, getWp } from '@utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';

const MailListItem = props => {
  const { testID, mailDetails, onPress } = props;
  const { mindaSparkLabel } = useLanguage();

  return (
    <TouchableOpacity
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      onPress={() => {
        onPress();
      }}>
      <View
        style={[
          styles.container,
          mailDetails?.unread && styles.unreadContainerStyle,
        ]}>
        <Image
          accessible={true}
          testID="MailListProfileImage"
          accessibilityLabel="MailListProfileImage"
          style={styles.profilePicContainer}
          resizeMode={'center'}
          source={{
            uri: mailDetails?.profileImage,
          }}
        />
        <View style={styles.flexOne}>
          <View style={styles.row}>
            <BalooThambiRegTextView
              testID="MailListNameOfSenderTxt"
              style={[styles.name, mailDetails?.unread && styles.unreadStyle, !mailDetails?.nameOfSender && styles.unreadMessage]}>
              {mailDetails?.nameOfSender === 'MINDSPARK'
                ? mindaSparkLabel
                : (mailDetails?.nameOfSender)? mailDetails?.nameOfSender :' - '}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView
              testID="MailListReplies"
              style={[styles.title, mailDetails.unread && styles.unreadStyle]}>
              {mailDetails?.replies > 1 && `(${mailDetails.replies})`}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView
              testID="MailListLastUpdatedDate"
              style={[styles.time, mailDetails.unread && styles.unreadStyle]}>
              {getParsedTimeDifference(mailDetails.lastUpdatedDate)}
            </BalooThambiRegTextView>
          </View>
          <View style={styles.row}>
            <View style={styles.flexOne}>
              <BalooThambiMediumTextView
                testID="MailListLastSubject"
                style={[
                  styles.subject,
                  mailDetails?.unread && styles.unreadStyle,
                ]}>
                {mailDetails?.subject?.replace(/(<([^>]+)>)/gi, '')}
              </BalooThambiMediumTextView>
              <BalooThambiRegTextView
                testID="MailListMessageSnippet"
                style={[
                  styles.message,
                  mailDetails?.unread && styles.unreadMessage,
                ]}>
                {mailDetails?.messageSnippet?.replace(/(<([^>]+)>)/gi, '')}
              </BalooThambiRegTextView>
            </View>
            {mailDetails?.attachments && (
              <Attached width={getWp(36)} height={getWp(36)} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MailListItem.propTypes = {
  testID: PropTypes.string,
  mailDetails: PropTypes.object,
  onPress: PropTypes.object,
};

MailListItem.defaultProps = {
  testID: 'MailListItem',
};
export default MailListItem;
