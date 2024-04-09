import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PedagogyItem = props => {
  const { testID, containerStyle, style, color } = props;
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={{ ...containerStyle }}>
      <View
        style={{
          backgroundColor: color,
          height: hp('1'),
          width: wp('5'),
          marginLeft: wp('1'),
          borderRadius: wp('10'),
          ...style,
        }}
      />
    </View>
  );
};

PedagogyItem.propTypes = {
  testID: PropTypes.string
};

PedagogyItem.defaultProps = {
  testID: 'PedagogyItem',
  color: COLORS.green,
};
export default PedagogyItem;