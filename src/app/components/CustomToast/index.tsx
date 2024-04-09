import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { COLORS } from '@constants';

const Toast = props => {
  const { title_text, textdesc, background_color, hideToast } = props;

  const onclose = () => {
    hideToast();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={{ left: 1, width: '90%' }}>
          <Text style={styles.titleText}>{title_text}</Text>
        </View>
        <TouchableOpacity style={{ right: 1, width: '7%' }} onPress={onclose}>
          <View style={styles.close_button_container}>
            <Text style={{
              padding: '2%',
              color: 'gray',
              fontSize: 18,
              marginBottom: 5,
              position: 'absolute',
              marginRight: 4,
            }}>
              {'x'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '80%',
          width: '100%',
          borderRadius: 5,
          backgroundColor: background_color == 'lightpink' ? COLORS.Toastpink : COLORS.Toastlightgreen
        }}>
        <Text
          style={[
            styles.descriptionText, {
              color: background_color == 'lightpink' ? COLORS.Toastred : COLORS.Toastgreen,
            },
          ]}>
          {textdesc}
        </Text>
      </View>
    </View>
  );
};

Toast.propTypes = {
  title_text: PropTypes.string,
  textdesc: PropTypes.string,
  background_color: PropTypes.string,
  hideToast: PropTypes.func,
  enablebtn: PropTypes.bool,
};

Toast.defaultProps = {
  background_color: 'green',
  title_text: '',
  textdesc: '',
  hideToast: () => {
    console.log('Default HideToast Invoked');
  },
  enablebtn: false,
};

export default Toast;
