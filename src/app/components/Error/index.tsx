import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RobotoBoldTextView } from '@components';
import Modal from 'react-native-modal';
import styles from './style';
import { Internet } from '@images';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';

const NetworkError = props => {
  const store = useStores();
  const { noInternetLabel, notConnectedToNet } = useLanguage();

  const noNetworkText = noInternetLabel;
  const noInternetDescriptionText = notConnectedToNet;
  return (
    <Modal animationIn={'zoomIn'} animationOut="zoomOut" style={styles.container} isVisible={!store.uiStore.isNetConnected} >
      <View style={styles.errorView}>
        <Internet />
        <RobotoBoldTextView style={styles.textStyle}> {noNetworkText} </RobotoBoldTextView>
        <RobotoBoldTextView style={styles.secondaryTextStyle}> {noInternetDescriptionText} </RobotoBoldTextView>
      </View>
    </Modal>
  );
};


NetworkError.propTypes = {
  isNetConnected: PropTypes.bool.isRequired,
};

NetworkError.defaultProps = {
  isNetConnected: false,
};


export default observer(NetworkError);
