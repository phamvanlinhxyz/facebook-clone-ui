import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { convertTimeToAgo } from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import { friendResource } from '../../resources';
import { setUserSelected } from '../../store/reducers/friend.reducer';

const SingleRequest = ({ req, reply, dispatch, navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginTop: 16, flexDirection: 'row' }}
      activeOpacity={1}
      onPress={() => {
        dispatch(setUserSelected(req.sender._id));
        navigation.navigate('PersonalPageScreen');
      }}
    >
      <Image
        source={{ uri: req.sender.avatar.fileLink }}
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
            {req.sender.username}
          </Text>
          <Text style={{ color: color.textSecond }}>
            {convertTimeToAgo(req.createdAt)}
          </Text>
        </View>
        {req.mutualFriends > 0 && (
          <Text style={{ fontSize: 16, color: color.textSecond, marginTop: 2 }}>
            {req.mutualFriends + friendResource.mutualFriends}
          </Text>
        )}
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Button
            style={{
              ...styles.postButton,
              backgroundColor: color.button.primBg,
              marginRight: 4,
            }}
            textColor={color.text.white}
            labelStyle={{ fontSize: 16 }}
            onPress={() => reply(req.sender._id, true)}
          >
            {friendResource.confirm}
          </Button>
          <Button
            style={{
              ...styles.postButton,
              backgroundColor: color.button.defaultBg,
              marginLeft: 4,
            }}
            textColor={color.text.prim}
            labelStyle={{ fontSize: 16 }}
            onPress={() => reply(req.sender._id, false)}
          >
            {friendResource.delete}
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postButton: {
    width: '100%',
    borderRadius: 6,
    flex: 1,
  },
});

export default SingleRequest;
