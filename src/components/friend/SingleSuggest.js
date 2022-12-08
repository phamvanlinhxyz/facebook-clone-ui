import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import { friendResource } from '../../resources';

const SingleSuggest = ({ suggest, action }) => {
  return (
    <TouchableOpacity
      style={{ marginTop: 16, flexDirection: 'row' }}
      activeOpacity={1}
    >
      <Image
        source={suggest.avatar.fileLink}
        style={{ width: 100, height: 100, borderRadius: 100 }}
      />
      <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {suggest.username}
          </Text>
        </View>
        {suggest.mutualFriends > 0 && (
          <Text style={{ fontSize: 16, color: color.textSecond, marginTop: 2 }}>
            {suggest.mutualFriends + friendResource.mutualFriends}
          </Text>
        )}
        <View style={{ marginTop: 8, width: '50%' }}>
          <Button
            style={styles.postButton}
            textColor={color.whitePrim}
            labelStyle={{ fontSize: 16 }}
            onPress={() => action.handleSendRequest(suggest._id)}
          >
            {friendResource.addFriend}
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postButton: {
    borderRadius: 6,
    flex: 1,
    backgroundColor: color.bluePrim,
    marginRight: 4,
  },
});

export default SingleSuggest;
