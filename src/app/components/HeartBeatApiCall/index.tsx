import React, { useEffect } from 'react';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { ApiEndPoint } from '@constants';
import { HeartBeatCall } from '@api';
import { getAsValue } from '@utils';

const HeartBeatApiCall = props => {
    const store = useStores();
    let interval;

    const triggerHeartBeat = (intervalTime)=>{
         interval = setInterval(async () => {
             if (intervalTime > 0) {
                 heartBeatApiCall();
             } else {
                 clearInterval(interval);
             }
         }, intervalTime);
    }

    useEffect(() => {
        (async () => {
            let IntervalTimeGap = await getAsValue('HeartBeatInterval');
            let intervalTime = parseInt(IntervalTimeGap || '0');
            if (intervalTime > 0) {
             triggerHeartBeat(intervalTime);
                return () => { clearInterval(interval); };
            }
        })();
    }, [store.appStore.validatepasswordApiCalled]);

    const heartBeatApiCall = async () => {
        if (store.uiStore.isNetConnected) {
            try {
                const reqBody = {
                    store: store,
                    body: { logoutType: "heartbeat" }
                };
                await HeartBeatCall(ApiEndPoint.HEARTBEAT, reqBody);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <></>
    );
};

export default observer(HeartBeatApiCall);