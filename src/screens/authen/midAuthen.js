import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAuth} from '../../helpers/network';
import AsyncStorage from '@react-native-community/async-storage';
import Context from '../../helpers/context';
import io from 'socket.io-client';
import {SOCKET_URL} from '../../configs';

export default function MidAuthen({navigation}) {
  const {setSocket, setUser} = useContext(Context);
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const data = await getAuth();
    if (data.success) {
      setUser(data.data);
      try {
        const token = await AsyncStorage.getItem('@token');
        setSocket(io(`${SOCKET_URL}/realtime?token=${token}`));
        navigation.navigate('TopTab');
      } catch (e) {}
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/img/496ecb14589707.562865d064f9e.png')}
      style={styles.container}>
      <View style={styles.contaiTitle}>
        <Ionicons name={'chatbubble-outline'} size={120} color={'#3e0d73'} />
        <Text style={styles.title}>App Chat</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.txtButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.txtButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  contaiTitle: {justifyContent: 'center', alignItems: 'center', flex: 1.5},
  title: {color: '#fff', fontSize: 45, fontFamily: 'Cochin'},
  body: {flex: 2, alignItems: 'center'},
  button: {
    width: 200,
    height: 40,
    borderColor: '#632f9c',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  txtButton: {color: '#fff', fontSize: 20},
});
