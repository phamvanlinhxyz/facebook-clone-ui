import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import { authResource } from '../../resources';

const YourName = (props) => {
  const { styles, next, prev, user } = props;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
  });

  return (
    <>
      <Text variant='titleLarge' style={styles.textHeader}>
        {authResource.yourName}
      </Text>
      <View style={styles.nameInput}>
        <TextInput
          style={styles.registerInput}
          onChangeText={(newVal) => {
            setFirstName(newVal);
            setError({ ...error, firstName: newVal ? false : true });
          }}
          value={firstName}
          mode='outlined'
          placeholder={authResource.firstName}
          outlineColor={color.inputOutline}
          activeOutlineColor={color.inputOutlineActive}
          placeholderTextColor={color.inputPlaceholder}
          right={
            firstName && (
              <TextInput.Icon
                icon='close-circle'
                onPress={() => {
                  setFirstName('');
                  setError({ ...error, firstName: true });
                }}
              />
            )
          }
          error={error.firstName}
        />
        <TextInput
          style={styles.registerInput}
          onChangeText={(newVal) => {
            setLastName(newVal);
            setError({ ...error, lastName: newVal ? false : true });
          }}
          value={lastName}
          mode='outlined'
          placeholder={authResource.lastName}
          outlineColor={color.inputOutline}
          activeOutlineColor={color.inputOutlineActive}
          placeholderTextColor={color.inputPlaceholder}
          right={
            lastName && (
              <TextInput.Icon
                icon='close-circle'
                onPress={() => {
                  setLastName('');
                  setError({ ...error, lastName: true });
                }}
              />
            )
          }
          error={error.lastName}
        />
      </View>
      {(error.firstName || error.lastName) && (
        <Text style={styles.errorText}>{authResource.nameError}</Text>
      )}
      <Text style={styles.textContent}>{authResource.yourNameLabel}</Text>
      {firstName && lastName && (
        <Button
          style={styles.loginButton}
          labelStyle={styles.buttonLabel}
          textColor={color.whitePrim}
          onPress={() => next({ firstName, lastName })}
        >
          {authResource.continue}
        </Button>
      )}
      <Button
        style={styles.returnButton}
        labelStyle={styles.buttonLabel}
        textColor={color.bluePrim}
        onPress={() => prev({ firstName, lastName })}
      >
        {authResource.return}
      </Button>
    </>
  );
};

export default YourName;
