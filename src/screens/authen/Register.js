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

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [rePass, setRePass] = useState('');
  const [phone, setPhone] = useState(0);

  return (
    <ImageBackground
      source={require('../../assets/img/ihfnlpbze7o01.jpg')}
      style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name={'chevron-back-outline'} size={30} color={'#fff'} />
      </TouchableOpacity>
      <View style={styles.contaiTitle}>
        <Text style={styles.title}>ĐĂNG KÍ</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={t => setUserName(t)}
          value={userName}
          placeholderTextColor="#aaa"
          placeholder="Username"
          keyboardType="default"
        />
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
          onChangeText={t => setPhone(t)}
          value={phone}
          placeholderTextColor="#aaa"
          placeholder="Phone number"
          keyboardType="phone-pad"
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
        <TextInput
          style={styles.input}
          onChangeText={t => setRePass(t)}
          value={rePass}
          placeholderTextColor="#aaa"
          placeholder="Rewrite Password"
          keyboardType="default"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.txtButton}>Đăng kí</Text>
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
  body: {flex: 3.7, alignItems: 'center'},
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
