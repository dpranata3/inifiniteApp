import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header/Header';
import Carousel from '../components/Carousel/Carousel';

const Home = () => {
  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.headerContainer}>
        <Header />
      </View>
      <View style={HomeStyle.carouselContainer}>
        <Carousel />
      </View>
      <Text>Outer Container</Text>
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
});
