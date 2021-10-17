import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {getConversations} from '../../helpers/network';
import {useIsFocused} from '@react-navigation/native';
import Context from '../../helpers/context';
import {SocketEvent} from '../../configs';

export default function Chat({navigation}) {
  const [valueTextInput, setValueTextInput] = useState('');
  const [conversations, setConversations] = useState([]);
  const isFocused = useIsFocused();
  const {socket} = useContext(Context);

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    socket.on(SocketEvent.SEND_MESSAGE, data => {
      getData();
    });
    return () => {
      socket.off(SocketEvent.SEND_MESSAGE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const {data, success} = await getConversations({
      pageSize: 1000,
      pageIndex: 1,
    });
    if (success) {
      setConversations(data);
    }
  };

  //render item in list
  function renderItem(item) {
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
              source={
                item.item.avatar
                  ? {uri: item.item.avatar}
                  : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
              }
              style={styles.img}
            />
          </View>
          <View style={styles.rightPart}>
            <Text style={styles.name}>{item.item.name}</Text>
            <Text style={styles.txtItem} numberOfLines={1}>
              {item.item.lastMessage?.type === 2
                ? 'Ảnh'
                : item.item.lastMessage?.message}
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
            name={'search-outline'}
            size={25}
            color={'#143375'}
            style={styles.imgClose}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={conversations}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10}}
      />
      <ActionButton useNativeFeedback={true} buttonColor="#143375">
        <ActionButton.Item
          buttonColor="#143375"
          title="Create group chat"
          onPress={() => navigation.navigate('CreateGroup')}>
          <Ionicons
            name={'add-outline'}
            size={25}
            color={'#fff'}
            style={styles.searchImg}
          />
        </ActionButton.Item>
      </ActionButton>
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
});
