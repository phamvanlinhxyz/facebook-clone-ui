import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { enumGender } from '../../core/common/enum';
import { color } from '../../core/common/styleVariables';
import { authResource } from '../../resources';

const Gender = (props) => {
  const { styles, next, prev, user } = props;

  /**
   * use state
   */
  const [gender, setGender] = useState(user.gender);

  return (
    <>
      <Text variant='titleLarge' style={styles.textHeader}>
        {authResource.birthdayTitle}
      </Text>
      <View style={styles.genderRadioGroup}>
        <RadioButton.Group
          onValueChange={(newVal) => setGender(newVal)}
          value={gender}
        >
          <RadioButton.Item
            value={enumGender.male}
            color={color.button.primBg}
            label={authResource.male}
            style={styles.genderRadioItem}
          />
          <RadioButton.Item
            value={enumGender.female}
            color={color.button.primBg}
            label={authResource.female}
            style={styles.genderRadioItem}
          />
          <RadioButton.Item
            value={enumGender.other}
            color={color.button.primBg}
            label={authResource.other}
            style={styles.genderRadioItem}
          />
        </RadioButton.Group>
      </View>
      {gender != null && (
        <Button
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          textColor={color.text.white}
          onPress={() => next({ gender })}
        >
          {authResource.continue}
        </Button>
      )}
      <Button
        style={styles.returnButton}
        labelStyle={styles.buttonLabel}
        textColor={color.text.second}
        onPress={() => prev({ gender })}
      >
        {authResource.return}
      </Button>
    </>
  );
};

export default Gender;
