import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {login, getAuth} from '../../helpers/network';
import io from 'socket.io-client';
import {SOCKET_URL} from '../../configs';
import Context from '../../helpers/context';

export default function Login({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {setSocket, setUser} = useContext(Context);

  const handleLoggin = async () => {
    if (!phone || !password) {
      Alert.alert('Các trường không được để trống!');
      return;
    }
    const res = await login({phone, password});
    if (!res.success) {
      Alert.alert(res.message);
      return;
    }
    try {
      setSocket(io(`${SOCKET_URL}/realtime?token=${res.data.token}`));
      await AsyncStorage.setItem('@token', res.data.token);
      const user = await getAuth();
      setUser(user.data);
      navigation.navigate('TopTab');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/ihfnlpbze7o01.jpg')}
      style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name={'chevron-back-outline'} size={30} color={'#fff'} />
      </TouchableOpacity>
      <View style={styles.contaiTitle}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={t => setPhone(t)}
          value={phone}
          placeholderTextColor="#aaa"
          placeholder="Phone"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={t => setPassword(t)}
          value={password}
          placeholderTextColor="#aaa"
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLoggin}>
          <Text style={styles.txtButton}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 18}}
          onPress={() => setModalVisible(true)}>
          <Text>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonFinger}>
          <Ionicons
            name={'finger-print-outline'}
            size={100}
            color={'#3e0d73'}
          />
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeIconB}
              onPress={() => setModalVisible(false)}>
              <Ionicons name={'close-outline'} size={30} color={'#000'} />
            </TouchableOpacity>
            <Text style={styles.forgetTitle}>QUÊN MẬT KHẨU?</Text>
            <Text style={styles.inforT}>
              Nhập lại số điện thoại của mình để lấy lại mật khẩu
            </Text>
            <TextInput
              style={styles.inputLine}
              onChangeText={setPhone}
              value={phone}
              placeholder="phone number"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.inputLineT}>
              <Text style={styles.txtButton}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  contaiTitle: {justifyContent: 'center', alignItems: 'center', flex: 1},
  title: {color: '#fff', fontSize: 35},
  body: {flex: 3.5, alignItems: 'center'},
  input: {
    width: 280,
    height: 50,
    backgroundColor: '#0b669e',
    color: '#bbb',
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
  },
  button: {
    width: 280,
    height: 50,
    backgroundColor: '#07507d',
    marginVertical: 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: '#fff',
    fontSize: 20,
  },
  buttonFinger: {
    marginTop: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    height: '45%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIconB: {
    backgroundColor: '#ddd',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  forgetTitle: {
    fontSize: 25,
  },
  inputLine: {
    width: 250,
    height: 50,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    color: '#aaa',
    padding: 12,
  },
  inforT: {
    fontSize: 15,
    color: '#aaa',
    marginVertical: 10,
  },
  inputLineT: {
    width: 250,
    height: 50,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    color: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: '#07507d',
  },
});
