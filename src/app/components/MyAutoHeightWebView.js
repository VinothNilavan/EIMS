'use strict';
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

import { StyleSheet, Platform, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import UserAgent from 'react-native-user-agent';
import { reduceData, getWidth, isSizeChanged } from '@utils/AutoHeightWebViewUtils';
import { useToast } from 'native-base';
import { Config } from 'react-native-config';

const MyAutoHeightWebView = forwardRef((props, ref) => {
  const {
    testID,
    style,
    onMessage,
    onSizeUpdated,
    source,
    androidAcceleration,
    androidLayerType,
    noAutoPlay
  } = props;

  const Toast = useToast();
  let webView = useRef();


  useImperativeHandle(ref, () => ({
    stopLoading: () => webView.current.stopLoading(),
    goForward: () => webView.current.goForward(),
    goBack: () => webView.current.goBack(),
    reload: () => webView.current.reload(),
    postMessage: e => webView.current.postMessage(e),
    injectJavaScript: script => webView.current.injectJavaScript(script),
  }));

  useEffect( () => onSizeUpdated && onSizeUpdated({ height, width }), [width, height, onSizeUpdated], );

  const [size, setSize] = useState({ height: configHeightStyle(style), width: getWidth(style) });
  const { currentSource } = reduceData(props);
  const { width, height } = size;


  if (!source) { return null; }


  const handleMessage = event => {
    try {
      onMessage && onMessage(event);

      if (!event.nativeEvent) {
        return;
      }
      let data = {};
      // Sometimes the message is invalid JSON, so we ignore that case
      try {
        data = JSON.parse(event.nativeEvent.data);
      } catch (error) {
        return;
      }
      const { height, width } = data;
      const { height: previousHeight, width: previousWidth } = size;
      isSizeChanged({ height, previousHeight, width, previousWidth }) && setSize({ height, width });
    } catch (err) {
      if (!Toast.isActive(1)) {
        Toast.show({ id: 1, description: 'HANDLEMESSAGE error:::' + err });
      }
    }
  };


  let userAgentNew = getUserAgentConfig()

  return (
    <WebView mediaPlaybackRequiresUserAction={noAutoPlay}
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      {...props}
      ref={webView}
      onMessage={handleMessage}
      userAgent={userAgentNew}
      style={[ styles.webView, { width, height }, style ]}
      injectedJavaScript={props.script}
      showsHorizontalScrollIndicator={true}
      source={currentSource}
      textZoom={100}
      androidHardwareAccelerationDisabled={ androidAcceleration === 'false' ? false : true }
      androidLayerType={androidLayerType ? androidLayerType : 'software'}
    />
  );
});

MyAutoHeightWebView.propTypes = {
  testID: PropTypes.string,
  onSizeUpdated: PropTypes.func,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      type: PropTypes.string,
      rel: PropTypes.string,
    }),
  ),
  style: ViewPropTypes.style,
  customScript: PropTypes.string,
  customStyle: PropTypes.string,
  zoomable: PropTypes.bool,
  // webview props
  originWhitelist: PropTypes.arrayOf(PropTypes.string),
  onMessage: PropTypes.func,
  source: PropTypes.object,
};

let defaultProps = {
  testID: 'MyAutoHeightWebView',
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  originWhitelist: ['*'],
  zoomable: true,
  noAutoPlay: false
};

Platform.OS === 'android' && Object.assign(defaultProps, { scalesPageToFit: false });

MyAutoHeightWebView.defaultProps = defaultProps;

const styles = StyleSheet.create({
  webView: {
    backgroundColor: 'transparent',
    flex: 1,
    opacity: 0.99,
  },
});

export default React.memo(MyAutoHeightWebView);

const configHeightStyle = (style) => {
  return style && style.height ? style.height : 1;
}

const getUserAgentConfig = () => {
  let userAgent = UserAgent.getUserAgent();
  return Platform.OS === 'android' ? `${Config.CONFIG_KEY + '||' + userAgent}` : `EISecret_ConfigKey||edicine/4.3.11 Safari || ${userAgent}`;
}