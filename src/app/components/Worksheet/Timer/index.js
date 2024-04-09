/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './indexCss';
import moment from 'moment';
import PropTypes from 'prop-types';

let intervalId;
const Timer = forwardRef((props, ref) => {
  const { testID, start, critical, onTimeUp, containerStyle, textStyle } = props;
  const [startTime, setStartTime] = useState(moment());
  let [isCritical, setIsCritical] = useState(false);
  let counter = start * 1000;
  let totalTime = counter;
  let criticalTime = critical * 1000;
  let [mins, setMins] = useState(Math.floor(counter / 60000));
  let [secs, setSecs] = useState(((counter % 60000) / 1000).toFixed(0));

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
      console.log(counter);
      counter = counter - interval;
      if (counter === 0) {
        setMins(0);
        setSecs(0);
        clearInterval(intervalId);
        onTimeUp();
      } else {
        let minutes = Math.floor(counter / 60000);
        let seconds = ((counter % 60000) / 1000).toFixed(0);
        if (critical) {
          if (counter === criticalTime) {
            setIsCritical(true);
          }
        } else {
          checkBackGroundColor();
        }
        setMins(minutes);
        setSecs(seconds);
      }
    }, interval);
  }, []);

  const checkBackGroundColor = () => {
    let TwentyPercentOfTotalTime = (totalTime * 10) / 100;
    if (counter < TwentyPercentOfTotalTime) {
      setIsCritical(true);
    } else {
      setIsCritical(false);
    }
  }

  useImperativeHandle(ref, () => ({
    pause() {
      clearInterval(intervalId);
      return moment().diff(startTime, 'seconds');
    },

    resume() {
      counter = (mins * 60 + secs) * 1000;
      setStartTime(moment());
      startInterval();
    },

    stop() {
      clearInterval(intervalId);
    },

    start() {
      startInterval();
    },
  }));

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.innerContainer}>
        <BalooThambiRegTextView
          testID="WorkSheetTimeinMins"
          style={[styles.text, isCritical && styles.critical, textStyle]}>
          {mins < 10 ? `0${mins}` : mins} {`: `}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="WorkSheetMin"
          style={{ ...styles.text, ...styles.label, ...textStyle }}>
          Min
        </BalooThambiRegTextView>
      </View>
      <View style={styles.innerContainer}>
        <BalooThambiRegTextView
          testID="WorkSheetTimeinSecs"
          style={[styles.text, isCritical && styles.critical, textStyle]}>
          {secs < 10 ? `0${secs}` : `${secs}`}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="WorkSheetSec"
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
  onTimeUp: () => { console.log('timer on timeUp')},
};

export default Timer;
