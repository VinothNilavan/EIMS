import { useState } from 'react';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { ApiEndPoint } from '@constants';

const useStarQuestion = () => {
  const [starred, setStarred] = useState(false);
  const store = useStores();
  
  const onStarHandler = async (reqObj, starred) => {
    const req = { body: reqObj, store };
    let endPt = starred ? ApiEndPoint.REMOVE_FROM_FAVOURITES : ApiEndPoint.ADD_TO_FAVOURITES;
    const response = await API(endPt, req);
    if (response.data.resultCode == 'C001') {
      setStarred(!starred);
    } else {
      store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
    }
  };
  return { onStarHandler, starred, setStarred };
};

export default useStarQuestion;