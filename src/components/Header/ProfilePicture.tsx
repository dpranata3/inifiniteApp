import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const ProfilePicture = () => {
  return (
    <View style={ImgStyle.container}>
      <Image
        style={ImgStyle.picSize}
        source={require('../../assets/icons/person.png')}
      />
    </View>
  );
};

export default ProfilePicture;

const ImgStyle = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#23b4fc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picSize: {
    height: 30,
    width: 30,
  },
});
