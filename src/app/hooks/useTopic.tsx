import { useState, useEffect } from 'react';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { ApiEndPoint } from '@constants';

export const useTopic = () => {
  const store = useStores();

  const [allTopics, setAllTopics] = useState([]);
  const [sectionedTopic, setSectionedTopic] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [topicReport, setTopicReport] = useState({});

  useEffect(() => {
    console.log('CALLED1', searchQuery);
    let activeT = allTopics.filter(item => {
      return (
        item.contentStatus === 'active' &&
        item.contentName.indexOf(searchQuery) != -1
      );
    });
    let otherT = allTopics.filter(item => {
      return (
        item.contentStatus === 'deactive' &&
        item.contentName.indexOf(searchQuery) != -1
      );
    });
    setSectionList(activeT, otherT);
  }, [allTopics, searchQuery]);

  const getMyTopics = async () => {
    const req = {
      body: {},
      store,
    };
    try {
      let response = await API(ApiEndPoint.GET_MY_TOPICS, req);
      if (response.data.resultCode === 'C001') {
        setAllTopics(response.data.topicList);
        console.log('\nresponse.length\n', response.data.topicList.length);
        //Find if priority topic
        let { priorityTopic, activeT, otherT } = configTopics(response);
        priorityTopic && store.qnaStore.setPriorityTopic(priorityTopic);
        setSectionList(activeT, otherT);
      } else {
        if (response.status && response.data?.resultMessage && response.data?.resultMessage != "") {
          store.uiStore.apiErrorInit({
            code: response.status,
            message: response.data?.resultMessage,
          });
        }
      }
    } catch (e) {
      console.log(`Topic list error>>>${e}`);
    }
  };

  const setSectionList = (activeT, otherT) => {
    if (activeT !== null && activeT.length < 1) {
      activeT.push({ title: 'No Active Topics Found', isEmpty: true });
    }

    if (otherT !== null && otherT.length < 1) {
      otherT.push({ title: 'No Other Topics Found', isEmpty: true });
    }

    let section = [
      {
        title: ' Active Topics',
        data: activeT,
      },
      {
        title: 'Other Topics',
        data: otherT,
      },
    ];

    setSectionedTopic(section);
  };

  const fetchTopicTrail = async (index, topic) => {
    if (refreshing) {
      return;
    }
    console.log('\nIndex', index);
    if (index !== 1) {
      index = store.topicTrailsStore?.topicDetails?.currentPage + 1;
      if (index > store.topicTrailsStore?.topicDetails?.totalPages) {
        return;
      }
    }
    setRefreshing(true);
    let req = {
      body: {
        topicId: topic.contentID,
        index: index,
        limit: 20,
        startFrom: (index - 1) * 20 + 1,
      },
      store: store,
    };
    let res = await API(ApiEndPoint.GET_TOPIC_TRAILS, req);
    if (res.data.resultCode === 'C001') {
      topicStoreConfig(index, store, res);
    } else {
      if (res.status && res.data?.resultMessage && res.data?.resultMessage != "") {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    }

    setRefreshing(false);
  };

  const fetchTopicReport = async () => {
    const reqBody = {
      store: store,
      body: {
        topicID: store.qnaStore.topicId,
      },
    };
    try {
      const response = await API(ApiEndPoint.TOPIC_SESSION_REPORT, reqBody);
      console.log('\n\n response', JSON.stringify(response.data));
      if (response.data.resultCode === 'C001') {
        let sessionReport = response.data.sessionReport;
        sessionReport.sessionReward = response.data.sessionReward;
        setTopicReport(sessionReport);
      } else {
        if (response.status && response.data?.resultMessage && response.data?.resultMessage != "") {
          store.uiStore.apiErrorInit({
            code: response.status,
            message: response.data?.resultMessage,
          });
        }
      }
    } catch (e) {
      console.log(`Reward Details error>>>${e}`);
    }
  };

  const filterHowIDidItems = mode => {
    switch (mode) {
      case 'all':
        console.log(`setting topic list`);
        setTopicList(store.topicTrailsStore.trailList);
        break;
      case 'wrong':
        setTopicList(
          store.topicTrailsStore.trailList.filter(
            item => item.userAttemptData.result === 'fail',
          ),
        );
        break;
      case 'right':
        setTopicList(
          store.topicTrailsStore.trailList.filter(
            item => item.userAttemptData.result === 'pass',
          ),
        );
        break;
    }
  };

  return {
    getMyTopics,
    sectionedTopic,
    searchQuery,
    setSearchQuery,
    fetchTopicTrail,
    filterHowIDidItems,
    topicList,
    refreshing,
    fetchTopicReport,
    topicReport,
  };
};
const configTopics = (response: any) => {
  let priorityTopic = [];
  let activeT = [];
  let otherT = [];

  response.data.topicList.forEach(item => {
    if (item.contentStatus === 'active') {
      activeT.push(item);
    }

    if (item.contentStatus === 'deactive') {
      otherT.push(item);
    }

    if (item.priority === true) {
      priorityTopic.push(item);
    }
  });
  return { priorityTopic, activeT, otherT };
}

const topicStoreConfig = (index: any, store: any, res: any) => {
  if (index === 1) {
    store.topicTrailsStore.init(res.data);
  } else {
    console.log('TopicTrailRespons page', res.data);
    store.topicTrailsStore.setTrailList(
      store.topicTrailsStore.trailList.concat(res.data.trailList)
    );
    store.topicTrailsStore.setTopicDetails(res.data.topicDetails);
  }
}
