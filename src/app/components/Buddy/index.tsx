import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, Image } from 'react-native';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import { UseSound } from '@hooks';
import MotivationBuddy from './MotivationBuddy';
import { USE_NATIVE_DRIVER } from '@utils';
import { HappyBuddy } from '@images';

const Buddy = props => {
  const { style, isAnimated, isBuddyVisible } = props;
  const { playSound } = UseSound();
  const { qnaStore } = useStores();
  const [currentBuddy, setCurrentBuddy] = useState(1);
  const [newBuddies, setNewBuddies] = useState([]);
  const [sadSoundFlag, setSadSoundFlag] = useState(false);

  let rotateValueHolder = new Animated.Value(0);

  useEffect(() => {
    setNewBuddies(MotivationBuddy);
    setSadSoundFlag(false);
    setTimeout(() => {
      setCurrentBuddy(1);
    }, 500);

  }, [qnaStore.isMotivationBuddy]);

  useEffect(() => {
    configBuddy(qnaStore, currentBuddy, sadSoundFlag, playSadSound, setSadSoundFlag, setCurrentBuddy, newBuddies);
  }, [currentBuddy, qnaStore.isMotivationBuddy]);

  const idleHappyBuddy = () => {
    return (<Image style={styles.buddyImage} source={HappyBuddy} />);
  };

  const motivationalBuddies = () => {
    return (
      <View>
        {newBuddies[currentBuddy - 1]}
      </View>
    );
  };

  const rotateImage = () => {
    try {
      rotateValueHolder.setValue(0);
      Animated.timing(rotateValueHolder, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    } catch (error) {
      console.log(`error in rotateImage ${error}`)
    }
  };

  const RotateBuddy = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const playSadSound = () => {
    playSound('', '', 'incorrect.mp3');
  }

  const makeHappyBuddy = () => {
    return <Animated.Image
      style={{ height: 80, width: 52, transform: [{ rotate: RotateBuddy }] }}
      source={HappyBuddy}
      onLoad={() => {
        rotateImage();
        playSound('', '', 'correct.mp3');
      }} />;
  }

  const getBuddyFlag = () => sadBuddyFlag(qnaStore, isAnimated) ? motivationalBuddies() : idleHappyBuddy();

  return (
    currentBuddy && <View style={[style ? style : styles.container, { display: isBuddyVisible ? 'flex' : 'none' }]}>
      {happyFlag(qnaStore, isAnimated) ? (makeHappyBuddy()) : getBuddyFlag()}
    </View>
  );
};

Buddy.defaultProps = {
  isBuddyVisible: true
};


export default Buddy;

const configBuddy = (qnaStore, currentBuddy, sadSoundFlag, playSadSound, setSadSoundFlag, setCurrentBuddy, newBuddies) => {
  if (qnaStore.isMotivationBuddy) {
    setTimeout(() => {
      if (currentBuddy == 2 && (!sadSoundFlag)) {
        playSadSound();
        setSadSoundFlag(true);
      }
      setCurrentBuddy((currentBuddy <= (newBuddies.length - 1)) ? currentBuddy + 1 : 3);
    }, 500);
  }
}

const sadBuddyFlag = (qnaStore, isAnimated) => {
  return qnaStore.showDefaultBuddy === false && qnaStore.isAnswerCorrect === false && qnaStore.isTimeTest === false && isAnimated === true;
}

const happyFlag = (qnaStore, isAnimated) => {
  return qnaStore.showDefaultBuddy === false && qnaStore.isAnswerCorrect === true && qnaStore.isTimeTest === false && isAnimated === true;
}