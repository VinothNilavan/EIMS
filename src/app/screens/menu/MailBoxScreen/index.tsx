/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { FlatList, View, TextInput, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BalooThambiRegTextView, RoundedButton, MailListItem, DetailsScreen } from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { API } from '@api';
import { SearchWhite, MessageEmpty7 } from '@images';
import { COLORS, ApiEndPoint, ScreenNames } from '@constants';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { screenLogging, getWp } from '@utils';
import styles from './style';

const MailBoxScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [mails, setMails] = useState({});
  const [count, setCount] = useState(-1);
  const [searchStr, setSearchStr] = useState('');
  const store = useStores();
  const { mailBoxStore } = useStores();
  const { appStore } = useStores();

  const { askADoubt, searchMsgText, messageEmptyState, singularMsgText, pluralMsgText } = useLanguage();

  useFocusEffect(
    React.useCallback(() => {
      screenLogging('Ask a doubt screen', appStore?.userData);
      resetAndFetchMail();
    }, []),
  );

  useBackHandler(() => { return props.navigation.navigate(ScreenNames.DashboardScreen); });

  const resetAndFetchMail = async () => {
    await reset();
    await fetchMailBox();
    searchStr && onSearchTextChanged(searchStr);
  };

  const reset = async () => {
    mailBoxStore.setShouldPaginate(true);
    mailBoxStore.setPageNo(0);
    mailBoxStore.init([]);
  };

  const fetchMailBox = async () => {
    try {
      await getMailBox(refreshing, mailBoxStore, setRefreshing, store, setMails);
    }
    catch (error) {
      console.log(error);
    }
  };

  const renderItem = (item, index) => {
    if (item.nameOfSender.length === 0) {
      return;
    }
    return (
      <MailListItem
        accessible={true}
        testID={`mailList${item.id}`}
        accessibilityLabel={`mailList${item.id}`}
        mailDetails={item}
        onPress={() => {
          props.navigation.navigate(ScreenNames.MailDetailsScreen, { mail: item, onRefresh: resetAndFetchMail });
        }}
      />
    );
  };

  const onSearchTextChanged = text => {
    console.log(`Search Text>>>>${text}`);
    setSearchStr(text);
    if (text.length > 0) {
      let filteredMails = mailBoxStore.mails.filter(item => {
        text = text.toLowerCase();
        return (
          item.subject.toLowerCase().indexOf(text) != -1 ||
          item.messageSnippet.toLowerCase().indexOf(text) != -1 ||
          item.nameOfSender.toLowerCase().indexOf(text) != -1
        );
      });
      setCount(filteredMails.length);
      setMails(filteredMails);
    } else if (!text) {
      setMails(mailBoxStore.mails);
      setCount(-1);
    }
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  return (
    <DetailsScreen
      testID="DetailsScreenMailBoxBackBtn"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <View style={styles.container}>
        <RoundedButton
          testID="MailBoxRoundedBtn"
          text={askADoubt}
          type="elevatedOrange"
          width={styles.btnStyle.width}
          height={styles.btnStyle.height}
          onPress={() => {
            props.navigation.navigate(ScreenNames.NewMessageScreen, {
              onRefresh: resetAndFetchMail,
            });
          }}
          textStyle={styles.whiteButtonText}
        />
        <View style={styles.messageListContainer}>
          <View style={styles.searchHeader}>
            <SearchWhite
              accessible={true}
              testID="MailBoxSearchImg"
              accessibilityLabel="MailBoxSearchImg"
              width={styles.searchIconStyle.width}
              height={styles.searchIconStyle.height}
            />
            <TextInput
              accessible={true}
              testID="MailBoxTextInput"
              accessibilityLabel="MailBoxTextInput"
              style={styles.searchText}
              placeholder={searchMsgText}
              placeholderTextColor={COLORS.white}
              onChangeText={text => onSearchTextChanged(text)}
            />
          </View>
          {count >= 0 && (
            <BalooThambiRegTextView
              testID="MailBoxSearchCount"
              style={styles.searchCountStyle}>
              {singularPluralMsg(count, singularMsgText, pluralMsgText)}
            </BalooThambiRegTextView>
          )}
          {mails.length > 0 ? (
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} />}
              data={mails}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={item => item.messageID}
              onEndReached={fetchMailBox}
              onEndReachedThreshold={0.9}
            />
          ) : (
            <View>
              <MessageEmpty7
                accessible={true}
                testID="MailBoxEmptyIcon"
                accessibilityLabel="mailBoxEmptyIcon"
                width={getWp(150)}
                style={styles.emptyStateIcon}
              />
              <BalooThambiRegTextView
                testID="MailBoxEmptyState"
                style={styles.searchCountStyle}>
                {messageEmptyState}
              </BalooThambiRegTextView>
            </View>
          )}
        </View>
      </View>
    </DetailsScreen>
  );
};

export default observer(MailBoxScreen);

const getMailBox = async (refreshing: boolean, mailBoxStore: any, setRefreshing: any, store: any, setMails: any) => {
  try {
    if (!refreshing && mailBoxStore.shouldPaginate) {
      setRefreshing(true);
      let startFrom = 1 + mailBoxStore.pageNo * 50;
      let req = {
        store: store,
        body: {
          startFrom: startFrom,
          pageSize: 50,
        },
      };
      let res = await API(ApiEndPoint.GET_MAILBOX, req);
      if (res.data.resultCode === 'C001') {
        if (res.data.mails.length === 0 || res.data.mails.length < 50) {
          mailBoxStore.setShouldPaginate(false);
        } else if (res.data.mails.length === 50) {
          mailBoxStore.setShouldPaginate(true);
          mailBoxStore.setPageNo(mailBoxStore.pageNo + 1);
        }
        mailBoxStore.init(res.data.mails);
        setMails(mailBoxStore.mails);
        setRefreshing(false);
      }
    }
  } catch (error) {
    console.log(`getMailBox error ${error}`);
  }
};

const singularPluralMsg = (count, singularMsgText, pluralMsgText) => {
  if (count === 0) {
    return '';
  }
  return count === 1 ? singularMsgText : `${count} ${pluralMsgText} `;
}
