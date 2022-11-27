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
            color={color.bluePrim}
            label={authResource.male}
            style={styles.genderRadioItem}
          />
          <RadioButton.Item
            value={enumGender.female}
            color={color.bluePrim}
            label={authResource.female}
            style={styles.genderRadioItem}
          />
          <RadioButton.Item
            value={enumGender.other}
            color={color.bluePrim}
            label={authResource.other}
            style={styles.genderRadioItem}
          />
        </RadioButton.Group>
      </View>
      {gender != null && (
        <Button
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          textColor={color.whitePrim}
          onPress={() => next({ gender })}
        >
          {authResource.continue}
        </Button>
      )}
      <Button
        style={styles.returnButton}
        labelStyle={styles.buttonLabel}
        textColor={color.bluePrim}
        onPress={() => prev({ gender })}
      >
        {authResource.return}
      </Button>
    </>
  );
};

export default Gender;
