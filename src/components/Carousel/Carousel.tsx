import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AlbumType} from '../Utils/types';
import fetchData from '../Utils/fetchData';

const Carousel = () => {
  const [albumList, setAlbumList] = useState<Array<AlbumType>>([]);
  const [isHighlight, setIsHighlight] = useState<boolean>(false);

  const fetchCarousel = async () => {
    try {
      const result = await fetchData();
      setAlbumList(result);
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    fetchCarousel();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      horizontal
      style={CarouselStyle.container}
      data={albumList}
      renderItem={({item, index}) => renderItem({item, index})}
      keyExtractor={(item, index) => index.toString()}
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
