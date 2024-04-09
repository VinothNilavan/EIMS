// External Imports
import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextTrackType, FullscreenOrientationType, ResizeMode } from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

// Internal Imports
import styles from './indexCss';
import { SVGImageBackground, RoundedButton, VideoPlayer } from '@components';
import { GameBg } from '@images';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';

const PlayVideoScreen = props => {
    const {
        onPressClose,
        onVideoEnded,
        videoUrl,
        srtUrl,
        onVideoError,
        displayMode,
        videoPath,
    } = props;

    const videoRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const { appStore } = useStores();
    const { closeText } = useLanguage();

    useEffect(() => {
        if (displayMode == 'landscape') {
            Orientation.lockToLandscape();
        }

        return () => {
            if (displayMode == 'landscape') {
                Orientation.lockToPortrait();
            }
        };
    }, [displayMode]);

    const onVideoButtonPressed = () => {
        setIsPaused(prevState => !prevState);
    };

    let textTracks = [];
    let selectedTextTrack = {};

    if (srtUrl) {
        textTracks.push({
            title: `${appStore.userLanguage ? appStore.userLanguage : 'en-IN'}_subtitles`,
            language: appStore.userLanguage ? appStore.userLanguage : 'en-IN',
            type: TextTrackType.SRT,
            uri: srtUrl,
        });

        selectedTextTrack = {
            value: `${appStore.userLanguage ? appStore.userLanguage : 'en-IN'}_subtitles`,
            type: 'title',
        };
    }

    return (
        <View style={styles.container}>
            <SVGImageBackground SvgImage={GameBg} screenBg>
                <VideoPlayer
                    ref={videoRef}
                    videoURL={videoUrl}
                    videoPath={videoPath}
                    fullscreen={true}
                    playWhenInactive={false}
                    resizeMode={ResizeMode.CONTAIN}
                    isPaused={isPaused}
                    fullscreenAutorotate={true}
                    playInBackground={false}
                    onVideoEnded={() => {
                        setIsPaused(true);
                        onVideoEnded();
                        onPressClose();
                    }}
                    onVideoError={onVideoError}
                    fullscreenOrientation={FullscreenOrientationType.LANDSCAPE}
                    fullScreenMode={true}
                    onButtonPressed={onVideoButtonPressed}
                    textTracks={textTracks}
                    selectedTextTrack={selectedTextTrack}
                />
            </SVGImageBackground>
            <View style={styles.btnContainer}>
                <RoundedButton
                    type="squareOrange"
                    text={closeText}
                    textStyle={styles.btnText}
                    width={styles.btnStyle.width}
                    height={styles.btnStyle.width}
                    onPress={() => {
                        setIsPaused(true);
                        onPressClose();
                    }}
                />
            </View>
        </View>
    );
};

PlayVideoScreen.propTypes = {};

PlayVideoScreen.defaultProps = {
    onVideoError: () => { console.log('play error in props'); },
    displayMode: 'landscape',
};

export default PlayVideoScreen;
