import React, { useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';

import LottieView from 'lottie-react-native';
import { Lottie } from '@lottie/lottieFiles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SimpleLottie = params => {
  const {
    testID,
    theme,
    onPress,
    styles,
    currIndex,
    jsonFileName,
    autoPlay,
    loop,
  } = params;
  const lottieRef = useRef(null);

  let source = null;

  useEffect(() => {
    lottieRef && source && lottieRef.current.play();
  }, [lottieRef, source, currIndex]);

  if (Lottie[theme][jsonFileName]) {
    source = Lottie[theme][jsonFileName];
  }

  return (
    <Fragment>
      {source && (
        <TouchableWithoutFeedback onPress={onPress}>
          <LottieView
            accessible={true}
            testID={testID}
            accessibilityLabel={testID}
            ref={lottieRef}
            source={source}
            autoPlay={autoPlay ? autoPlay : true}
            loop={loop ? loop : true}
            style={{ ...styles }}
            {...params}
            autoSize={false}
          />
        </TouchableWithoutFeedback>
      )}
    </Fragment>
  );
};

SimpleLottie.propTypes = {
  testID: PropTypes.string,
  jsonFileName: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  currIndex: PropTypes.number,
};

SimpleLottie.defaultProps = {
  testID: 'SimpleLottie',
  styles: {
    width: '100%',
    height: '100%',
  },
  lottie: {},
  autoPlay: true,
  loop: true,
};

export default SimpleLottie;
