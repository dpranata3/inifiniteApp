import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AlbumType} from '../Utils/types';
import {dataURL} from '../../assets/dummies/dummyData';

const Carousel = () => {
  const [albumList, setAlbumList] = useState<Array<AlbumType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHighlight, setIsHighlight] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async () => {
    fetch(`${dataURL}?_limit=5&_page=${currentPage}`)
      .then(res => res.json())
      .then(resJson => {
        setAlbumList(albumList.concat(resJson));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
    setIsLoading(true);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={ItemStyle(isHighlight).itemRow} key={index}>
        <TouchableOpacity onPress={() => setIsHighlight(!isHighlight)}>
          <Image
            source={{uri: item.thumbnailUrl}}
            style={ItemStyle(isHighlight).itemImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={CarouselStyle.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <FlatList
      horizontal
      style={CarouselStyle.container}
      data={albumList}
      renderItem={({item, index}) => renderItem({item, index})}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Carousel;

const CarouselStyle = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Poppins-Semibold',
  },
  loader: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ItemStyle = (isHighlight?: boolean) =>
  StyleSheet.create({
    itemRow: {
      marginRight: 5,
      paddingVertical: isHighlight ? 20 : 0,
      justifyContent: 'center',
    },
    itemImage: {
      height: isHighlight ? 140 : 100,
      borderWidth: 1,
      borderRadius: 10,
      width: 180,
    },
  });
