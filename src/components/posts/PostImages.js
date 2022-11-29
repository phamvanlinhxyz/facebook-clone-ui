import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

const PostImages = ({ images, width, imageClick, post }) => {
  const quantity = images.length;

  return (
    <View style={{ marginHorizontal: 12 }}>
      {/* 1 ảnh */}
      {quantity === 1 && (
        <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
          <Image
            source={{ uri: images[0].fileLink }}
            style={{ height: width, width: width, borderRadius: 6 }}
          />
        </TouchableOpacity>
      )}
      {/* 2 ảnh */}
      {quantity === 2 && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[0].fileLink }}
              style={{
                height: width,
                width: width / 2 - 3,
                borderRadius: 6,
                marginRight: 3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[1].fileLink }}
              style={{
                height: width,
                width: width / 2 - 3,
                borderRadius: 6,
                marginLeft: 3,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* 3 ảnh */}
      {quantity === 3 && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[0].fileLink }}
              style={{
                height: width,
                width: width / 2 - 3,
                borderRadius: 6,
                marginRight: 3,
              }}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => imageClick(post)}
            >
              <Image
                source={{ uri: images[1].fileLink }}
                style={{
                  height: width / 2 - 3,
                  width: width / 2 - 3,
                  borderRadius: 6,
                  marginLeft: 3,
                  marginBottom: 3,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => imageClick(post)}
            >
              <Image
                source={{ uri: images[2].fileLink }}
                style={{
                  height: width / 2 - 3,
                  width: width / 2 - 3,
                  borderRadius: 6,
                  marginLeft: 3,
                  marginTop: 3,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* 4 ảnh */}
      {quantity === 4 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[0].fileLink }}
              style={{
                height: width / 2 - 3,
                width: width / 2 - 3,
                borderRadius: 6,
                marginRight: 3,
                marginBottom: 3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[1].fileLink }}
              style={{
                height: width / 2 - 3,
                width: width / 2 - 3,
                borderRadius: 6,
                marginLeft: 3,
                marginBottom: 3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[2].fileLink }}
              style={{
                height: width / 2 - 3,
                width: width / 2 - 3,
                borderRadius: 6,
                marginRight: 3,
                marginTop: 3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => imageClick(post)}>
            <Image
              source={{ uri: images[3].fileLink }}
              style={{
                height: width / 2 - 3,
                width: width / 2 - 3,
                borderRadius: 6,
                marginLeft: 3,
                marginTop: 3,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PostImages;
