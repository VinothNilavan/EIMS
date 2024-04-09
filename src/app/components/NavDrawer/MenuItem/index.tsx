/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { BalooThambiRegTextView } from '@components';
import styles from './indexCss';

const MenuItem = params => {
  const [isActive, setisActive] = useState(false);
  console.log('');
  const {
    testID,
    SvgIcon,
    label,
    callback,
    ActiveIcon,
    notificationCount,
  } = params;

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID}>
      <TouchableWithoutFeedback
        accessible={true}
        testID="MenuItemTouchableComp"
        accessibilityLabel="MenuItemTouchableComp"
        onPress={() => {
          setisActive(true);
          setTimeout(() => {
            setisActive(false);
          }, 2000);
          callback(label);
        }}>
        <View
          key="container"
          style={isActive ? styles.containerActive : styles.container}>
          {notificationCount > 0 && (
            <View style={styles.countContainer}>
              <BalooThambiRegTextView
                testID="SideMenuItemNotificationCount"
                style={styles.countText}>
                {notificationCount}
              </BalooThambiRegTextView>
            </View>
          )}
          {isActive ? (
            <ActiveIcon
              accessible={true}
              testID="MenuItemActiveIcon"
              accessibilityLabel="MenuItemActiveIcon"
              style={{ flex: 1 }}
            />
          ) : (
            <SvgIcon
              accessible={true}
              testID="MenuItemSvgIcon"
              accessibilityLabel="MenuItemSvgIcon"
              style={{ flex: 1, alignSelf: 'center' }}
            />
          )}
          <BalooThambiRegTextView
            testID="MenuItemLabel"
            style={isActive ? styles.textActive : styles.text}>
            {label}
          </BalooThambiRegTextView>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

MenuItem.propTypes = {
  testID: PropTypes.string,
  notificationCount: PropTypes.number,
};

MenuItem.defaultProps = {
  testID: 'MenuItem',
  notificationCount: 0,
};
export default MenuItem;
