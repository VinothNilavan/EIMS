// External Imports
import React, { memo } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

// Internal Imports
import styles from './style';
import { ErrorClose } from '@images';
import { getWp } from '@utils';

const HomeworkSolutionImageModal = props => {
  const { isVisible, imageURL, onPress } = props;

  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.container}>
        <Image
          resizeMethod="auto"
          style={styles.imageContainer}
          source={{ uri: imageURL }}
        />
        <TouchableOpacity onPress={onPress} style={styles.closeButtonContainer}>
          <ErrorClose width={getWp(24)} height={getWp(24)} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

HomeworkSolutionImageModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  imageURL: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

HomeworkSolutionImageModal.defaultProps = {
  isVisible: false,
  imageURL: '',
  onPress: () => { console.log(`HomeworkSolutionImageModal default onPress`) },
};

export default memo(HomeworkSolutionImageModal);
