import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { BalooThambiRegTextView, BalooThambiMediumTextView } from '@components';
import styles from './style';
import { Attached } from '@images';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';
import { QuestionItem } from '@hoc';

const MailDetailsItem = props => {
  const {
    testID,
    isQuestionMasg,
    mailDetails,
    questionItem,
    onAttachmentPressed,
    isExpanededInitially,
    containerStyle,
  } = props;
  const [expand, setExpand] = useState(isExpanededInitially);
  const [viewQuestion, setViewQuestion] = useState(false);
  const store = useStores();
  const {
    attachmentslabel,
    toText,
    showQuestion,
    hideQuestion,
  } = useLanguage();

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.howIDid
      : {};

  const getAttachments = () => {
    try {
      let attachmentcomponents = [];
      mailDetails.attachments.forEach((item, index) => {
        console.log(item);
        let attachment = item.split('/');
        let name = attachment[attachment.length - 1];
        attachmentcomponents.push(
          <TouchableOpacity
            onPress={() => {
              onAttachmentPressed(item);
            }}>
            <View style={styles.attachmentContainer}>
              <Attached
                accessible={true}
                testID="MailDetailsItemAttachedImg"
                accessibilityLabel="MailDetailsItemAttachedImg"
              />
              <BalooThambiRegTextView
                testID="MailDetailsItemNameTxt"
                style={styles.attachmentText}>
                {name}
              </BalooThambiRegTextView>
            </View>
          </TouchableOpacity>,
        );
      });
      return attachmentcomponents;
    } catch (error) {
      console.log(`getAttachments error ${error}`)
    }
  };

  return (
    <View
      accessible={true}
      testID={`MailDetailsItem${testID}`}
      accessibilityLabel={`MailDetailsItem${testID}`}
      style={[styles.container, expand && containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          setExpand(!expand);
        }}>
        <View style={styles.messageContainer}>
          <Image
            accessible={true}
            testID="MailDetailsItemImage"
            accessibilityLabel="MailDetailsItemImage"
            style={styles.profilePicContainer}
            resizeMode={'center'}
            source={{
              uri: mailDetails?.fromUserDetails?.avatar,
            }}
          />
          <View style={styles.flexOne}>
            <View style={styles.row}>
              <BalooThambiRegTextView
                testID="MailDetailsItemFromUserDetails"
                style={styles.name}>
                {mailDetails?.fromUserDetails?.name}
              </BalooThambiRegTextView>

              <BalooThambiRegTextView
                testID="MailDetailsItemSubmitDate"
                style={styles.time}>
                {moment(mailDetails?.submitDate).format('DD MMM h:mm a')}
              </BalooThambiRegTextView>
            </View>
            <View style={styles.flexOne}>
              <BalooThambiMediumTextView
                testID="MailDetailsItemToText"
                style={[styles.subject]}>
                {`${toText} ${mailDetails?.toUserDetails?.name}`}
              </BalooThambiMediumTextView>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {expand && (
        <View style={styles.detailsContainer}>
          <BalooThambiRegTextView
            testID="MailDetailsItemReplyContent"
            style={styles.message}>
            {mailDetails?.replyContent.replace(/<br>/g, '\n')}
          </BalooThambiRegTextView>

          {viewQuestion ? (
            <View>
              <QuestionItem
                accessible={true}
                testID={`HowIDidQuestionCard${questionItem.data._id}`}
                accessibilityLabel={`HowIDidQuestionCard${questionItem.data._id}`}
                response={questionItem}
                showStarQues={false}
                howIDid={false}
                permissions={permissions}
                onPressStar={() => { console.log(`QuestionItem Star btn Press`) }}
              />
            </View>
          ) : null}
          {isQuestionMasg && questionItem != null && (
            <TouchableOpacity
              style={styles.ViewQuestion}
              onPress={() => {
                setViewQuestion(!viewQuestion);
              }}>
              <BalooThambiRegTextView
                testID="MailDetailsItemReplyContent"
                style={styles.ViewQuestionTxt}>
                {viewQuestion ? hideQuestion : showQuestion}
              </BalooThambiRegTextView>
            </TouchableOpacity>
          )}

          {mailDetails.attachments.length > 0 && (
            <View>
              <BalooThambiRegTextView
                testID="MailDetailsItemAttachmentslabel"
                style={styles.attachmentTitle}>
                {attachmentslabel}
              </BalooThambiRegTextView>
              {getAttachments()}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

MailDetailsItem.propTypes = {
  testID: PropTypes.string,
  mailDetails: PropTypes.object,
  onAttachmentPressed: PropTypes.object,
  isExpanededInitially: PropTypes.bool,
  containerStyle: PropTypes.object,
};

MailDetailsItem.defaultProps = {
  testID: 'MailDetails',
  isExpanededInitially: false,
};
export default MailDetailsItem;
