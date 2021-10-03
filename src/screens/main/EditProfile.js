import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EditProfile({navigation}) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name={'chevron-back-outline'} size={40} color={'#143375'} />
      </TouchableOpacity>
      <Text style={styles.title}>EDIT PROFILE</Text>
      <Image
        source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
        style={styles.avata}
      />
      <TextInput
        style={styles.infor}
        value={username}
        onChangeText={setUsername}
        placeholder="username"
        keyboardType="default"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.infor}
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        keyboardType="default"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.infor}
        value={phone}
        onChangeText={setPhone}
        placeholder="phone"
        keyboardType="default"
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={[styles.infor, {backgroundColor: '#143375'}]}>
        <Text style={{color: '#fff'}}>Xác nhận</Text>
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
  buttonBack: {position: 'absolute', left: 2, top: 10},
  title: {fontSize: 30, color: '#143375'},
  infor: {
    width: 280,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
    padding: 12,
    color: '#000',
  },
});
