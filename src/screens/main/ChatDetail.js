import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat} from 'react-native-gifted-chat';

export default function ChatDetail({route, navigation}) {
  const [visibleModal, setVisibleModal] = useState(false);
  const {item} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contaiName}
          onPress={() => navigation.navigate('FriendProfile')}>
          <Image
            source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
            style={styles.img}
          />
          <Text style={styles.name}>{item.item.username}</Text>
        </TouchableOpacity>
        <View style={styles.flex}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.navigate('Call')}>
            <Ionicons name={'call-outline'} size={30} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBack}>
            <Ionicons name={'videocam-outline'} size={30} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => setVisibleModal(true)}>
            <Ionicons name={'settings-outline'} size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
      {
        //bỏ chú thích
        //   <GiftedChat
        //   messages={messages}
        //   onSend={messages => onSend(messages)}
        //   scrollToBottom
        //   alwaysShowSend
        //   user={{
        //     _id: 1,
        //   }}
        // />
      }
      <Modal animationType="fade" transparent={true} visible={visibleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
              style={styles.imgSetting}
            />
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setVisibleModal(false)}>
              <Ionicons name={'close-outline'} size={35} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate({name: 'Profile', params: {item: item}})
              }>
              <Text style={styles.txtButton}>Xem trang cá nhân</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#326cd1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBack: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contaiName: {flexDirection: 'row', marginLeft: 5, alignItems: 'center'},
  name: {fontSize: 18, marginLeft: 10, color: '#fff'},
  flex: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
  },
  buttonClose: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
  imgSetting: {width: 200, height: 200, borderRadius: 100},
  modalView: {alignItems: 'center', paddingTop: 50},
  button: {
    width: 280,
    height: 45,
    backgroundColor: '#143375',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  txtButton: {fontSize: 15, color: '#fff'},
});
