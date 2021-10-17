import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getContacts, createConversation} from '../../helpers/network';
import {useIsFocused} from '@react-navigation/native';

export default function CreateGroup({navigation}) {
  const [valueTextInput, setValueTextInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [chatGroupName, setChatGroupName] = useState('');

  const [listChooses, setListChooses] = useState([]);
  const [contacts, setContacts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const {data, success} = await getContacts({
      pageSize: 1000,
      pageIndex: 1,
      status: 1,
    });
    if (success) {
      setContacts(data.contacts);
    }
  };

  let colorTxtCreate = chatGroupName.length > 0 ? '#143375' : '#ddd';

  const selectContact = item => {
    const check = listChooses.find(x => x.userId === item.userId);
    if (!check) {
      setListChooses([...listChooses, item]);
    } else {
      setListChooses(listChooses.filter(x => x.userId !== item.userId));
    }
  };

  const RenderListChoose = ({item, index}) => {
    return (
      <>
        <Text key={item.userId} style={styles.list}>
          {item.name}
        </Text>
        {index !== listChooses.length - 1 && <Text>{' - '}</Text>}
      </>
    );
  };

  function renderItem(item) {
    return (
      <View style={styles.contaiItem}>
        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() => {
            selectContact(item.item);
          }}>
          <View style={styles.leftPart}>
            <Image
              source={
                item.item.avatar
                  ? {uri: item.item.avatar}
                  : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
              }
              style={styles.img}
            />
            <Text style={styles.name}>{item.item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderItemG(item) {
    return (
      <View style={styles.contaiItemG}>
        <Text>{item.item.name}</Text>
      </View>
    );
  }
  const handleCreateGroup = async () => {
    const {data, message} = await createConversation({
      members: listChooses.map(e => e.userId),
      name: chatGroupName,
    });
    if (data) {
      navigation.pop();
      navigation.navigate({
        name: 'ChatDetail',
        params: {item: {item: data}},
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name={'chevron-back-outline'} size={30} color={'#143375'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNext}>
        <Text
          style={styles.txtNext}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          Tiếp
        </Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>THÊM THÀNH VIÊN</Text>
        <View style={styles.contaiSearch}>
          <TouchableOpacity style={styles.contaiIcon}>
            <Ionicons
              name={'search-outline'}
              size={25}
              color={'#000'}
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
      </View>
      <View style={styles.resultV}>
        {listChooses?.map((item, index) => (
          <RenderListChoose item={item} index={index} key={item.userId} />
        ))}
      </View>
      <FlatList
        data={contacts}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.userId}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10}}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.modalText}>ĐẶT TÊN NHÓM CHAT</Text>
              <TextInput
                value={chatGroupName}
                style={styles.inputG}
                onChangeText={t => setChatGroupName(t)}
                placeholderTextColor="#000"
                placeholder="Tên nhóm"
                keyboardType="default"
              />
            </View>
            <View style={styles.line} />
            <Text style={styles.Txt}>Thành viên nhóm</Text>
            <FlatList
              data={listChooses}
              renderItem={item => renderItemG(item)}
              keyExtractor={item => item.userId}
              showsVerticalScrollIndicator={false}
              style={{marginTop: 10}}
            />
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name={'close-outline'} size={30} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCreate}
              onPress={handleCreateGroup}>
              <Text style={[styles.createTxt, {color: colorTxtCreate}]}>
                Tạo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 30, fontWeight: 'bold', color: '#143375'},
  buttonNext: {position: 'absolute', right: 5, top: 5},
  txtNext: {fontSize: 22, color: '#143375'},
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
  resultV: {
    width: '100%',
    height: 100,
    backgroundColor: '#ddd',
    marginVertical: 10,
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {},
  contaiItem: {
    width: '100%',
    height: 60,
    backgroundColor: '#ddd',
    marginVertical: 10,
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
  leftPart: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
  },
  rightPart: {
    paddingLeft: 12,
    paddingVertical: 5,
    paddingRight: 12,
    width: '20%',
    height: '100%',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {fontSize: 22, color: '#143375', fontWeight: 'bold'},
  inputG: {
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
    fontSize: 15,
  },
  buttonClose: {position: 'absolute', top: 0, right: 0},
  buttonCreate: {justifyContent: 'center', alignItems: 'flex-end'},
  createTxt: {fontSize: 18},
  line: {width: '100%', height: 1, backgroundColor: '#aaa'},
  Txt: {fontSize: 15},
  contaiItemG: {
    alignItems: 'baseline',
    fontSize: 15,
    width: '100%',
    height: 22,
    backgroundColor: '#ddd',
    paddingLeft: 22,
  },
});
