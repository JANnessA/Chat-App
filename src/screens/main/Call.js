import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function Call() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
        style={styles.img}
      />
      <View style={styles.inline}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../../assets/img/call.png')}
            style={styles.call}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../../assets/img/decline.png')}
            style={styles.call}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  img: {width: 200, height: 200, borderRadius: 100, marginTop: 150},
  inline: {flexDirection: 'row', marginTop: 50},
  button: {marginHorizontal: 30},
  call: {width: 50, height: 50},
});
