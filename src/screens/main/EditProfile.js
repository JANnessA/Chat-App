import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
