import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import FakeData from '../../fakedata';

export default function Contact({navigation}) {
  const [valueTextInput, setValueTextInput] = useState('');
  const [modalCreateGroup, setModalCreateGroup] = useState(false);
  const [addMember, setAddMember] = useState([]);

  //render item in list
  function renderItem({item}) {
    return (
      <View style={styles.contaiItem}>
        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() =>
            navigation.navigate({
              name: 'ChatDetail',
              params: {item: item},
            })
          }>
          <View style={styles.leftPart}>
            <Image
              source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
              style={styles.img}
            />
          </View>
          <View style={styles.rightPart}>
            <Text style={styles.name}>{item.item.username}</Text>
            <Text style={styles.txtItem} numberOfLines={1}>
              {item.item.phone}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contaiSearch}>
        <TouchableOpacity style={styles.contaiIcon}>
          <Ionicons
            name={'search-outline'}
            size={25}
            color={'#143375'}
            style={styles.searchImg}
          />
        </TouchableOpacity>
        <TextInput
          value={valueTextInput}
          style={styles.input}
          onChangeText={t => setValueTextInput(t)}
          placeholderTextColor="#aaa"
          placeholder="Search"
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.contaiIcon}
          onPress={() => {
            setValueTextInput('');
          }}>
          <Ionicons
            name={'close-circle-outline'}
            size={25}
            color={'#143375'}
            style={styles.imgClose}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.contaiFriendRequest}
        onPress={() => navigation.navigate('FriendRequest')}>
        <Text style={styles.titleSendRequest}>Số lời mời kết bạn (0)</Text>
      </TouchableOpacity>
      <FlatList
        data={FakeData}
        renderItem={item => renderItem({item})}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        style={{marginTop: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  contaiSearch: {
    flexDirection: 'row',
    width: 290,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#143375',
    paddingHorizontal: 5,
  },
  input: {
    width: 220,
    fontSize: 17,
  },
  contaiIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contaiItem: {
    width: '100%',
    height: 60,
    marginVertical: 5,
    borderRadius: 20,
  },
  buttonItem: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    paddingHorizontal: 5,
    backgroundColor: '#ddd',
    paddingRight: 5,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  leftPart: {justifyContent: 'center', alignItems: 'center'},
  rightPart: {
    paddingLeft: 12,
    paddingVertical: 5,
    paddingRight: 5,
    width: '80%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtItem: {
    flexShrink: 1,
    width: '100%',
  },
  buttonClose: {
    position: 'absolute',
    right: 0,
    top: -2,
    backgroundColor: '#aaa',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  txtInput: {
    borderWidth: 1,
    width: 200,
    height: 50,
    padding: 10,
    borderRadius: 5,
    fontSize: 15,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#326cd1',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: '#fff',
  },
  contaiFriendRequest: {
    width: '95%',
    height: 50,
    backgroundColor: '#143375',
    borderWidth: 1,
    borderColor: '#143375',
    marginVertical: 10,
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  titleSendRequest: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d19741',
  },
});
