import { useEffect } from 'react';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';

const HomeSessionUsage = () => {

  const store = useStores();

  useEffect(() => {
    let interval; // Initialize timer variable

    const sessionTimeout = () => {
      store.uiStore.setIsHomeUsageDone(true);
      store.uiStore.setDisplayedHomeUsagePopup(true);
      clearInterval(interval);
    };

    const startTimer = () => { (async () => {

        const { sessionInformation } = store.appStore;

        const homeSessionUsageInt = sessionInformation?.dailyHomeUsageRemainingTime;
        const newIntervalTime = homeSessionUsageInt * 1000;
        if (store.loginStore.isAuth && newIntervalTime > 0) {
          interval = setInterval(async () => { sessionTimeout(); }, newIntervalTime);
        } else {
          store.uiStore.setDisplayedHomeUsagePopup(true);
        }
      })();
    };
    // Start the timer when the component mounts
    if(store.appStore.homeUsageAlertEnable) {
      startTimer();
    } else {
      clearInterval(interval);
    }

    // Clean up event listener when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [store.appStore.homeUsageAlertEnable]);

  return null;
};

export default observer(HomeSessionUsage);