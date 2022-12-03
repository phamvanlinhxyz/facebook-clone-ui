import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SingleResult } from '../../components';
import { color } from '../../core/common/styleVariables';
import { setSelectedPost } from '../../store/reducers/posts.reducer';
import { searchSelector } from '../../store/reducers/search.reducer';
import noResultImg from '../../../assets/images/no-result.svg';
import searchResource from '../../resources/searchResource';

const SearchResultsScreen = ({ navigation }) => {
  const { currentSearch, searchResults } = useSelector(searchSelector);
  const dispatch = useDispatch();

  const backToSearchScreen = () => {
    navigation.goBack();
  };

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <IconButton
          icon='arrow-left'
          style={{ margin: 0 }}
          iconColor={color.textPrim}
          onPress={backToSearchScreen}
        />
        <Button
          style={{
            flex: 1,
            backgroundColor: color.iconButtonBg,
            marginLeft: 12,
          }}
          icon='magnify'
          labelStyle={{ color: color.textPrim, fontSize: 16 }}
          contentStyle={{ justifyContent: 'flex-start' }}
          onPress={backToSearchScreen}
        >
          {currentSearch}
        </Button>
      </View>
      {searchResults.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          {searchResults.map((result, i) => {
            return (
              <SingleResult
                post={result}
                key={i}
                onPress={() => {
                  dispatch(setSelectedPost(result));
                  navigation.navigate('SinglePostScreen');
                }}
              />
            );
          })}
          <Divider
            style={{ height: 4, backgroundColor: color.postSeparator }}
          />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={noResultImg} style={{ height: 160, width: 160 }} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginTop: 8,
              color: color.textSecond,
            }}
          >
            {searchResource.noResult}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchResultsScreen;
