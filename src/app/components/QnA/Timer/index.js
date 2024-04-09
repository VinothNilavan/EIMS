/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, AppState } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './indexCss';
import moment from 'moment';
import { useStores } from '@mobx/hooks';
import PropTypes from 'prop-types';

let intervalId;

const Timer = forwardRef((props, ref) => {
  const { testID, start, onTimeUp, containerStyle, textStyle } = props;
  const [startTime, setStartTime] = useState(moment());
  const [alertColor, setAlertColor] = useState(false);
  const store = useStores();
  const [appState, setAppState] = useState(AppState.currentState);
  let [secs, setSecs] = useState(0);
  let [mins, setMins] = useState(start);
  let counter = start * 60 * 1000;

  const handleAppStateChange = (state) => {
    setAppState(state);
  }

  useEffect(() => {
    if (appState == 'background') {
      let date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
      store.uiStore.setLastBackGrounndModeTime(date);
    }
  }, [appState]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    startInterval();
    setStartTime(moment());

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [startInterval]);

  const startInterval = useCallback(() => {
    let interval = 1000;
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      counter = configIntervaltimer(store, counter, interval, setMins, setSecs, onTimeUp, setAlertColor);
    }, interval);
  }, []);

  useImperativeHandle(ref, () => ({
    pause() {
      console.log('intervalId3', intervalId);
      clearInterval(intervalId);
      console.log('paused');
      return moment().diff(startTime, 'seconds');
    },

    resume() {
      counter = (mins * 60 + secs) * 1000;
      setStartTime(moment());
      startInterval();
    },

    start() {
      startInterval();
    },

    stop() {
      clearInterval(intervalId);
    },
  }));

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...alertColor ? styles.AlertBackgroundColor : styles.ConABackgroundColor, ...styles.container, ...containerStyle }}>
      <View style={styles.innerContainer}>
        <BalooThambiRegTextView
          testID="TimerMins"
          style={{ ...styles.text, ...textStyle }}>
          {mins < 10 ? `0${mins}` : mins} {`: `}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="TimerMin"
          style={{ ...styles.text, ...styles.label, ...textStyle }}>
          Min
        </BalooThambiRegTextView>
      </View>
      <View style={styles.innerContainer}>
        <BalooThambiRegTextView
          testID="TimerSecs"
          style={{ ...styles.text, ...textStyle }}>
          {secs < 10 ? `0${secs}` : secs}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="TimerSec"
          style={{ ...styles.text, ...styles.label, ...textStyle }}>
          Sec
        </BalooThambiRegTextView>
      </View>
    </View>
  );
});

Timer.propTypes = {
  testID: PropTypes.string,
  onTimeUp: PropTypes.func,
};

Timer.defaultProps = {
  testID: 'Timer',
  onTimeUp: () => { console.log('on time uo'); },
};

export default Timer;

const configIntervaltimer = (store, counter, interval, setMins, setSecs, onTimeUp, setAlertColor) => {
  let totalTime = counter;

  if (store.uiStore.lastBackGroundModeTime != null) {
    let currDate = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
    let PreDatw = moment(store.uiStore.lastBackGroundModeTime);
    let startTime = moment(PreDatw, 'YYYY-MM-DD hh:mm:ss');
    let endTime = moment(currDate, 'YYYY-MM-DD hh:mm:ss');
    let duration = moment.duration(endTime.diff(startTime));
    let second = parseInt(duration.asSeconds());
    counter = counter - second * 1000;
    store.uiStore.setLastBackGrounndModeTime(null);
  } else {
    counter = counter - interval;
  }
  if (counter === 0 || counter < 0) {
    setMins(0);
    setSecs(0);
    clearInterval(intervalId);
    onTimeUp();
  } else {
    let minutes = Math.floor(counter / 60000);
    let seconds = ((counter % 60000) / 1000).toFixed(0);
    let TwentyPercentOfTotalTime = (totalTime * 20) / 100;
    setAlertColor(counter < TwentyPercentOfTotalTime)
    setMins(minutes);
    setSecs(seconds);
  }
  return counter;
}