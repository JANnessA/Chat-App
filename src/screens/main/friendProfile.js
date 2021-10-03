import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import fakedata from '../../fakedata';

export default function FriendProfile({navigation}) {
  const data = fakedata[1];
  console.log(data);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
        style={styles.avata}
      />
      <View style={styles.infor}>
        <Text style={styles.txtInfor}>{data.username}</Text>
      </View>
      <View style={styles.infor}>
        <Text style={styles.txtInfor}>{data.email}</Text>
      </View>
      <View style={styles.infor}>
        <Text style={styles.txtInfor}>{data.phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.infor, {backgroundColor: '#143375'}]}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={[styles.txtInfor, {color: '#fff'}]}>
          Chỉnh sửa thông tin
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  avata: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infor: {
    width: 280,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  txtInfor: {
    color: '#143375',
    fontSize: 20,
  },
});
