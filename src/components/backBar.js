import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BackBar({navigation}, props) {
  const {screenTo} = props;
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate(screenTo)}>
        <Ionicons name={'chevron-back-outline'} size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
