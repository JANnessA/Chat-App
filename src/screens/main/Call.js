import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Call() {
  return (
    <View style={styles.container}>
      <Text>Call</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
