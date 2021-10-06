import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header/Header';
import Carousel from '../components/Carousel/Carousel';
import InfineList from '../components/InfiniteList/InfiniteList';

const Home = () => {
  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.headerContainer}>
        <Header />
      </View>
      <View style={HomeStyle.carouselContainer}>
        <Carousel />
      </View>
      <View style={HomeStyle.listContainer}>
        <InfineList />
      </View>
    </View>
  );
};

export default Home;

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    height: 120,
  },
  carouselContainer: {
    height: 146,
    backgroundColor: '#f6f6f6',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
