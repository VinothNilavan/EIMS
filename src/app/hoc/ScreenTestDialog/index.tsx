import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './indexCss';
import { View, TouchableOpacity } from 'react-native';
import { RoundedButton, BalooThambiRegTextView, BalooThambiBoldTextView, CustomModal, HomeSessionUsage } from '@components';
import { HeaderBackground, SoundSvg } from '@images';
import { getWp, getAsValue } from '@utils';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { observer } from 'mobx-react';
import { useToast } from 'native-base';
import { ApiEndPoint, TEXTFONTSIZE } from '@constants';
import { useLanguage, useAuth } from '@hooks';

const ScreenTestDialog = props => {
  const { isStart, onPress } = props;
  const store = useStores();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { appStore, loginStore } = store;
  const { logoutHandler } = useAuth();

  const { titleText, testInstuction, getReadyText, baselineInstruction, midlineInstruction, endlineInstruction, startText, continueText, internationalInstruction } = useLanguage();
  const [showAudio] = React.useState(false);
  const Toast = useToast();

  const startScreenTest = async () => {

    if (store.uiStore.displayedHomeUsagePopup) {
      store.uiStore.setIsHomeUsageDone(true); 
      return;
    }

    const reqBody = {
      jwt: getAsValue('jwt'),
      store: store,
      body: { screeningTestID: store.appStore.screeningData.pedagogyID, mode: store.appStore.screeningData.mode }
    };

    try {
      const response = await API(ApiEndPoint.OPEN_SCREENING_TEST, reqBody);
      if (!response?.hasOwnProperty('data')) {
        Toast.show({ id: 10, description: 'Invalid Response', duration: 3000 });
        return;
      }
      let responseData = response.data;
      let redirectionCode = responseData.redirectionCode;
      let responeMsg = responseData.resultMessage;
      let redirectionData = responseData.redirectionData;
      let responseCode = responseData.resultCode;

      if (responseCode !== 'C004') {
        console.log('OPEN Screen test API ERROR');
        return;
      }
      if (redirectionCode.toLowerCase() === 'contentpage') {
        console.log(JSON.stringify(responseData));
        store.uiStore.setScreenTestDialog(false);
        onPress();
      } else if (responeMsg == 'redirect') {
        if (redirectionCode.toLowerCase() == 'invalid contentid') {
          setShowErrorAlert(true);
        } else if (redirectionData.sessionTimeExceededFlag === true) {
          store.uiStore.setScreenTestDialog(false);
          if (!Toast.isActive(9)) {
            Toast.show({ id: 9, description: 'OPEN Screen API:  Session Time Exceeded', duration: 5000 });
          }
          store.uiStore.setSessionExceeded(true);
        }
      } else {
        let errorMessage = responseData?.error && responseData?.error.length > 0 ? responseData?.error[0] : '';
        if (errorMessage && errorMessage !== '') {
          if (!Toast.isActive(10)) {
            Toast.show({ id: 10, description: errorMessage, duration: 3000 });
          }
          store?.uiStore.setScreenTestDialog(false);
        }
      }
    } catch (error) {
      console.log(`Open screening test error>>>${error}`);
    }
  };

  let startTextNew = startText;
  if (!isStart) {
    startTextNew = continueText;
  }

  let testTitleText = titleText;
  let testInstructionText = testInstuction;
  let INUser = loginStore.nationality?.toLowerCase() == 'international';

  switch (appStore.screeningData?.pedagogyType?.toLowerCase()) {
    case "baselinetest":
      testTitleText = getReadyText
      testInstructionText = baselineInstruction
      break;
    case "midlinetest":
      testTitleText = getReadyText
      testInstructionText = midlineInstruction
      break;
    case "endlinetest":
      testTitleText = getReadyText
      testInstructionText = endlineInstruction
      break;
    default:
      if (titleText.trim().toLowerCase() === "screeningtest") {
        testTitleText = "Level Check";
      }
      if (!loginStore.isVernacularUser) {
        testInstructionText = internationalInstruction;
      }
      break;
  }

  return (
    <View>
      <Modal isVisible={true}>
        {showErrorAlert ?
          <CustomModal
            containerStyle={styles.modalContainerAlertStyle}
            show={showErrorAlert}
            btnText={"OK"}
            showBtn={false}
            onPress={() => {
              logoutHandler('normal');
              setTimeout(() => { setShowErrorAlert(false); }, 200);
            }}>
            <View style={styles.errorView}>
              <BalooThambiBoldTextView style={styles.textStyle}>
                {"Error"}
              </BalooThambiBoldTextView>
              {<BalooThambiRegTextView style={styles.secondaryTextStyle}>
                {"Invalid Content ID"}
              </BalooThambiRegTextView>}
            </View>
          </CustomModal> : (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <BalooThambiRegTextView style={styles.titleText}>
                  {testTitleText}
                </BalooThambiRegTextView>
                <HeaderBackground style={styles.svgBackgroundImage} />
              </View>
              <BalooThambiRegTextView style={[styles.descriptionText, { fontSize: INUser ? TEXTFONTSIZE.Text18 : TEXTFONTSIZE.Text16 }]}>
                {testInstructionText}
              </BalooThambiRegTextView>
              <RoundedButton
                onPress={() => { startScreenTest(); }}
                type="elevatedOrange"
                text={startTextNew}
              />

               {!store.uiStore.displayedHomeUsagePopup && store.loginStore.isAuth && <HomeSessionUsage />}

              {showAudio && (
                <TouchableOpacity style={styles.soundIconContainer}>
                  <SoundSvg
                    width={getWp(30)}
                    height={getWp(30)}
                    onPress={() => {
                      if (!Toast.isActive(11)) {
                        Toast.show({ id: 11, description: 'Work In Progress' });
                      }
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
      </Modal>
    </View>
  );
};

ScreenTestDialog.propTypes = {
  onPress: PropTypes.func,
};

ScreenTestDialog.defaultProps = {
  onPress: () => { console.log(`ScreenTestDialog default onPress`) },
  isStart: false,
};

export default observer(ScreenTestDialog);