/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {
  BalooThambiRegTextView,
  RobotoMediumTextView,
  SuccessPopup,
  DetailsScreen,
} from '@components';

import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { ApiEndPoint } from '@constants';
import { APIFormData } from '@api';
import { screenLogging, getWp, getHp } from '@utils';
import { AddAttachment, CloseAttachment, SendMail } from '@images';
import DocumentPicker from 'react-native-document-picker';
import styles from './style';
import { useToast } from 'native-base';
import { useLanguage } from '@hooks';

const NewMessageScreen = props => {
  const [message, setMessage] = useState({});
  const [count, setCount] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const store = useStores();
  const { appStore } = useStores();
  const { onRefresh } = props.route.params;
  const Toast = useToast();

  const {
    maxFileSizeText,
    maxFileErrorText,
    fileFormatErrorText,
    failedText,
    singularMsgCapitalText,
    toText,
    mindaSparkLabel,
    writeYourMsg,
    attachFileText,
    sendText,
    msgSuccessText,
  } = useLanguage();
  console.log(props.route.params);

  const sendMail = async () => {
    try {
      const data = new FormData();
      FormData.prototype[Symbol.toStringTag] = 'FormData';
      attachments.forEach(attachment => {
        data.append('attachments[]', attachment.file);
      });
      data.append('messageBody', message.trim());
      data.append('pageID', 'mailBoxPage');

      let req = {
        store: store,
        body: data,
      };

      let res = await APIFormData(ApiEndPoint.SEND_MAIL, req);
      if (res.data.resultCode === 'C001') {
        setMessage('');
        setCount(0);
        setShowSuccessPopup(true);
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    } catch (error) {
      console.log(`sendMail error ${error}`)
    }

  };

  const crashLog = () => {
    screenLogging("NewMessageScreen", appStore?.userData);
  }

  useEffect(() => {
    crashLog();
  }, []);

  const addAttachment = async () => {
    if (attachments.length < 5) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        if (
          res[0].size / 1000 < 2049 &&
          attachments.length < 5 &&
          (res[0].type === 'image/jpeg' ||
            res[0].type === 'image/png' ||
            res[0].type === 'image/jpg')
        ) {
          let attachment = {
            file: res[0],
            failed: false,
          };
          setAttachments(attachments.concat(attachment));
        } else {
          let error;
          if (res[0].size > 2000000) {
            error = maxFileSizeText;
          } else if (attachments.length >= 5) {
            error = maxFileErrorText;
          } else {
            error = fileFormatErrorText;
          }
          if (!Toast.isActive(28)) {
            Toast.show({ id: 28, description: error, duration: 5000 });
          }
        }

        console.log(
          '\nuri',
          res[0].uri,
          res[0].type, // mime type
          res[0].name,
          res[0].size,
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      if (!Toast.isActive(29)) {
        Toast.show({ id: 29, description: maxFileErrorText, duration: 5000 });
      }
    }
  };

  const getAttachments = () => {
    let attachmentcomponents = [];
    attachments.forEach((item, index) => {
      attachmentcomponents.push(
        <View style={styles.attachmentContainer}>
          <View style={styles.detailsContainer}>
            <BalooThambiRegTextView testID="NewMessageItemFileSize">{`${item.file.name.replace(
              /(.{20})..+/,
              '$1…',
            )} (${(item.file.size / 1000000).toFixed(
              2,
            )}MB)`}</BalooThambiRegTextView>
            {item.failed && (
              <BalooThambiRegTextView
                testID="NewMessageItemError"
                style={styles.attachmentError}>
                {item.error}
              </BalooThambiRegTextView>
            )}
          </View>

          {item.failed && (
            <BalooThambiRegTextView
              testID="NewMessageFailedText"
              style={styles.attachmentError}>
              {failedText}
            </BalooThambiRegTextView>
          )}
          <TouchableOpacity
            accessible={true}
            testID="NewMessageSetAttachment"
            onAccessibilityLabel="NewMessageSetAttachment"
            onPress={() => {
              console.log(index);
              if (index === 0) {
                setAttachments(attachments.slice(1, attachments.length));
              } else if (index === attachments.length - 1) {
                setAttachments(attachments.slice(0, attachments.length - 1));
              } else {
                setAttachments(
                  attachments
                    .slice(0, index - 1)
                    .concat(attachments.slice(index + 1, attachments.length)),
                );
              }
            }}>
            <CloseAttachment width={getWp(15)} height={getHp(15)} />
          </TouchableOpacity>
        </View>,
      );
    });

    return attachmentcomponents;
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  return (
    <DetailsScreen
      testID="DetailsScreenNewMessage"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <BalooThambiRegTextView
        testID="NewMessageSingularMsgCapitalText"
        style={styles.title}>
        {singularMsgCapitalText}
      </BalooThambiRegTextView>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 60}>
        <View style={styles.messageContainer}>
          <View style={styles.toContainer}>
            <BalooThambiRegTextView
              testID="NewMessageToText"
              style={styles.toTextStyle}>
              {toText}
            </BalooThambiRegTextView>
            <TextInput
              accessible={true}
              testID="NewMessageInputTextMindSparkLabel"
              accessibilityLabel="NewMessageInputTextMindSparkLabel"
              style={styles.recipientStyle}
              editable={false}
              defaultValue={mindaSparkLabel}
            />
          </View>
          <TextInput
            accessible={true}
            testID="NewMessageInputTextWriteYourMsg"
            accessibilityLabel="NewMessageInputTextWriteYourMsg"
            placeholder={writeYourMsg}
            returnKeyType="done"
            multiline={true}
            blurOnSubmit={true}
            style={styles.textArea}
            maxLength={1000}
            onChangeText={text => {
              setMessage(text);
              setCount(text.length);
            }}
          />
          <BalooThambiRegTextView
            testID="NewMessageCountText"
            style={styles.count}>
            {`${count}/1000`}
          </BalooThambiRegTextView>
          <ScrollView>{getAttachments()}</ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              accessible={true}
              testID="NewMessageAddAttachmentTouchableComp"
              accessibilityLabel="NewMessageAddAttachmentTouchableComp"
              style={styles.row}
              onPress={() => {
                addAttachment();
              }}>
              <AddAttachment
                accessible={true}
                testID="NewMessageAddAttachment"
                accessibilityLabel="NewMessageAddAttachment"
                width={getWp(34)}
                height={getHp(34)}
              />
              <RobotoMediumTextView
                testID="NewMessageAttachFileText"
                style={styles.attachmentText}>
                {attachFileText}
              </RobotoMediumTextView>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              testID="NewMessageSendMailTouchableComp"
              accessibilityLabel="NewMessageSendMailTouchableComp"
              style={[
                styles.sendButton,
                count < 1 && styles.sendButtonDisabled,
              ]}
              disabled={count < 1}
              onPress={() => {
                sendMail();
              }}>
              <BalooThambiRegTextView
                testID="NewMessageSendText"
                style={styles.buttonText}>
                {sendText}
              </BalooThambiRegTextView>
              <SendMail
                accessible={true}
                testID="NewMessageSendMailImg"
                accessibilityLabel="NewMessageSendMailImg"
                width={getWp(20)}
                height={getHp(20)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <SuccessPopup
        testID="SuccessPopupNewMessageMsgSuccess"
        isVisible={showSuccessPopup}
        text={msgSuccessText}
        onPress={() => {
          setShowSuccessPopup(false);
          onRefresh();
          props.navigation.goBack();
        }}
      />
    </DetailsScreen>
  );
};

export default observer(NewMessageScreen);
