import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfilePicture from './ProfilePicture';
import ProfileName from './ProfileName';
const Header = () => {
  return (
    <View style={HeaderStyle.container}>
      <View style={HeaderStyle.section1}>
        <ProfilePicture />
        <ProfileName />
      </View>
    </View>
  );
};

export default Header;

const HeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section1: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
});
