import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getContacts, respondContact} from '../../helpers/network';

export default function FriendRequest({navigation}) {
  const [friendRequest, setFriendRequest] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleRespond = async (contactId, respond) => {
    const res = await respondContact({contactId, respond});
    if (res.success) {
      Alert.alert('Thành công');
      setFriendRequest(friendRequest.filter(e => e._id !== contactId));
    }
  };

  const getData = async () => {
    const {data, success} = await getContacts({
      pageSize: 1000,
      pageIndex: 1,
      status: 0,
    });
    if (success) {
      setFriendRequest(data.contacts);
    }
  };

  function renderItem(item) {
    return (
      <View style={styles.contaiItem}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('StackProfile')}>
          <Image
            source={
              item.item.avatar
                ? {uri: item.item.avatar}
                : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
            }
            style={styles.img}
          />
          <Text style={styles.name}>{item.item.name}</Text>
        </TouchableOpacity>
        <View style={styles.introduce}>
          <Text style={styles.txIntro}>{item.item.phone}</Text>
        </View>
        <View style={styles.inline}>
          <TouchableOpacity
            style={styles.buttonAc}
            onPress={() => handleRespond(item.item._id, 1)}>
            <Text style={styles.txtAc}>Đồng ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDe}
            onPress={() => handleRespond(item.item._id, 0)}>
            <Text style={styles.txtAc}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name={'chevron-back-outline'} size={30} color={'#143375'} />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginHorizontal: 10}}>
        <Text style={styles.title}>LỜI MỜI KẾT BẠN </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        {!friendRequest.length && <Text>Bạn không có lời mời kết bạn nào</Text>}
      </View>
      <FlatList
        data={friendRequest}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        style={{marginTop: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 12},
  title: {fontSize: 30, fontWeight: 'bold', color: '#143375'},
  contaiItem: {
    width: '80%',
    height: 220,
    backgroundColor: '#e4eff5',
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 16,
  },
  img: {width: 80, height: 80, borderRadius: 40},
  name: {fontSize: 30, marginLeft: 10},
  introduce: {
    width: '100%',
    height: 50,
    backgroundColor: '#c7e1ed',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  txIntro: {fontSize: 17, color: '#16394a'},
  inline: {flexDirection: 'row'},
  buttonAc: {
    width: 100,
    height: 50,
    backgroundColor: '#1e701e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 15,
  },
  txtAc: {color: '#fff', fontSize: 17},
  buttonDe: {
    width: 100,
    height: 50,
    backgroundColor: '#c73a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 15,
  },
  contaiSearch: {
    flexDirection: 'row',
    width: 290,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#143375',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 220,
    fontSize: 17,
  },
  contaiIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
