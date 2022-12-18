import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import searchResource from '../../resources/searchResource';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSearhHistory,
  removeSearchHistory,
  searchSelector,
  setCurrentSearch,
  setSearchResults,
} from '../../store/reducers/search.reducer';
import { SimpleLineIcons } from '@expo/vector-icons';
import searchService from '../../services/search.service';

const SearchScreen = ({ navigation }) => {
  // Danh sách lịch sử tìm kiếm
  const { searchHistory } = useSelector(searchSelector);

  // Text tìm kiếm
  const [text, setText] = useState('');

  // Dispatch
  const dispatch = useDispatch();

  /**
   * Tìm kiếm theo input
   */
  const handleSearchPost = async () => {
    if (text) {
      dispatch(addSearhHistory(text));
      setText('');
      const res = await searchService.search(text);
      if (res.success) {
        dispatch(setSearchResults(res.data.data));
      }
      navigation.navigate('SearchResultsScreen');
    }
  };

  /**
   * Tìm kiếm theo lịch sử
   * @param {*} key key tìm kiếm
   */
  const handleHistoryClick = async (key) => {
    if (key) {
      dispatch(setCurrentSearch(key));
      const res = await searchService.search(key);
      if (res.success) {
        dispatch(setSearchResults(res.data.data));
      }
      navigation.navigate('SearchResultsScreen');
    }
  };

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <View
        style={{
          height: 64,
          borderBottomWidth: 1,
          borderColor: color.other.separator,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: color.button.defaultBg,
            flex: 1,
            borderRadius: 100,
          }}
        >
          <IconButton
            icon='magnify'
            style={{
              backgroundColor: color.transparent,
              margin: 0,
              position: 'absolute',
            }}
            iconColor={color.text.prim}
          />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={searchResource.searchPlaceholder}
            underlineColorAndroid={color.transparent}
            activeUnderlineColor={color.transparent}
            underlineColor={color.transparent}
            style={{
              backgroundColor: color.transparent,
              height: 40,
              flex: 1,
              marginLeft: 20,
            }}
            onSubmitEditing={() => handleSearchPost()}
            right={
              text ? (
                <TextInput.Icon
                  icon='close-circle'
                  onPress={() => setText('')}
                />
              ) : null
            }
          />
        </View>
        <Text
          style={{ fontSize: 20, color: color.text.second, marginLeft: 8 }}
          onPress={() => navigation.goBack()}
        >
          {searchResource.cancel}
        </Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
          {searchResource.recent}
        </Text>
        {searchHistory.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
              }}
              activeOpacity={1}
              onPress={() => handleHistoryClick(item)}
            >
              <SimpleLineIcons name='clock' size={24} color={color.text.gray} />
              <Text style={{ fontSize: 16, marginLeft: 12, flex: 1 }}>
                {item}
              </Text>
              <IconButton
                icon='close'
                style={{ margin: 0 }}
                size={24}
                iconColor={color.text.gray}
                onPress={() => dispatch(removeSearchHistory(i))}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
