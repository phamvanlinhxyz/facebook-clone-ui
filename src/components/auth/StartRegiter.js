import React from 'react';
import { Button, Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import { authResource } from '../../resources';

const StartRegiter = (props) => {
  const { styles, start } = props;

  return (
    <>
      <Text variant='titleLarge' style={styles.textHeader}>
        {authResource.startTitle}
      </Text>
      <Text style={styles.textContent}>{authResource.startLabel}</Text>
      <Button
        style={styles.loginButton}
        labelStyle={styles.buttonLabel}
        textColor={color.whitePrim}
        onPress={start}
      >
        {authResource.start}
      </Button>
    </>
  );
};

export default StartRegiter;
