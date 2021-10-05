import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Context from '../../helpers/context';
import {
  getMessages,
  sendMessages,
  createConversation,
} from '../../helpers/network';
import {SocketEvent} from '../../configs';

export default function ChatDetail({route, navigation}) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalCall, setVisibleModalCall] = useState(false);
  const {item} = route.params;
  const [messages, setMessages] = useState([]);
  const {socket, user} = useContext(Context);
  const [conversationId, setConversationId] = useState(null);

  const convertMessage = msg => {
    return {
      _id: msg._id,
      text: msg.message,
      createdAt: msg.createdAt,
      user: {
        _id: msg.sender._id,
        name: msg.sender.fullname,
        avatar: msg.sender.avatar,
      },
    };
  };

  const getData = async () => {
    const {data, success} = await getMessages({
      pageSize: 1000,
      pageIndex: 1,
      conversationId: conversationId,
    });
    if (success) {
      setMessages(data.map(e => convertMessage(e)));
    }
  };

  useEffect(() => {
    if (item.fromContact) {
      if (item.item.conversationId) {
        setConversationId(item.item.conversationId);
      }
    } else {
      setConversationId(item.item._id);
    }
    if (conversationId) {
      getData();
    }
    socket.on(SocketEvent.SEND_MESSAGE, data => {
      if (data.message.conversationId === conversationId) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [convertMessage(data.message)]),
        );
      }
    });
    return () => {
      socket.off(SocketEvent.SEND_MESSAGE);
    };
  }, [conversationId]);

  const onSend = useCallback(
    async (msg = []) => {
      let res;
      if (!conversationId) {
        res = await createConversation({members: [item.item.userId]});
        if (res.success) {
          setConversationId(res.data._id);
        }
      }
      await sendMessages({
        message: msg[0].text,
        type: 1,
        conversationId: conversationId || res.data._id,
      });
    },
    [conversationId],
  );

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'green',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

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
          <Text style={styles.name} numberOfLines={1}>
            {item.item.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.flex}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => {
              setVisibleModalCall(true);
            }}>
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
      <GiftedChat
        messages={messages}
        onSend={msg => onSend(msg)}
        scrollToBottom
        alwaysShowSend
        renderBubble={renderBubble}
        user={{
          _id: user._id,
        }}
      />
      {
        //modal 1: modal setting
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
      {
        //modal 2: modal call
      }
      <Modal animationType="none" transparent={true} visible={visibleModalCall}>
        <View style={styles.centeredViewC}>
          <View style={styles.modalViewC}>
            <Text style={[styles.name, {color: '#000'}]} numberOfLines={1}>
              {item}
            </Text>
            {
              //đoạn này kiểm tra id là mình hay là người khác, nếu là người khác thì dùng đoạn này còn là mình thì dùng đoạn sau
              1 === 1 ? (
                <View style={styles.modalViewCC}>
                  <TouchableOpacity
                    style={styles.buttonCall}
                    onPress={() => navigation.navigate('Call')}>
                    <Image
                      source={require('../../assets/img/call.png')}
                      style={styles.call}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonCall}
                    onPress={() => setVisibleModalCall(false)}>
                    <Image
                      source={require('../../assets/img/decline.png')}
                      style={styles.call}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <TouchableOpacity style={styles.buttonCall}>
                    <Image
                      source={require('../../assets/img/decline.png')}
                      style={styles.call}
                    />
                  </TouchableOpacity>
                </>
              )
            }
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
  contaiName: {
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
    width: 200,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
    color: '#fff',
    flexShrink: 1,
    width: '100%',
  },
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
  centeredViewC: {padding: 5, position: 'absolute', right: 5, top: 60},
  modalViewC: {
    width: 200,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#ddd',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  buttonCall: {width: 30, height: 30, marginHorizontal: 5},
  call: {width: 30, height: 30},
  modalViewCC: {
    flexDirection: 'row',
  },
});
