import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './indexCss';
import { View } from 'react-native';
import { RoundedButton, BalooThambiRegTextView } from '@components';
import { HeaderBackground } from '@images';
import { useStores } from '@mobx/hooks';
import { setAsValue, replaceString } from '@utils';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';

const SessionTimeOutDialog = props => {
  const store = useStores();
  const { yourSessionEndedText, yourSessionExpiryMsgText, emptyContent, emptyContentDesc,
    loginAgainBtnText, wellDone, homeUsagePopup, okayBtnText } = useLanguage();

  const { sessionInformation } = store.appStore;

  const onPressHandler = async () => {
    await setAsValue('jwt', '');
    await setAsValue('HeartBeatInterval', '');
    store.loginStore.setIsAuth(false);
    store.appStore.setJwt(null);
    store.loginStore.setSkipOnBoardingScreen(true);
    store.uiStore.reset();
  };

    let homeUsageDuration = sessionInformation?.dailyHomeUsageDuration ? (sessionInformation?.dailyHomeUsageDuration/60) : 0;

    let textHomeUsage = replaceString(homeUsagePopup, 'duration', homeUsageDuration > 0 ? `${homeUsageDuration}` : "");
  
    let textHomeUsageNew = replaceString(textHomeUsage, 'subjectname', store.appStore.selectedSubValue);
  
  return (
    <View
      accessible={true}
      testID={props.testID}
      accessibilityLabel={props.testID}>
      <Modal
        isVisible={store.uiStore.sessionExceeded}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <BalooThambiRegTextView
              testID="SessionTimeOutDialogTitleText"
              style={styles.titleText}>
              {yourSessionEndedText}
            </BalooThambiRegTextView>
            <HeaderBackground
              accessible={true}
              testID="SessionTimeOutDialogHeaderBg"
              accessibilityLabel="SessionTimeOutDialogHeaderBg"
              style={styles.svgBackgroundImage}
            />
          </View>
          <BalooThambiRegTextView
            testID="SessionTimeOutDialogDescriptionTextt"
            style={styles.descriptionText}>
            {yourSessionExpiryMsgText}
          </BalooThambiRegTextView>
          <RoundedButton
            testID="RoundedButtonSessionTimeOutDialogCloseText"
            onPress={onPressHandler}
            type="elevatedOrange"
            text={loginAgainBtnText}
            width={300}
          />
        </View>
      </Modal>
      <Modal
        isVisible={store.uiStore.contentEmpty}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <BalooThambiRegTextView style={styles.titleText}>
              {emptyContent}
            </BalooThambiRegTextView>
            <HeaderBackground style={styles.svgBackgroundImage} />
          </View>
          <BalooThambiRegTextView style={styles.descriptionText}>
            {emptyContentDesc}
          </BalooThambiRegTextView>
          <RoundedButton
            onPress={() => { store.uiStore.setcontentEmpty(false); }}
            type="elevatedOrange"
            text={'Close'}
          />
        </View>
      </Modal>
      <Modal isVisible={store.uiStore.isHomeUsageDone} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <BalooThambiRegTextView style={styles.titleText}>
              {wellDone}
            </BalooThambiRegTextView>
            <HeaderBackground style={styles.svgBackgroundImage} />
          </View>
          <BalooThambiRegTextView style={styles.descriptionText}>
            {textHomeUsageNew}
          </BalooThambiRegTextView>
          <RoundedButton
            onPress={() => {
              store.uiStore.setIsHomeUsageDone(false);
              store.uiStore.closeQnA = true;
            }}
            type="elevatedOrange"
            text={okayBtnText}
          />
        </View>
      </Modal>
    </View>
  );
};

SessionTimeOutDialog.propTypes = {
  testID: PropTypes.string,
  onPress: PropTypes.func,
};

SessionTimeOutDialog.defaultProps = {
  testID: 'SessionTimeOutDialog',
  onPress: () => { console.log(`SessionTimeOutDialog default`) },
};

export default observer(SessionTimeOutDialog);
