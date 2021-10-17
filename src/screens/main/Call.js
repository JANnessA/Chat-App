import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
const numColumn = 2;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import {SocketEvent} from '../../configs';
import Context from '../../helpers/context';

import {declineCall} from '../../helpers/network';

export default function Call({navigation, route}) {
  const {caller, conversationId, vidMute} = route.params;
  const {socket} = useContext(Context);

  useEffect(() => {
    socket.on(SocketEvent.DECLINE_CALL, data => {
      navigation.navigate('Chat');
      socket.off(SocketEvent.DECLINE_CALL);
    });
    return () => {
      socket.off(SocketEvent.DECLINE_CALL);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View>
        <View style={styles.containerItem}>
          <Image
            source={
              caller.avatar
                ? {uri: caller.avatar}
                : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
            }
            style={styles.img}
          />
          <Text>
            {caller.fullname} đang gọi {vidMute ? 'thoại' : 'video'} cho bạn
          </Text>
        </View>
        <View
          style={{alignItems: 'center', flexDirection: 'row', marginTop: 50}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.pop();
              navigation.navigate({
                name: 'VideoCall',
                params: {conversationId: conversationId, vidMute},
              });
            }}>
            <Image
              source={require('../../assets/img/call.png')}
              style={styles.call}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await declineCall({conversationId});
              navigation.navigate('Chat');
            }}>
            <Image
              source={require('../../assets/img/decline.png')}
              style={styles.call}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  img: {width: 180, height: 180, borderRadius: 90, marginTop: 150},
  inline: {flexDirection: 'row', marginTop: 50},
  button: {
    marginHorizontal: 30,
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  call: {width: 50, height: 50},
  containerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (HEIGHT - 70) / numColumn,
    width: WIDTH / numColumn,
    margin: 1,
  },
});
