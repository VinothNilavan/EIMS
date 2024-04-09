// External Imports
import React from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Internal Imports
import styles from './style';
import { NotificationWhite } from '@images';
import { COLORS } from '@constants';
import { getWp } from '@utils';
import { BalooThambiRegTextView } from '@components';

const PreferenceSwitch = props => {
  const {
    testID,
    Icon,
    title,
    titleTextStyle,
    defaultTrackColor,
    activeTrackColor,
    defaultThumbColor,
    activeThumbColor,
    backgroundColor,
    isEnabled,
    onValueChange,
    switchTexts,
  } = props;

  return (
    <TouchableOpacity
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={styles.container}
      onPress={onValueChange}>
      <View style={styles.titleContainer}>
        <Icon
          accessible={true}
          testID="PreferenceSwitchIcon"
          accessibilityLabel="PreferenceSwitchIcon"
          width={getWp(24)}
          height={getWp(24)}
        />
        <BalooThambiRegTextView
          testID="PreferenceSwitchTitleTxt"
          style={[styles.titleText, titleTextStyle]}>
          {title}
        </BalooThambiRegTextView>
      </View>
      <View style={styles.switchContainer}>
        <BalooThambiRegTextView
          testID="PreferenceSwitchTexts1"
          style={styles.switchText}>
          {switchTexts !== null && switchTexts.length > 0 ? switchTexts[0] : ''}
        </BalooThambiRegTextView>
        <Switch
          accessible={true}
          testID="PreferenceSwitchComp"
          accessibilityLabel="PreferenceSwitchComp"
          trackColor={{ false: defaultTrackColor, true: activeTrackColor }}
          thumbColor={isEnabled ? activeThumbColor : defaultThumbColor}
          ios_backgroundColor={backgroundColor}
          onValueChange={onValueChange}
          value={isEnabled}
        />
        <BalooThambiRegTextView
          testID="PreferenceSwitchTexts2"
          style={[styles.switchText, { opacity: 0.7 }]}>
          {switchTexts !== null && switchTexts.length > 1 ? switchTexts[1] : ''}
        </BalooThambiRegTextView>
      </View>
    </TouchableOpacity>
  );
};

PreferenceSwitch.propTypes = {
  testID: PropTypes.string,
  Icon: PropTypes.func,
  title: PropTypes.string,
  titleTextStyle: PropTypes.func,
  defaultTrackColor: PropTypes.string,
  activeTrackColor: PropTypes.string,
  defaultThumbColor: PropTypes.string,
  activeThumbColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  isEnabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  switchTexts: PropTypes.array,
};

PreferenceSwitch.defaultProps = {
  testID: 'PreferenceSwitch',
  Icon: NotificationWhite,
  title: '',
  defaultTrackColor: COLORS.white,
  activeTrackColor: COLORS.white,
  defaultThumbColor: COLORS.defaultThumbColor,
  activeThumbColor: COLORS.activeThumbColor,
  isEnabled: false,
  backgroundColor: COLORS.white,
  onValueChange: () => { console.log('on value change'); },
  switchTexts: ['Off', 'On'],
};

export default PreferenceSwitch;
