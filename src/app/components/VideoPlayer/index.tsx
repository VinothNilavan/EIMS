// External Imports
import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video, { VideoRef, FullscreenOrientationType, ResizeMode } from 'react-native-video';
import PropTypes from 'prop-types';

// Internal Imports
import styles from './style';
import { PauseWhite, PlayWhite } from '@images';
import { getWp } from '@utils';
import { useLanguage } from '@hooks';

const VideoPlayerComp = forwardRef((props, ref) => {
    const {
        videoURL,
        videoPath,
        onVideoStarted,
        onVideoEnded,
        onVideoError,
        containerStyle,
        isPaused,
        onButtonPressed,
        fullScreenMode,
        textTracks,
        selectedTextTrack
    } = props;

    const videoRef = useRef<VideoRef>(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [videoSource, setVideoSource] = useState(null);

    const { loadingText } = useLanguage();

    useEffect(() => {
        if (videoURL) { setVideoSource({ uri: videoURL }); }
        if (videoPath) { setVideoSource(videoPath); }
    }, [videoURL, videoPath]);
    useImperativeHandle(ref, () => ({ onRestart() { videoRef.current.seek(0); } }));

    let videoContainerStyle = [styles.container, containerStyle];
    if (fullScreenMode) {
        videoContainerStyle = { ...styles.fullScreenContainer };
    }

    let playButton = null;

    if (isLoaded === false) {
        playButton = (
            <View style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>{loadingText}...</Text>
            </View>
        );
        playButton = <Text style={{ color: 'white' }}>{loadingText}...</Text>;
    } else {
        playButton = !fullScreenMode && (
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onButtonPressed} style={styles.btnStyle}>
                    {!isPaused ? (
                        <PauseWhite width={getWp(20)} height={getWp(20)} />
                    ) : (
                        <PlayWhite width={getWp(20)} height={getWp(20)} />
                    )}
                </TouchableOpacity>
            </View>
        );
    }

    let videoPlayer = null;
    if (videoSource) {
        videoPlayer = (
            <Video
                ref={videoRef}
                style={styles.videoView}
                source={videoSource}
                fullscreen={true}
                playWhenInactive={false}
                resizeMode= {ResizeMode.CONTAIN}
                paused={isPaused}
                fullscreenAutorotate={true}
                onVideoPlayStarted={onVideoStarted}
                playInBackground={false}
                onEnd={onVideoEnded}
                onError={onVideoError}
                fullscreenOrientation = {FullscreenOrientationType.LANDSCAPE}
                onLoad={() => setIsLoaded(true)}
                textTracks={textTracks}
                selectedTextTrack={selectedTextTrack}
                controls={true}
            />
        );
    }

    return (
        <View style={videoContainerStyle}>
            {videoPlayer}
            {playButton}
        </View>
    );
});

VideoPlayerComp.propTypes = {
    videoURL: PropTypes.string.isRequired,
    containerStyle: PropTypes.func,
    onVideoStarted: PropTypes.func,
    onVideoEnded: PropTypes.func,
    onVideoError: PropTypes.func,
    isPaused: PropTypes.bool,
    onButtonPressed: PropTypes.func,
};

VideoPlayerComp.defaultProps = {
    videoURL: '',
    onVideoPlayStarted: () => { console.log('play started'); },
    onVideoEnded: () => { console.log('play ended'); },
    onVideoError: () => { console.log('play error'); },
    isPaused: false,
    onButtonPressed: () => { console.log('on play pressed'); },
    fullScreenMode: false,
};

export default React.memo(VideoPlayerComp);