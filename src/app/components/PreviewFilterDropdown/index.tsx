// External Imports
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// Internal Imports
import styles from './style';
import { RobotoMediumTextView } from '@components';
import ModalDropdown from '../ModalDropdown';
import { ArrowUpRed, ArrowDownRed } from '@images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PreviewFilterDropdown = props => {
  const { testID, items, onSelect, placeholder } = props;

  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef();

  const renderButtonText = rowData => {
    return rowData?.value;
  };

  const renderDropdownItem = rowData => {
    return (
      <View style={styles.dropdownItemContainer}>
        <RobotoMediumTextView style={styles.dropdownText}>
          {rowData?.value}
        </RobotoMediumTextView>
      </View>
    );
  };

  const toggleIcon = () => {
    setExpanded(!expanded);
    dropdownRef.current.show();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessible={true}
      testID="PreviewFilterDropDownToggleIcon"
      accessibilityLabel="PreviewFilterDropDownToggleIcon"
      onPress={toggleIcon}>
      <View
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={styles.container}>
        <ModalDropdown
          ref={dropdownRef}
          style={styles.dropdownContainer}
          textStyle={styles.dropdownSelectedText}
          dropdownStyle={styles.dropdown}
          defaultValue={placeholder}
          options={items}
          renderButtonText={renderButtonText}
          renderRow={renderDropdownItem.bind(this)}
          onSelect={index => onSelect(items[index])}
          onDropdownWillShow={() => setExpanded(true)}
          onDropdownWillHide={() => setExpanded(false)}
        />
        {expanded ? <ArrowUpRed /> : <ArrowDownRed />}
      </View>
    </TouchableOpacity>
  );
};

PreviewFilterDropdown.propTypes = {
  testID: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedValue: PropTypes.object,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
};

PreviewFilterDropdown.defaultProps = {
  testID: 'PreviewFilterDropdown',
  items: [],
  selectedValue: null,
  placeholder: '',
  onSelect: () => { console.log('preview filter') },
};

export default PreviewFilterDropdown;
