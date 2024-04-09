// External Imports
import React, { Fragment, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import Modal from 'react-native-modal';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { CustomModal } from '@components';

// Internal Imports
import PlayVideoScreen from '@screens/PlayVideoScreen';
import { useLanguage } from '@hooks';

const VideoModal = props => {
    const { setShowVideo, videoUrl, srtUrl, showVideo,onErrorClick } = props;
    const [showErrorModal, setShowErrModal] = useState(false);
    const { qnaStore } = useStores();
    const { tryAgainBtnText, somethingWentWrong } = useLanguage();

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    const onVideoEnded = () => {
        console.log(`Video ended>>>>>${qnaStore?.wordMeaningData.length}`);
        if (qnaStore?.wordMeaningData && qnaStore?.wordMeaningData.length > 0)
            qnaStore.setViewWordMeaningEnabled(true);
        else qnaStore.setViewQuestionEnabled(true);
        qnaStore.setVideoEnd(true);
    };

    const onVideoCloseHandler = () => {
        setShowVideo(false);
    };

    const onVideoErrorHandler = error => {
        setShowVideo(false);
        setTimeout(() => {
            setShowErrModal(true);
        }, 500);
    };

    return (
        <Fragment>
            <Modal
                isVisible={showVideo}
                style={{ margin: 0 }}
                deviceHeight={screenHeight}
                deviceWidth={screenWidth}>
                <PlayVideoScreen
                    onPressClose={onVideoCloseHandler}
                    onVideoEnded={onVideoEnded}
                    videoUrl={encodeURI(videoUrl)}
                    srtUrl={srtUrl}
                    onVideoError={onVideoErrorHandler}
                />
            </Modal>
            <CustomModal
                show={showErrorModal}
                btnText={tryAgainBtnText}
                showBtn={false}
                onPress={() => {
                    setShowErrModal(false);
                    if(onErrorClick){
                        onErrorClick();
                    }
                }}>
                <Text>{somethingWentWrong}</Text>
            </CustomModal>
        </Fragment>
    );
};

VideoModal.propTypes = {};

VideoModal.defaultProps = {};

export default observer(VideoModal);
