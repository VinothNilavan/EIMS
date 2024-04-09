import React from 'react';
import { View } from 'react-native';
import RoundedButton from '../../../RoundedButton';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../../../constants/COLORS';

const LargeButton = (props) => {
  const { testID, text, clicked, width, height } = props;
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={{ marginBottom: hp('3.2') }}>
      <RoundedButton
        testID="RoundedButtonLargeButtonTitle"
        onPress={clicked}
        type="secondaryWhite"
        text={text}
        width={width}
        height={height}
        borderRadius={25}
        textStyle={{
          color: COLORS.dashboardTopicTitle,
          fontSize: hp('3.2'),
          fontFamily: 'BalooThambi-Regular',
        }}
        {...props}
      />
    </View>
  );
};

LargeButton.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

LargeButton.defaultProps = {
  testID: 'LargeButton',
  width: wp('60'),
  height: hp('12.5'),
};

export default LargeButton;
