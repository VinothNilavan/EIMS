import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { BalooThambiRegTextView } from '@components';

const sideMenuItem = props => {
  const { testID, SvgItem, itemStyle, notificationCount, clicked } = props;
  return (
    <TouchableOpacity accessible={true} testID={testID} accessibilityLabel={testID} onPress={clicked}>
      <SvgItem
        accessible={true}
        testID="SideMenuItemSvgItem"
        accessibilityLabel="SideMenuItemSvgItem"
        width={styles.svgStyle.width}
        height={styles.svgStyle.height}
        style={{ ...styles.svgStyle, ...itemStyle }}
      />
      {notificationCount > 0 &&
        <View style={styles.countContainer}>
          <BalooThambiRegTextView
            testID="SideMenuItemNotificationCount"
            style={styles.countText}>
            {notificationCount}
          </BalooThambiRegTextView>
        </View>
      }
    </TouchableOpacity>
  );
};

sideMenuItem.propTypes = {
  testID: PropTypes.string,
  SvgItem: PropTypes.func.isRequired,
  itemStyle: PropTypes.object,
  clicked: PropTypes.func.isRequired,
  notificationCount: PropTypes.number,
};

sideMenuItem.defaultProps = {
  testID: 'SideMenuItem',
  notificationCount: 0,
}

export default sideMenuItem;
