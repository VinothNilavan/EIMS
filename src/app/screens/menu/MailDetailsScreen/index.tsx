/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  ScrollView,
  Platform, Share
} from 'react-native';
import {
  BalooThambiRegTextView,
  MailDetailsItem,
  RobotoMediumTextView,
  DetailsScreen,
  SuccessPopup,
} from '@components';

import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { ApiEndPoint, STRINGS } from '@constants';
import { API, APIFormData } from '@api';
import DocumentPicker from 'react-native-document-picker';
import { getWp, getHp } from '@utils';
import { AddAttachment, SendMail, CloseAttachment } from '@images';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useToast } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import styles from './style';
import { useLanguage } from '@hooks';

const MailDetailsScreen = props => {
  const [mailDetails, setMailDetails] = useState({});
  const [mailQuestionResult, setmailQuestionResult] = useState({});
  const [message, setMessage] = useState({});
  const [count, setCount] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const store = useStores();
  const Toast = useToast();
  const {
    rateConvoText,
    singularMsgCapitalText,
    typeReplyText,
    sendText,
    msgSuccessText,
    maxFileSizeText,
    maxFileErrorText,
    fileFormatErrorText,
    failedText,
    writeYourMsg,
    attachFileText,
    storagePermissionText,
    storageDescText,
    downloadFailedText,
  } = useLanguage();
  const { mail, onRefresh } = props.route.params;
  let replyId;
  let myFlatListRef;
  console.log(props);

  useEffect(() => {
    if (mail?.type && `${mail?.type}`.toLowerCase() != 'notification') {
      fetchMailDetails();
    }
  }, []);

  const reset = () => {
    setCount(0);
    setAttachments([]);
    setShowSuccessPopup(false);
    setShowReply(false);
  };

  const fetchMailDetails = async () => {
    try {
      if (mail?.messageID && mail?.type) {
        let req = {
          store: store,
          body: {
            messageID: mail.messageID,
            type: mail.type,
          },
        };
        let res = await API(ApiEndPoint.GET_MAIL_DETAILS, req);
        if (res.data.resultCode === 'C001') {
          console.log('details', res.data);
          setMailDetails(res.data);
          reStructureData(res.data);
        }
      }
    } catch (error) {
      console.log(`fetchMailDetails error ${error}`)
    }
  };

  const reStructureData = response => {
    if (
      response?.messageDetails != null &&
      response?.messageDetails?.contentData != null &&
      response?.messageDetails?.contentData?.questionBody != null
    ) {
      let result = {
        contentID: response?.messageDetails?.contentID,
        langCode: response?.messageDetails?.contentData?.langCode,
        revisionNo: response?.messageDetails?.contentData?.revisionNo,
        contentType: response?.messageDetails?.contentData?.contentType,
        isFavourite: false,
        data: response?.messageDetails?.contentData,
        settings: response?.messageDetails?.settings,
        Q_id: response?.messageDetails?.contentNo,
        userAttemptData: {
          userResponse: {
            mcqPattern: {
              type: response?.messageDetails?.contentData?.contentType,
            },
          },
        },
      };
      setmailQuestionResult(result);
    } else {
      setmailQuestionResult(null);
    }
  };
  const saveRating = async rating => {
    try {
      let req = {
        store: store,
        body: {
          commentID: replyId,
          rating: rating,
        },
      };
      let res = await API(ApiEndPoint.SAVE_RATINGS, req);
      if (res.data.resultCode === 'C001') {
        console.log('rating', res.data);
      }
    } catch (error) {
      console.log(`saveRating error ${error}`);
    }
  };

  const replyToMail = async () => {
    try {
      const data = new FormData();
      FormData.prototype[Symbol.toStringTag] = 'FormData';
      attachments.forEach(attachment => {
        data.append('attachments[]', attachment.file);
      });
      data.append('replyBody', message);
      data.append('messageID', mailDetails?.messageDetails?.messageID);
      let req = {
        store: store,
        body: data,
      };

      let res = await APIFormData(ApiEndPoint.REPLYTOMESSAGE, req);
      if (res.data.resultCode === 'C001') {
        console.log('MailBox', res.data);
        onRefresh();
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.log(`replyToMail error ${error}`);
    }
  };

  const addAttachment = async () => {
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
        let attachment = {
          file: res[0],
          failed: true,
          error: error,
        };
        setAttachments(attachments.concat(attachment));
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
  };

  const getAttachments = () => {
    try {
      let attachmentcomponents = [];
      attachments.forEach((item, index) => {
        attachmentcomponents.push(
          <View style={styles.attachmentContainer}>
            <View style={styles.detailsContainer}>
              <BalooThambiRegTextView testID="MailDetailsItemFileSizeTxt">{`${item.file.name.replace(
                /(.{20})..+/,
                '$1…',
              )} (${(item.file.size / 1000000).toFixed(
                2,
              )}MB)`}</BalooThambiRegTextView>
              {item.failed && (
                <BalooThambiRegTextView
                  testID="MailDetailsItemErrorTxt"
                  style={styles.attachmentError}>
                  {item.error}
                </BalooThambiRegTextView>
              )}
            </View>

            {item.failed && (
              <BalooThambiRegTextView
                testID="MailDetailsFailedTxt"
                style={styles.attachmentError}>
                {failedText}
              </BalooThambiRegTextView>
            )}
            <TouchableOpacity
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
                testID="MailDetailsCloseAttachment"
                accessibilityLabel="MailDetailsCloseAttachment"
                width={getWp(15)}
                height={getHp(15)}
              />
            </TouchableOpacity>
          </View>,
        );
      });
      return attachmentcomponents;
    } catch (error) {
      console.log(`getAttachments error ${error}`);
    }
  };

  const renderItem = (item, index) => {
    if (index !== 0 && item?.fromUserDetails?.name === 'Mindspark') {
      replyId = item?.replyID;
    }

    if (index === mailDetails?.messageTrail.length - 1) {
      return (
        <MailDetailsItem
          testID={item.messageID}
          mailDetails={item}
          isQuestionMasg={mailDetails?.messageTrail.length == 1 ? true : false}
          isExpanededInitially={true}
          questionItem={mailQuestionResult}
          containerStyle={styles.mailDetailsItem}
          onAttachmentPressed={url => {
            downloadAttachment(url);
          }}
        />
      );
    }

    return (
      <MailDetailsItem
        testID={item.messageID}
        isQuestionMasg={true}
        mailDetails={item}
        questionItem={mailQuestionResult}
        onAttachmentPressed={url => {
          downloadAttachment(url);
        }}
      />
    );
  };

  const getFooter = () => {
    return (
      <View style={styles.footer}>
        <ScrollView>
          <TextInput
            accessible={true}
            testID="MailDetailsTextInputWriteYourMsg"
            accessibilityLabel="MailDetailsTextInputWriteYourMsg"
            placeholder={writeYourMsg}
            style={styles.textArea}
            multiline={true}
            maxLength={1000}
            onChangeText={text => {
              setMessage(text);
              setCount(text.length);
            }}
          />
          <BalooThambiRegTextView
            testID="MailDetailsCountTxt"
            style={styles.count}>
            {`${count}/1000`}
          </BalooThambiRegTextView>
          {getAttachments()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              addAttachment();
            }}>
            <AddAttachment
              accessible={true}
              testID="MailDetailsAddAttachmentFooter"
              accessibilityLabel="MailDetailsAddAttachmentFooter"
              width={getWp(34)}
              height={getHp(34)}
            />
            <RobotoMediumTextView
              testID="MailDetailsAttachFileText"
              style={styles.attachmentText}>
              {attachFileText}
            </RobotoMediumTextView>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendButton, count < 1 && styles.sendButtonDisabled]}
            onPress={() => {
              replyToMail();
            }}
            disabled={count < 1}>
            <BalooThambiRegTextView
              testID="MailDetailsSendText"
              style={styles.buttonText}>
              {sendText}
            </BalooThambiRegTextView>
            <SendMail
              accessible={true}
              testID="MailDetailsSendMailFooter"
              accessibilityLabel="MailDetailsSendMailFooter"
              width={getWp(20)}
              height={getHp(20)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const iosPdfDownload = async (data) => {

    if (Platform.OS == 'android') return;

    let options = {
      title: "Certificate download",
      failOnCancel: false,
      url: `${data}`
    };
    try {
      const ShareResponse = await Share.share(options, { excludedActivityTypes: STRINGS.excludedActivityTypes });
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);
    }
  }

  const downloadAttachment = async url => {
    try {
      if (Platform.OS == 'android') {
        let permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const isPermissionGranted = await PermissionsAndroid.check(permission);

        if (!isPermissionGranted) {
          const granted = await PermissionsAndroid.request(permission, { title: storagePermissionText, message: storageDescText });
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            if (!Toast.isActive(27)) {
              Toast.show({ id: 27, description: `${downloadFailedText}`, duration: 2000 });
            }
            return;
          }
        }
      }

      let attachment = url.split('/');
      let name = attachment[attachment.length - 1];

      const { config, fs } = ReactNativeBlobUtil;
      let DownloadDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        appendExt: 'jpg',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: DownloadDir + '/' + name,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', url)
        .then(res => {
          iosPdfDownload(res.data);
        });
    } catch (err) {
      console.warn(err);
    }
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  return (
    <DetailsScreen
      testID="DetailsScreenMailDetails"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <View style={styles.container}>
        <BalooThambiRegTextView
          testID="MailDetailsSingularMsgCapitalText"
          style={styles.title}>
          {singularMsgCapitalText}
        </BalooThambiRegTextView>
        <View style={styles.messageListContainer}>
          <View style={styles.messageSubjectContainer}>
            {mailDetails?.messageDetails?.rate?.rateFlag && (
              <View>
                <BalooThambiRegTextView
                  testID="MailDetailsRateConvoText"
                  style={styles.ratingTitle}>
                  {rateConvoText}
                </BalooThambiRegTextView>
                <AirbnbRating
                  accessible={true}
                  testID="MailDetailsAirbnbRating"
                  accessibilityLabel="MailDetailsAirbnbRating"
                  showRating={false}
                  onFinishRating={ratings => {
                    saveRating(ratings);
                  }}
                  defaultRating={mailDetails?.messageDetails?.rate?.rating}
                  size={16}
                  starContainerStyle={styles.ratingContainer}
                />
              </View>
            )}
            <BalooThambiRegTextView
              testID="MailDetailsMailSubject"
              style={styles.subject}>
              {mail?.subject?.replace(/\n/g, ' ')}
            </BalooThambiRegTextView>
          </View>
          {mailDetails &&
            mailDetails.messageTrail &&
            mailDetails.messageTrail.length > 0 && (
              <FlatList
                ref={ref => {
                  myFlatListRef = ref;
                }}
                onContentSizeChange={() => {
                  myFlatListRef.scrollToEnd({ animated: true });
                }}
                onLayout={() => {
                  myFlatListRef.scrollToEnd({ animated: true });
                }}
                data={mailDetails?.messageTrail}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={item => item.messageID}
              />
            )}
          {showReply && getFooter()}
          {!showReply && (
            <TouchableOpacity
              accessible={true}
              testID="MailDetailsShowReply"
              accessibilityLabel="MailDetailsShowReply"
              style={styles.replyContainer}
              onPress={() => {
                setShowReply(true);
              }}>
              <BalooThambiRegTextView
                testID="MailDetailsTypeReplyText"
                style={styles.replyText}>
                {typeReplyText}
              </BalooThambiRegTextView>

              <View style={styles.row}>
                <AddAttachment
                  accessible={true}
                  testID="MailDetailsAddAttachment"
                  accessibilityLabel="MailDetailsAddAttachment"
                  width={getWp(34)}
                  height={getHp(34)}
                />
                <View style={[styles.sendButton, styles.sendButtonDisabled]}>
                  <BalooThambiRegTextView
                    testID="MailDetailsSendText"
                    style={styles.buttonText}>
                    {sendText}
                  </BalooThambiRegTextView>
                  <SendMail
                    accessible={true}
                    testID="MailDetailsSendMail"
                    accessibilityLabel="MailDetailsSendMail"
                    width={getWp(20)}
                    height={getHp(20)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SuccessPopup
        testID="SuccessPopupMailDetailsMsgSuccessText"
        isVisible={showSuccessPopup}
        text={msgSuccessText}
        onPress={() => {
          fetchMailDetails();
          reset();
        }}
      />
    </DetailsScreen>
  );
};

export default observer(MailDetailsScreen);
