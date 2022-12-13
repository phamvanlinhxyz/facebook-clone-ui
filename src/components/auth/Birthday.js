import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import { authResource } from '../../resources';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Birthday = (props) => {
  const { styles, next, prev, user } = props;

  /**
   * Use state
   */
  const [birthday, setBirthday] = useState(user.birthday);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Sự kiện thay đổi ngày
   * @param {*} event
   * @param {*} selectedDate
   */
  const onChange = (event, selectedDate) => {
    setShow(false);
    setBirthday(selectedDate);

    if (new Date(selectedDate) >= new Date()) {
      setError(true);
    } else {
      setError(false);
    }
  };

  /**
   * Sự kiện show form chọn ngày tháng năm
   */
  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <>
      <Text variant='titleLarge' style={styles.textHeader}>
        {authResource.birthdayTitle}
      </Text>
      <Button
        style={styles.birthdayButton}
        labelStyle={styles.birthdayLabel}
        mode='outlined'
        onPress={showDatePicker}
      >
        {moment(birthday).format(authResource.birthdayFormat)}
      </Button>
      {error && (
        <Text style={styles.errorText}>{authResource.birthdayError}</Text>
      )}
      {new Date(birthday) < new Date() && (
        <Button
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          textColor={color.text.white}
          onPress={() => next({ birthday })}
        >
          {authResource.continue}
        </Button>
      )}
      <Button
        style={styles.returnButton}
        labelStyle={styles.buttonLabel}
        textColor={color.text.second}
        onPress={() => prev({ birthday })}
      >
        {authResource.return}
      </Button>
      {show && (
        <DateTimePicker value={birthday} mode='date' onChange={onChange} />
      )}
    </>
  );
};

export default Birthday;
