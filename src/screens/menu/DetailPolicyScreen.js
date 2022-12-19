import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import menuResource from '../../resources/menuResource';
import { menuSelector } from '../../store/reducers/menu.reducer';
import { MaterialIcons } from '@expo/vector-icons';
import { enumPolicyType } from '../../core/common/enum';

const DetailPolicyScreen = ({ navigation }) => {
  const { policyType } = useSelector(menuSelector);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 8,
          position: 'relative',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            flex: 1,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {policyType === enumPolicyType.term
            ? menuResource.termsTitle
            : policyType === enumPolicyType.privacy
            ? menuResource.privacyTitle
            : menuResource.standardsTitle}
        </Text>
        <MaterialIcons
          name='keyboard-arrow-left'
          size={32}
          color='black'
          style={{
            width: 40,
            height: 40,
            padding: 4,
            position: 'absolute',
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <Text style={{ padding: 16, fontSize: 16 }}>
          {policyType === enumPolicyType.term
            ? menuResource.termsContent
            : policyType === enumPolicyType.privacy
            ? menuResource.privacyContent
            : menuResource.standardsContent}
        </Text>
      </ScrollView>
    </View>
  );
};

export default DetailPolicyScreen;
