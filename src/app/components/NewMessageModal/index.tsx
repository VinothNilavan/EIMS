/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { BalooThambiRegTextView, RobotoMediumTextView, RoundedButton, Loader } from '@components';
import styles from './style';
import { useStores } from '@mobx/hooks';
import { ApiEndPoint } from '@constants';
import { API } from '@api';
import { getWp, getHp } from '@utils';
import { AddAttachment, CloseAttachment, SendMail } from '@images';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { useLanguage } from '@hooks';
import { getAsValue, replaceString } from '@utils';

const NewMessageModal = props => {
  const { testID, isVisible, onSuccess, pageId, onclose, onHide, params, style } = props;
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [apiSuccess, setAPISucces] = useState(false);
  const [subject, setSubject] = useState('');

  const { maxFileSizeText, maxFileErrorText, fileFormatErrorText, failedText, askADoubt, askMathOrMindspark, writeYourMsg, attachFileText, sendText } = useLanguage();

  const store = useStores();

  useEffect(() => {
    getSelectedSubject();
    let errorHideTimer;
    if (uploadError) {
      errorHideTimer = setTimeout(() => {
        setUploadError(null);
      }, 3000);
    }
    return () => {
      errorHideTimer && clearTimeout(errorHideTimer);
    };
  }, [uploadError]);


  const getSelectedSubject = async () => {
    const subjectName = await getAsValue('subjectName');
    setSubject(subjectName);
  }

  const sendMail = async () => {
    const data = {
      messageBody: message.trim(),
      pageID: pageId,
      contentDetails: JSON.stringify(params?.contentDetails),
      contentID: params?.contentID
    }
    let req = {
      store: store,
      body: data,
    };
    try {
      let res = await API(ApiEndPoint.SEND_MAIL, req);
      if (res.data.resultCode === 'C001') {
        setAPISucces(true);
        console.log('MailBox', res.data);
        setMessage('');
        setCount(0);
        onSuccess();
        setAttachments([]);
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    }
    catch (error) {
      console.log('error in new msg modal');
    }
  };

  const addAttachment = async () => {
    if (attachments.length < 5) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });

        if (res[0].size / 1000 < 2048 && attachments.length < 5 && (res[0].type === 'image/jpeg' || res[0].type === 'image/png' || res[0].type === 'image/jpg')) {
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
          setUploadError(error);
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
      Alert.alert('Alert', `${maxFileErrorText}`, [{ text: 'ok', }]);
    }
  };

  const getAttachments = () => {
    let attachmentcomponents = [];
    attachments.forEach((item, index) => {
      attachmentcomponents.push(
        <View style={styles.attachmentContainer}>
          <View style={styles.detailsContainer}>
            <BalooThambiRegTextView testID="NewMessageModalFileSizeText">{`${item.file.name.replace(
              /(.{20})..+/,
              '$1…',
            )} (${(item.file.size / 1000000).toFixed(
              2,
            )}MB)`}</BalooThambiRegTextView>
            {item.failed && (
              <BalooThambiRegTextView
                testID="NewMessageModalErrorText"
                style={styles.attachmentError}>
                {item.error}
              </BalooThambiRegTextView>
            )}
          </View>

          {item.failed && (
            <BalooThambiRegTextView
              testID="NewMessageModalFailedText"
              style={styles.attachmentError}>
              {failedText}
            </BalooThambiRegTextView>
          )}
          <TouchableOpacity
            accessible={true}
            testID="NewMessageModalSetAttachmentBtn"
            accessibilityLabel="NewMessageModalSetAttachmentBtn"
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
            <CloseAttachment
              accessible={true}
              testID="NewMessageModalCloseAttachment1"
              accessibilityLabel="NewMessageModalCloseAttachment1"
              width={getWp(15)}
              height={getHp(15)}
            />
          </TouchableOpacity>
        </View>,
      );
    });

    return attachmentcomponents;
  };

  let uploadErrorView = null;
  if (uploadError) {
    uploadErrorView = (
      <BalooThambiRegTextView
        testID="NewMessageModalUploadError"
        style={styles.errorMsg}>
        {uploadError}
      </BalooThambiRegTextView>
    );
  }

  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={isVisible}
      onModalHide={() => {
        if (apiSuccess === true) {
          onHide();
          setAPISucces(false);
        }
      }}>
      <View style={[styles.container, style]}>
        <TouchableOpacity
          accessible={true}
          testID="NewMessageModalSetAttachmentBtn"
          accessibilityLabel="NewMessageModalSetAttachmentBtn"
          style={styles.closeButton}
          onPress={() => {
            onclose();
          }}>
          <CloseAttachment
            accessible={true}
            testID="NewMessageModalCloseAttachment2"
            accessibilityLabel="NewMessageModalCloseAttachment2"
            width={getWp(18)}
            height={getHp(18)}
          />
        </TouchableOpacity>
        <BalooThambiRegTextView
          testID="NewMessageModalNewMsgBtnText"
          style={styles.title}>
          {askADoubt}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="NewMessageModalAskMathOrMindspark"
          style={styles.subTitle}>
          {subject === 'Science' ? replaceString(askMathOrMindspark, "mathematics", "Science") : askMathOrMindspark}
        </BalooThambiRegTextView>
        <View style={styles.textAreaContainer}>
          <TextInput
            accessible={true}
            testID="NewMessageModalTextInput"
            accessibilityLabel="NewMessageModalTextInput"
            placeholder={writeYourMsg}
            style={styles.textArea}
            returnKeyType="done"
            multiline={true}
            blurOnSubmit={true}
            maxLength={1000}
            onChangeText={text => {
              setMessage(text);
              setCount(text.trim().length);
            }}
          />
          <BalooThambiRegTextView
            testID="NewMessageModalCount"
            style={styles.count}>
            {`${count}/1000`}
          </BalooThambiRegTextView>
        </View>
        <ScrollView>{getAttachments()}</ScrollView>
        <TouchableOpacity
          accessible={true}
          testID="NewMessageModalAddAttachment"
          accessibilityLabel="NewMessageModalAddAttachment"
          style={styles.row}
          onPress={() => {
            addAttachment();
          }}>
          <AddAttachment
            accessible={true}
            testID="NewMessageModalAddAttachment"
            accessibilityLabel="NewMessageModalAddAttachment"
            width={getWp(34)}
            height={getHp(34)}
          />
          <RobotoMediumTextView
            testID="NewMessageModalAttachFileText"
            style={styles.attachmentText}>
            {attachFileText}
          </RobotoMediumTextView>
        </TouchableOpacity>
        {uploadErrorView && (
          <View
            accessible={true}
            testID="NewMessageModalAddAttachement"
            accessibilityLabel="NewMessageModalAddAttachement"
            style={styles.errorContainer}>
            {uploadErrorView}
          </View>
        )}
      </View>
      <RoundedButton
        testID="RoundedButtonMessageModalSendMailBtn"
        text={sendText}
        type={count < 1 ? 'squareDisabledElevated' : 'elevatedOrange'}
        width={getWp(180)}
        height={getHp(70)}
        SvgImage={SendMail}
        onPress={() => {
          sendMail();
        }}
        disabled={count < 1}
        containerStyle={styles.buttonStyle}
        textStyle={styles.whiteButtonText}
      />
      {store.uiStore.loader && <Loader />}
    </Modal>
  );
};

NewMessageModal.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func,
  onHide: PropTypes.func,
  onclose: PropTypes.func,
  pageId: PropTypes.string.isRequired,
  params: PropTypes.object,
  style: PropTypes.object,
};

NewMessageModal.defaultProps = {
  testID: 'NewMessageModal',
  onSuccess: () => { console.log('on Suc') },
  onclose: () => { console.log('on onclose') },
  onHide: () => { console.log('on onHide') }
};
export default NewMessageModal;
