import React from 'react';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';

const useUI = () => {
  const { uiStore } = useStores();

  const Loader = observer(() => uiStore.loader && <Loader />);

  return { Loader };
};

export default useUI;