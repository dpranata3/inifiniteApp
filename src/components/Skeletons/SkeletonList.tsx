import React, {useEffect} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const SkeletonList = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={Styles.container}>
      <View style={Styles.item}>
        <AnimatedGradient
          colors={['#a5a5a5', '#b5b5b5', '#a5a5a5', '#b5b5b5']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            // @ts-ignore
            ...StyleSheet.absoluteFill,
            transform: [{translateX: translateX}],
          }}
        />
        <View style={Styles.imageSize}>
          <AnimatedGradient
            colors={['#a0a0a0', '#b0b0b0', '#a0a0a0', '#b0b0b0']}
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0}}
            style={{
              // @ts-ignore
              ...StyleSheet.absoluteFill,
              transform: [{translateX: translateX}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SkeletonList;

const Styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 140,
    width: width,
    flexDirection: 'column',
    backgroundColor: '#b5b5b5',
    borderRadius: 5,
    marginVertical: 5,
    borderColor: '#b0b0b0',
  },
  imageSize: {
    height: 100,
    width: width,
    backgroundColor: '#a0a0a0',
    borderColor: '#b0b0b0',
    borderWidth: 1,
  },
});
