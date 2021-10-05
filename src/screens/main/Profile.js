import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {getAuth} from '../../helpers/network';
import AsyncStorage from '@react-native-community/async-storage';
import Context from '../../helpers/context';

export default function Profile({navigation}) {
  const {user, socket} = useContext(Context);
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   setUserData();
  // }, []);

  // const setUserData = async () => {
  //   const res = await getAuth();
  //   if (res.success) {
  //     setData(res.data);
  //   }
  // };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      socket.disconnect();
      navigation.navigate('Login');
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
        style={styles.avata}
      />
      <View style={styles.infor}>
        <Text style={styles.txtInfor}>{user.fullname}</Text>
      </View>
      {user.email && (
        <View style={styles.infor}>
          <Text style={styles.txtInfor}>{user.email}</Text>
        </View>
      )}
      <View style={styles.infor}>
        <Text style={styles.txtInfor}>{user.phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.infor, {backgroundColor: '#143375'}]}
        onPress={handleLogout}>
        <Text style={[styles.txtInfor, {color: '#fff'}]}>Đăng xuất</Text>
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
