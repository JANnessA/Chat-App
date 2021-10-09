import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FakeData from '../../fakedata';

export default function FindFriendFromContact({navigation}) {
  const [valueSearch, setValueSearch] = useState('');
  const [chooseContact, setChooseContact] = useState(false);
  const [mess, setMess] = useState('Chào bạn, mình làm quen được không?');

  //cần xử lý thêm làm sao ấn thêm ban của một người thì hiển thị form nhập lời giới thiệu của người đó thôi

  function renderItem(item) {
    return (
      <View style={styles.contaiItem}>
        <View style={styles.buttonItem}>
          <View style={styles.leftPart}>
            <Image
              source={
                item.item.avatar ||
                require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
              }
              style={styles.img}
            />
          </View>
          <View style={styles.rightPart}>
            <Text style={styles.name}>{item.item.username}</Text>
            <Text style={styles.txtItem} numberOfLines={1}>
              {item.item.phone}
            </Text>
          </View>
        </View>
        <View style={styles.inline}>
          <TouchableOpacity
            style={styles.buttonAddFriend}
            onPress={() => {
              setChooseContact(true);
            }}>
            <Text style={styles.txtButton}>Thêm bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonViewProfile}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.txtButton}>Xem trang cá nhân</Text>
          </TouchableOpacity>
        </View>
        {chooseContact && item.id && (
          <View style={styles.contaiInput}>
            <TextInput
              value={mess}
              style={styles.inputMes}
              onChangeText={t => setMess(t)}
              placeholderTextColor="#aaa"
              placeholder="Nhập tin nhắn giới thiệu"
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                navigation.navigate('Contact');
              }}>
              <Text style={styles.txtSendButton}>Gửi</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.returnIcon}
        onPress={() => {
          navigation.navigate('Contact');
        }}>
        <Ionicons
          name={'chevron-back-outline'}
          size={40}
          color={'#143375'}
          style={styles.imgClose}
        />
      </TouchableOpacity>
      <View style={styles.midContai}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
              value={valueSearch}
              style={styles.input}
              onChangeText={t => setValueSearch(t)}
              placeholderTextColor="#aaa"
              placeholder="Search"
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.contaiIcon}
              onPress={() => {
                setValueSearch('');
              }}>
              <Ionicons
                name={'close-circle-outline'}
                size={25}
                color={'#143375'}
                style={styles.imgClose}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={FakeData}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          style={{marginTop: 10}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingVertical: 70,
    backgroundColor: '#c3cdd4',
  },
  returnIcon: {position: 'absolute', left: 5, top: 5},
  midContai: {backgroundColor: '#fff', flex: 1, padding: 12},
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
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    padding: 10,
  },
  buttonItem: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingHorizontal: 5,
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
  inline: {flexDirection: 'row', marginVertical: 5},
  buttonAddFriend: {
    width: 100,
    height: 40,
    backgroundColor: 'green',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonViewProfile: {
    width: 150,
    height: 40,
    backgroundColor: '#143375',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  txtButton: {color: 'white', fontSize: 13},
  contaiInput: {
    marginVertical: 5,
    alignItems: 'center',
  },
  inputMes: {
    width: '100%',
    height: 60,
    borderWidth: 0.5,
    backgroundColor: '#fff',
  },
  sendButton: {marginVertical: 5},
  txtSendButton: {color: '#143375', fontSize: 15},
});
