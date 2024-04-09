import React, { useState } from 'react';
import { View, TouchableHighlight, Platform, Share, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import PropTypes from 'prop-types';
import { STRINGS, COLORS, REWARD_TYPES_CATEGORY_CERTIFICATES } from '@constants';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useToast } from 'native-base';
import { useStores } from '@mobx/hooks';
import {
  DownloadLogo,
  ShareLogo,
  CloseLogo,
} from '@images';
import { WebView } from 'react-native-webview';
import { GetCertificateHtmlTemplet, getHp, isTablet } from '@utils';
import { useLanguage } from '@hooks';

const RewardPopup = props => {
  const { type, certificateLink, isVisible, onCloseClick, certificateId, date } = props;
  const [show, setShow] = useState(isVisible);
  const [isCertificateLoaded, setIsCertificateLoaded] = useState(false);
  const Toast = useToast();
  const { certificateNotFound } = useLanguage();
  const { appStore } = useStores();
  const { name } = appStore.userData;
  const message = type === REWARD_TYPES_CATEGORY_CERTIFICATES.STAR ?
    `${STRINGS.sparkieStarCertificateShareMsg1} ${certificateLink} . ${STRINGS.sparkieStarCertificateShareMsg2} ${STRINGS.portalUrl}` :
    `${STRINGS.sparkieChampCertificateShareMsg1} ${certificateLink} . ${STRINGS.sparkieChampCertificateShareMsg2} ${STRINGS.portalUrl}`;
  const htmlSource = GetCertificateHtmlTemplet(certificateLink);
  
  const onShareBtnClick = async () => {
    const option = {
      subject: '',
      dialogTitle: '',
    };
    const content = {
      title: 'App link',
      message: message,
    };
    try {
      await Share.share(content, option);
    } catch (error) { console.log(error) }
  }

  const onClose = () => {
    onCloseClick();
  }

  const iosPdfDownload = async (data) => {
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

  const downloadCertificate = () => {
    // Typeofcertificate_Month/Week_Student name 
    let fileName = '';
    let dateFormat;
    let studentName = `${name}`.trim();
    if (type == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR) {
      dateFormat = `${date}`.split(' ')[0];
      fileName = `Star_${dateFormat}_${studentName}.pdf`;
    } else {
      dateFormat = `${date}`.split('-')[0];
      fileName = `Champ_${dateFormat}_${studentName}.pdf`;
    }
    let dirs = ReactNativeBlobUtil.fs.dirs
    const downloadDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir
    ReactNativeBlobUtil
      .config({
        path: `${downloadDir}/${certificateId}/${fileName}`,
        fileCache: true,
        overwrite: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: fileName,
          mime: 'application/pdf',
        },
        appendExt: 'pdf',
      })
      .fetch('GET', certificateLink, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
        if (Platform.OS === 'ios') {
          iosPdfDownload(res.data);
        } else {
          if (!Toast.isActive(59)) {
            Toast.show({ id: 59, description: "Certificate is downloading...", duration: 3000 });
          }
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const onWebViewMessage = (event) => {
    if (!event.nativeEvent) {
      return;
    }
    try {
      let data = JSON.parse(event.nativeEvent.data);
      if (data?.hasOwnProperty('error')) {
        setShow(false);
        onCloseClick();
        if (!Toast.isActive(30)) {
          Toast.show({ id: 30, description: certificateNotFound, duration: 3000 });
        }
      } else {
        if (data?.hasOwnProperty('imageloaded')) {
          setIsCertificateLoaded(data?.imageloaded);
        }
      }
    } catch (error) {
      return;
    }
  }

  return (
    <Modal
      testID={`RewardPopupfor${type}Certificate`}
      accessible={true}
      style={{ alignItems: 'center' }}
      isVisible={show}>
      <View
        testID="<SVGImageBackgroundRewardPopup"
        style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.webViewContainer}>
            <WebView
              source={{ html: htmlSource }}
              style={styles.webView}
              androidLayerType="software"
              onMessage={onWebViewMessage}
              scrollEnabled={false}
            />
          </View>

          {isCertificateLoaded &&
            <View style={styles.buttonContainer} >
              <View style={styles.btnGroupStyle}>
                <View style={styles.innerBtnStyle}>
                  <View style={styles.groupTwoBtn} pointerEvents={isCertificateLoaded ? "auto" : "none"}>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor={COLORS.orangeBg}
                      onPress={onShareBtnClick}
                      style={[{ ...styles.btnStyle }, { backgroundColor: isCertificateLoaded ? COLORS.orange : '#AFAFAF' }]}>
                      <ShareLogo />
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor={COLORS.orangeBg}
                      onPress={() => downloadCertificate()}
                      style={[{ ...styles.btnStyle }, { marginLeft: 15 }, { backgroundColor: isCertificateLoaded ? COLORS.orange : '#AFAFAF' }]}>
                      <DownloadLogo />
                    </TouchableHighlight>
                  </View>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={COLORS.orangeBg}
                    style={[{ ...styles.btnStyle }, { ...styles.crossBtn }]} onPress={onClose}>
                    <CloseLogo />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          }
        </View>
      </View>
    </Modal>
  );
};

RewardPopup.propTypes = {
  testID: PropTypes.string,
};

RewardPopup.defaultProps = {
  type: REWARD_TYPES_CATEGORY_CERTIFICATES.STAR,
  isVisible: false,
  certificateLink: 'https://mindspark.in',
  onCloseClick: () => { console.log('onCloseClick close') },
  certificateId: '5b1f56e43651126aa910',
  date: ''
};

export default RewardPopup;
