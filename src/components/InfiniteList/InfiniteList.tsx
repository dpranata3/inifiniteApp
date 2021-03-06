/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {AlbumType} from '../Utils/types';
import fetchData from '../Utils/fetchData';
import SkeletonList from '../Skeletons/SkeletonList';

const InfiniteList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCurrentPage, setIsCurrentPage] = useState<number>(1);
  const [itemList, setItemList] = useState<Array<AlbumType>>([]);

  const fetchList = async () => {
    try {
      const result = await fetchData(isCurrentPage);
      setItemList(itemList.concat(result));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error as string);
    }
  };

  const handleMore = () => {
    setIsCurrentPage(isCurrentPage + 1);
    setIsLoading(true);
  };

  const renderItem = ({item, index}: {item: AlbumType; index: number}) => {
    return isLoading ? (
      <SkeletonList key={index} />
    ) : (
      <View style={ListStyle.item} key={index}>
        <Image source={{uri: item.url}} style={ListStyle.imageSize} />
        <View style={ListStyle.titleContainer}>
          <Text style={ListStyle.title}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={ListStyle.loader}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : null;
  };

  useEffect(() => {
    setIsLoading(true);
    fetchList();

    return () => {};
  }, [isCurrentPage]);

  return (
    <FlatList
      style={ListStyle.container}
      data={itemList}
      renderItem={({item, index}) => renderItem({item, index})}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default InfiniteList;

const ListStyle = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 140,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#f89f1e',
    borderRadius: 5,
    marginVertical: 5,
  },
  imageSize: {
    height: 100,
    width: 'auto',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Semibold',
  },
  loader: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
