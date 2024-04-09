import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';
import { MyAutoHeightWebView, QnAVideoModal } from '@components';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { PlayWhite } from '@images';
import { getWp } from '@utils';
import getHtmlTemplate from '@utils/getHtmlTemplate';

const Passage = props => {
  const { passageTree, audioCleanup, onErrorClick } = props;
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  const [titleBody, setTitleBody] = useState('');
  const [introductionBody, setIntroductionBody] = useState('');
  const [descriptionBody, setDescriptionBody] = useState('');
  const [enableVideo, setEnableVideo] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [srtUrl, setSrtUrl] = useState(null);

  useEffect(() => {
    if (passageTree?.title && passageTree?.title.length > 0) {
      setTitleBody(
        // QHtmlTemplateForIframe(passageTree?.title, wp(100), store, true)
        getHtmlTemplate(passageTree?.title, true, isRTL),
      );
    }
    if (passageTree?.introduction && passageTree?.introduction.length > 0) {
      setIntroductionBody(
        // QHtmlTemplateForIframe(passageTree?.introduction, wp(100), store, true)
        getHtmlTemplate(passageTree?.introduction, true, isRTL),
      );
    }
    if (passageTree?.description && passageTree?.description.length > 0) {
      setDescriptionBody(
        // QHtmlTemplateForIframe(passageTree?.description, wp(100), store, true)
        getHtmlTemplate(passageTree?.description, true, isRTL),
      );
    }

    if (
      passageTree &&
      passageTree?.type &&
      passageTree?.type === 'video' &&
      passageTree?.descriptionFile &&
      passageTree?.descriptionFile !== ''
    ) {
      setEnableVideo(true);
      setTitleBody('');
      setIntroductionBody('');
      setDescriptionBody('');
    }

    audioCleanup(false);
  }, [passageTree]);


  const onVideoButtonPressed = () => {
    setShowVideo(true);
    setVideoUrl(passageTree?.descriptionFile);
    setSrtUrl(passageTree?.subTitleFile);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {enableVideo && (
          <View style={styles.playerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onVideoButtonPressed}
                style={styles.btnStyle}>
                <PlayWhite width={getWp(20)} height={getWp(20)} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {titleBody && titleBody !== '' ? (
          <MyAutoHeightWebView
            key="passageTitleKey"
            customScript={''}
            style={styles.webviewContainer}
            onSizeUpdated={size => {
              console.log('height : passage', size.height);
            }}
            source={{ html: titleBody }}
            zoomable={false}
          />
        ) : null}
        <View style={styles.separatorView} />
        {introductionBody && introductionBody !== '' ? (
          <View>
            <MyAutoHeightWebView
              key="passageInstructionKey"
              style={styles.webviewContainer}
              customScript={''}
              onSizeUpdated={size => {
                console.log('height : passage', size.height);
              }}
              source={{ html: introductionBody }}
              zoomable={false}
            />
            <View style={styles.separatorView} />
          </View>
        ) : null}
        {descriptionBody && descriptionBody !== '' ? (
          <MyAutoHeightWebView
            key="passageDescriptionKey"
            style={styles.webviewContainer}
            customScript={''}
            onSizeUpdated={size => {
              console.log('height  : passage ', size.height);
            }}
            source={{ html: descriptionBody }}
            androidAcceleration={'false'}
            zoomable={false}
            androidLayerType={'hardware'}
          />
        ) : null}
      </View>
      <QnAVideoModal
        setShowVideo={setShowVideo}
        videoUrl={videoUrl}
        srtUrl={srtUrl}
        onErrorClick={onErrorClick}
        showVideo={showVideo}
      />
    </View>
  );
};

Passage.propTypes = {
  passageTree: PropTypes.object,
};

Passage.defaultProps = {};

export default observer(Passage);
