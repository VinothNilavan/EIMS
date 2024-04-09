import React, { useEffect, useState,useCallback } from 'react';
import { View } from 'react-native';
import { BalooThambiBoldTextView, BalooThambiRegTextView, CustomModal } from '@components';
import { Internet } from '@images';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import styles from './indexCss';
import { useLanguage } from '@hooks';

const ApiError = props => {
  const store = useStores();
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const { loggedOutText, sessionLoggedOutMsg, loginAgainBtnText, okayBtnText } = useLanguage();

  useEffect(() => {
    configCustomTitles(store, setTitle, loggedOutText, setMessage, sessionLoggedOutMsg);
  }, [store.uiStore.apiStatusCode])

  const apiErrorHandler = useCallback(() => {
    if (store?.uiStore?.apiStatusCode === 401) {
      store.loginStore.setIsAuth(false);
      store.appStore.setJwt(null);
      store.loginStore.setSkipOnBoardingScreen(true);
    }
    store.uiStore.apiErrorReset();
  });

  return (
    <CustomModal
      show={store.uiStore.apiError}
      onPress={apiErrorHandler}
      btnText={
        store?.uiStore?.apiStatusCode === 401 ? loginAgainBtnText : okayBtnText
      }
      {...props}
      containerStyle={styles.modalContainerStyle}>
      <View style={styles.errorView}>
        <View style={styles.svgContainer}>
          <Internet />
        </View>
        <BalooThambiBoldTextView style={styles.textStyle}>
          {title}
        </BalooThambiBoldTextView>
        {message && <BalooThambiRegTextView style={styles.secondaryTextStyle}>
          {message}
        </BalooThambiRegTextView>}
      </View>
    </CustomModal>
  );
};

ApiError.propTypes = {};

ApiError.defaultProps = {};

export default observer(ApiError);

const configCustomTitles = (store, setTitle, loggedOutText, setMessage, sessionLoggedOutMsg) => {
  if (store.uiStore.apiStatusCode) {
    if (store.uiStore.apiStatusCode === 'Oops!') {
      setTitle(store.uiStore.apiStatusCode);
    } else {
      setTitle(store?.uiStore?.apiStatusCode === 401 ? loggedOutText : `Status ${store.uiStore.apiStatusCode}`);
    }
  }
  if (store.uiStore.apiErrorMessage) {
    setMessage(store?.uiStore?.apiStatusCode === 401 ? sessionLoggedOutMsg : store.uiStore.apiErrorMessage);
  }
}

