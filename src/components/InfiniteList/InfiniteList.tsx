import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {dataURL} from '../../assets/dummies/dummyData';
import {AlbumType} from '../Utils/types';

const InfiniteList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCurrentPage, setIsCurrentPage] = useState<number>(1);
  const [itemList, setItemList] = useState<Array<AlbumType>>([]);

  const fetchList = () => {
    fetch(`${dataURL}?_limit=5&_page${isCurrentPage}`)
      .then(res => res.json())
      .then(resJson => {
        setItemList(itemList.concat(resJson));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleMore = () => {
    setIsCurrentPage(isCurrentPage + 1);
    setIsLoading(true);
  };

  const renderItem = ({item, index}: {item: AlbumType; index: number}) => {
    return (
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
