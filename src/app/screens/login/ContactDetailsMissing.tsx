import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { getHp, getWp } from '@utils';
import { TEXTFONTSIZE } from '@constants';
import {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  RoundedButton,
  CommonHeader
} from '@components';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';
import { HeaderType } from '../../utils/helper';

const Screen = props => {
  const store = useStores();
  const { useOtherOption, parentDetailsMissing, goBackText } = useLanguage();

  return (
    <ScrollView>
      <View style={styles.screen}>
        <CommonHeader
          headerType={HeaderType.login}
          testID="LoginHeaderForgotPassword"
          lottieFileName="header"
          theme="generic"
          containerStyle={styles.header}
          helpNeedEnable={true}
        />

        <View style={styles.innerContainer}>
          <SourceSansProBoldTextView
            testID="userNameForgortPasswordText"
            style={{ ...styles.text, ...styles.title }}>
            Hey, {store.loginStore.username}
          </SourceSansProBoldTextView>
          <View>
            <SourceSansProRegTextView style={{ ...styles.messageText }}>
              {parentDetailsMissing}
            </SourceSansProRegTextView>
            <SourceSansProRegTextView style={{ ...styles.messageText2 }}>
              {useOtherOption}
            </SourceSansProRegTextView>
          </View>
          <RoundedButton
            testID="RoundedButtonForgotPasswordResetPassLabel"
            type="primaryOrange"
            text={goBackText}
            width={styles.submitBtn.width}
            height={styles.submitBtn.height}
            borderRadius={50}
            containerStyle={styles.submitBtn}
            onPress={() => {
              props.navigation.goBack();
            }}
            textStyle={styles.btnText}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: Platform.OS === 'ios' ? getHp(830) : getHp(860),
  },
  header: { marginBottom: getHp(72) },
  text: {
    marginBottom: getHp(36),
    fontSize: TEXTFONTSIZE.Text28,
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(33),
    width: '100%',
    flex: 1,
  },
  messageText: {
    fontSize: TEXTFONTSIZE.Text20,
    marginBottom: getHp(30),
    textAlign: 'center',
  },
  messageText2: {
    fontSize: TEXTFONTSIZE.Text20,
    marginBottom: getHp(30),
    textAlign: 'center',
    paddingLeft: getHp(40),
    paddingRight: getHp(40),
  },
  submitBtn: {
    width: '100%',
    height: getHp(60),
    marginBottom: getHp(24),
    position: 'absolute',
    bottom: 0,
  },
  btnText: { fontSize: TEXTFONTSIZE.Text16, textTransform: 'uppercase' },
});

export default observer(Screen);
