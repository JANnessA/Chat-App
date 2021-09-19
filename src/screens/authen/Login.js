import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          onChangeText={t => setEmail(t)}
          value={email}
          placeholderTextColor="#aaa"
          placeholder="Email"
          keyboardType="email-address"
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TopTab')}>
          <Text style={styles.txtButton}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 15}}>
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
});
