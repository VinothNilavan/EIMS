/* eslint-disable react/self-closing-comp */
import React from 'react';
import { View, ImageBackground } from 'react-native';
import { SampleImg } from '@images';

import { PlayButton } from '@components';
import NormalText from '@components/NormalText';
import styles from './indexCss';
import PropTypes from 'prop-types';
const Game = props => {
  const { testID, image, title, desc, containerStyle, onPress, isActive } = props;
  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={{ ...styles(isActive).container, ...containerStyle }}>
      <View key="innerContainer" style={{ ...styles(isActive).innerContainer }}>
        <View key="imageContainer" style={{ ...styles(isActive).imageContainer }}>
          <ImageBackground
            accessible={true}
            testID="GameImageBackground"
            accessibilityLabel="GameImageBackground"
            source={{ uri: image }}
            stretch={true}
            style={{ ...styles(isActive).imageBackgroundStyle }}
            imageStyle={{ ...styles(isActive).imageStyle }}
          />
        </View>
        <View key="textContainer" style={{ ...styles(isActive).textContainer }}>
          <NormalText
            testID="NormalTextGameTitle"
            text={title}
            styles={{ ...styles(isActive).title }}
          />
          <NormalText
            testID="NormalTextGameDesc"
            text={desc}
            styles={{ ...styles(isActive).desc }}
          />
        </View>
      </View>
      <View style={styles().playButtonContainer}>
        <PlayButton
          testID="PlayButtonGame"
          isActive={isActive}
          onPress={onPress}
          activeBtn={false}
        />
      </View>
    </View>
  );
};

Game.propTypes = {
  testID: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func,
  isActive: PropTypes.bool,
};

Game.defaultProps = {
  testID: 'Game',
  isActive: true,
  title: '7 Dwarfs 7 Dwarfs 7 Dwarfs 7 Dwarfs',
  desc: 'Reading tabular data and filling tables by counting (advanced)',
  image: SampleImg,
};

export default Game;
