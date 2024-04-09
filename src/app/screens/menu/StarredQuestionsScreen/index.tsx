/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styles from './style';

import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { API } from '@api';
import { useStores } from '@mobx/hooks';
import { ApiEndPoint, ScreenNames } from '@constants';
import { observer } from 'mobx-react';
import { ArrowDownRed, StarredQuestionEmpty9 } from '@images';
import { screenLogging, getWp } from '@utils';
import { useStarQuestion, useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { ReportScreen } from '../../../helpers';
import { BalooThambiRegTextView, SelectionPopup, ChoiceList, SourceSansProRegTextView, RoundedButton, DetailsScreen, CustomReportListCard } from '@components';

const StarredQuestionScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [removeFav, setRemoveFav] = useState(false);
  const [clickDropdown, setClickDropDown] = useState(false);
  const [selectedLable, setSelectedLabel] = useState('');
  const [removeFavContent, setRemoveFavContent] = useState(null);
  const [heading, setHeading] = useState();
  const { onStarHandler } = useStarQuestion();

  const store = useStores();
  const { appStore } = useStores();
  const { starredQuestionStore } = useStores();
  const { bookmarkedQuestion, bookmarks, goHomeBtnText, attentionPleaseText,
    noCancelBtnText, yesRemoveBtnText, thisWillRemoveDescText, starredQuestionEmptyState } = useLanguage();

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.starredQuestionList : {};

  let topic;

  const screenLog = () => {
    screenLogging("StarredQuestionScreen", appStore?.userData);
  }

  let topicListDropdown = [];

  useEffect(() => {
    permissions.viewExplanation = true;
    fetchContent(1);
    screenLog();
    setHeading(bookmarkHeaderString(favList, bookmarkedQuestion));
  }, [selectedTopic]);

  useBackHandler(() => { headerBtnClickHandler(); });

  const fetchContent = async index => {
    if (refreshing) return;

    try {
      let paginationDetails = starredQuestionStore?.favouritesResponse?.paginationDetails;
      if (index !== 1) {
        index = paginationDetails?.currentPage + 1;
        if (index > paginationDetails?.totalPages) {
          return;
        }
      }
      setRefreshing(true);
      let reqBody = {
        limit: 20,
        startFrom: (index - 1) * 20 + 1,
        topicID: ''
      };
      if (selectedTopic) {
        reqBody.topicID = selectedTopic;
      }
      let req = {
        body: reqBody,
        store: store,
      };
      let res = await API(ApiEndPoint.GET_FAVOURITES_LIST, req);
      if (res.data.resultCode === 'C001') {
        if (index === 1) {
          starredQuestionStore.init(res.data);
        } else {
          starredQuestionStore.setFavouriteList(
            starredQuestionStore.favouritesList.concat(
              res.data.favouritesDetails.favouritesList,
            ),
          );
          starredQuestionStore.topicList(res.data.topicDetails.topicList);
        }

        //create topicList array for dropdown

        for (topic of starredQuestionStore.topicList) {
          topicListDropdown.push({ value: `• ${topic.topicName}`, id: topic.topicID });
        }

        setTopicList(topicListDropdown);

        //Set selected topic
        let topicSelected = starredQuestionStore.topicList.find(topic => topic.selected);
        setSelectedTopic(topicSelected.topicID);
        setSelectedLabel(`• ${topicSelected.topicName}`);
      } else if (res.data.resultCode === 'S014') {
        starredQuestionStore.init(res.data);
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
      setRefreshing(false);
    }
    catch (error) {
      console.log('error inn starred ... ');
    }
  };

  const renderItem = ({ item, index }) => {
    if (item.data) {
      if (item.settings && !item.settings.showAnswer) {
        permissions.viewExplanation = false;
      }
      return (
        <CustomReportListCard
          testID={`starredQuestionAnswerItem${item.id}`}
          accessibilityLabel={`starredQuestionAnswerItem${item.id}`}
          item={item}
          seqNum={index + 1}
          permissions={permissions}
          screen={ReportScreen.StarredScreen}
          topicId={item.contentID}
          isFromStarredQuestions={true}
          onPressStarBtn={
            () => onPressStarHandler(item.contentID)
          }
        />
      );
    }
  };

  const onPressStarHandler = async contentId => {
    setRemoveFavContent(contentId);
    setRemoveFav(true);
  };

  const onSelectHandler = topicId => {
    setClickDropDown(false);
    setSelectedLabel(topicId.value);
    setSelectedTopic(topicId.id);
  };

  let favList = starredQuestionStore.favouritesList;

  const onCancelPressHandler = () => {
    setRemoveFav(false);
  };

  const onActionPressHandler = async () => {
    setRemoveFav(false);
    const req = { topicId: selectedTopic, contentId: removeFavContent };
    let favouritesListCopy = [...starredQuestionStore.favouritesList];
    favouritesListCopy.splice(favouritesListCopy, 1);
    if (favouritesListCopy.length == 0) {
      starredQuestionStore.setFavouriteList(null);
    } else {
      starredQuestionStore.setFavouriteList(favouritesListCopy);
    }
    onStarHandler(req, true);
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  return (
    <DetailsScreen
      testID="DetailsScreenStarredQuestionsBackBtn"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      {starredQuestionStore.favouritesResponse && (
        <ScrollView>
          <View style={styles.flexOne}>
            <View style={styles.contentStyle}>
              <BalooThambiRegTextView
                testID="StarredQuestionStaredPularTex"
                style={styles.title}>
                {bookmarks}
              </BalooThambiRegTextView>
              {starredQuestionStore.topicList &&
                starredQuestionStore.topicList.length > 0 && (
                  <View style={styles.dropDownContainer}>
                    <TouchableOpacity onPress={() => { setClickDropDown(true); }} style={{ width: '90%' }}>
                      <View style={{ left: 0 }}>
                        <SourceSansProRegTextView numberOfLines={1}>
                          {selectedLable}
                        </SourceSansProRegTextView>
                      </View>
                      <ChoiceList
                        choices={topicList}
                        show={clickDropdown}
                        selectChoiceHandler={onSelectHandler}
                        onBackdropHandler={() => { console.log('handler'); }}
                      />
                    </TouchableOpacity>
                    <View style={styles.arrowDownStyle}>
                      <ArrowDownRed />
                    </View>
                  </View>
                )}
              <BalooThambiRegTextView
                testID="StarredQuestionHeading"
                style={{ ...styles.title, ...styles.desc }}>
                {heading}
              </BalooThambiRegTextView>
            </View>
            {starredQuestionStore.favouritesList &&
              starredQuestionStore.favouritesList.length > 0 &&
              starredQuestionStore.favouritesList[0].data && (
                <FlatList
                  refreshControl={<RefreshControl refreshing={refreshing} />}
                  data={starredQuestionStore.favouritesList}
                  renderItem={renderItem}
                  keyExtractor={item => item.contentID}
                  onEndReached={fetchContent}
                  onEndReachedThreshold={0.9}
                  contentContainerStyle={styles.listContainerStyle}
                />
              )}

            {!starredQuestionStore.favouritesList && (
              <View style={styles.emptyStateBottomSixty}>
                <StarredQuestionEmpty9
                  accessible={true}
                  testID="StarredQuestionEmpty"
                  accessibilityLabel="StarredQuestionEmpty"
                  width={getWp(150)}
                  style={styles.searchIcon}
                />
                <BalooThambiRegTextView
                  testID="StarredQuestionEmptyStateText"
                  style={styles.emptyStateContainer}>
                  {starredQuestionEmptyState}
                </BalooThambiRegTextView>
                <RoundedButton
                  testID="RoundedButtonStarredQuestionGoHomeBtnText"
                  onPress={() => { props.navigation.navigate(ScreenNames.DashboardScreen); }}
                  type="primaryOrange"
                  text={goHomeBtnText}
                  width={150}
                  containerStyle={{ ...styles.goHomeBtnContainer }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
      <SelectionPopup
        testID="SelectionPopupStarredQuestion"
        show={removeFav}
        svgText={attentionPleaseText}
        desc={thisWillRemoveDescText}
        cancelBtnText={noCancelBtnText}
        actionBtnText={yesRemoveBtnText}
        onCancelPress={onCancelPressHandler}
        onActionPress={onActionPressHandler}
      />
    </DetailsScreen>
  );
};

export default observer(StarredQuestionScreen);

const bookmarkHeaderString = (favList: any, bookmarkedQuestionString: string) => {
  let heading = '';
  try {
    if (favList && favList.length && favList[0].data) {
      heading = `${favList.length} ${bookmarkedQuestionString}`;
    }
    if (heading.length > 1 && (favList.length == 0 || favList.length == 1)) {
      let subStr = heading.substring(heading.length - 1, heading.length);
      heading = subStr == 's' ? `${heading}`.substring(0, heading.length - 1) : heading;
    }
  } catch (error) {
    console.log('error logging for book marking', error);
  }
  return heading;
}
