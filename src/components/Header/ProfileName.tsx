import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {profileDummy as data} from '../../assets/dummies/dummyData';

const ProfileName = () => {
  return (
    <View style={ProfileNameStyle.container}>
      <View style={ProfileNameStyle.rowSeparator}>
        <View style={ProfileNameStyle.textContainer}>
          <Text style={ProfileNameStyle.title}>{data.name}</Text>
        </View>

        <Image
          style={ProfileNameStyle.logoSize}
          source={require('../../assets/icons/verif-icon.png')}
        />

        <View style={ProfileNameStyle.menuContainer}>
          <TouchableOpacity>
            <Image
              style={ProfileNameStyle.menuSize}
              source={require('../../assets/icons/menu-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={ProfileNameStyle.subTitle}>{data.occupation}</Text>
      <View style={ProfileNameStyle.rowSeparator}>
        <View style={ProfileNameStyle.section}>
          <Image
            style={ProfileNameStyle.subLogo}
            source={require('../../assets/icons/location.png')}
          />
          <Text style={ProfileNameStyle.description}>{data.location}</Text>
        </View>
        <View style={ProfileNameStyle.section}>
          <Image
            style={ProfileNameStyle.subLogo}
            source={require('../../assets/icons/email.png')}
          />
          <Text style={ProfileNameStyle.description}>{data.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileName;

const ProfileNameStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 19,
  },
  textContainer: {
    width: 'auto',
    top: -2,
    paddingBottom: 0,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#031727',
  },
  subTitle: {
    top: -10,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#969696',
  },
  description: {
    top: -8,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    color: '#969696',
    fontSize: 11,
  },
  rowSeparator: {
    flexDirection: 'row',
  },
  logoSize: {
    top: 6,
    left: 8,
    width: 16,
    height: 16,
  },
  menuContainer: {
    flex: 1,
    top: -5,
    alignItems: 'flex-end',
  },
  menuSize: {
    width: 20,
    height: 30,
  },
  subLogo: {
    top: -5,
    marginRight: 9,
    height: 12,
    width: 12,
  },
  section: {
    flexDirection: 'row',
    paddingRight: 24,
  },
});
