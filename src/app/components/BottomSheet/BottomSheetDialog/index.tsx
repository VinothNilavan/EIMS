import React from 'react';
import { View } from 'react-native';
import { SubTitleTwo, RoundedButton } from '@components';
import { COLORS } from '@constants';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';
import { useToast } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const BottomSheetDialog = props => {
  const { SvgImage, show } = props;
  const Toast = useToast();
  const {
    thisUserNotRegisteredText,
    helloLoginText,
    createGuestAccountText,
    loginBtnName,
  } = useLanguage();
  const modalContent = (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: wp('90'),
        height: hp('45'),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
      }}>
      <View
        style={{ flex: 3, justifyContent: 'flex-end', marginBottom: hp('1.8') }}>
        <SvgImage width={wp('60')} height={hp('17.2')} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <SubTitleTwo
          text={thisUserNotRegisteredText}
          styles={{
            color: COLORS.popUpTextColor,
            lineHeight: hp('3.2'),
          }}></SubTitleTwo>
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <RoundedButton
          onPress={() => {
            if (!Toast.isActive(3)) {
              Toast.show({
                id: 3,
                description: helloLoginText,
              });
            }
          }}
          type="primaryOrange"
          text={createGuestAccountText}
          width={wp('80')}
          height={hp('6')}
          containerStyle={{
            marginStart: wp('5'),
            marginEnd: wp('5'),
            marginBottom: hp('1'),
          }}>
          {loginBtnName}
        </RoundedButton>
      </View>
    </View>
  );
  return (
    <Modal
      isVisible={show}
      animationIn="fadeInLeftBig"
      animationOut="fadeOutLeftBig"
      style={{ margin: 0 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>{modalContent}</View>
    </Modal>
  );
};

BottomSheetDialog.propTypes = {
  SvgImage: PropTypes.func,
  onClickBtn: PropTypes.func,
  show: PropTypes.bool,
};

export default BottomSheetDialog;
