import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './style';
import PropTypes from 'prop-types';
import { Calender } from '@images';
import { BalooThambiRegTextView } from '@components';
import moment from 'moment';
import { getWp } from '@utils';

const DatePicker = props => {
  const { title, defaultValue, style, onDateSet } = props;
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dob = new Date();
  dob.setFullYear(dob.getFullYear() - 4);

  const handleConfirm = selectedDate => {
    hideDatePicker();
    const currentDate = selectedDate || date;
    setDate(currentDate);
    onDateSet(currentDate);
    setValue(moment(currentDate).format('DD MMMM YYYY'));
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback
        onPress={() => {
          setDatePickerVisibility(true);
        }}>
        <View style={styles.row}>
          <View style={styles.flexOne}>
            <BalooThambiRegTextView style={styles.title}>
              {title}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView style={[styles.field]}>
              {value ? value : defaultValue}
            </BalooThambiRegTextView>
          </View>
          <Calender width={getWp(32)} height={getWp(32)} />
        </View>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        value={date}
        mode={'date'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={dob}
      />
    </View>
  );
};

DatePicker.propTypes = {
  title: PropTypes.string,
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  onDateSet: PropTypes.func,
};

DatePicker.defaultProps = {
  defaultValue: '',
  onDateSet: () => { console.log('date pickers') },
};
export default DatePicker;