import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FakeData from '../../fakedata';

export default function CreateGroup({navigation}) {
  const [valueTextInput, setValueTextInput] = useState('');
  const [list, setList] = useState([]);
  const [chooseItem, setChooseItem] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [chatGroupName, setChatGroupName] = useState('');

  let colorTxtCreate = chatGroupName.length > 0 ? '#143375' : '#ddd';

  //phần này xử lí kiểu chọn vào ô và bỏ chọn thì thêm vào state list để hiển thị danh sách người đã được chọn mà tớ chưa xử lý được.
  function solveList(name) {
    console.log('list', list);
    let a = list.includes(name);
    console.log('a', a);
    //   ? list.splice(list.findIndex(name), 1)
    //   : list.concat(name);
  }

  function renderItem({item}) {
    return (
      <View style={styles.contaiItem}>
        {
          //gọi solveList ở onPress setList(...)
        }
        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() => setList(list.concat(item.item.username))}>
          <View style={styles.leftPart}>
            <Image
              source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
              style={styles.img}
            />
            <Text style={styles.name}>{item.item.username}</Text>
          </View>
          <View style={styles.rightPart}>
            <Ionicons
              name={'stop-outline'}
              size={25}
              color={'#143375'}
              style={styles.searchImg}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderItemG({item}) {
    return (
      <View style={styles.contaiItemG}>
        <Text>{item.item.username}</Text>
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
              name={'close-circle-outline'}
              size={25}
              color={'#143375'}
              style={styles.imgClose}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.resultV}>
        <Text style={styles.list}>{list}</Text>
      </View>
      <FlatList
        data={FakeData}
        renderItem={item => renderItem({item})}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10}}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.modalText}>ĐẶT TÊN NHÓM CHAT MỚI</Text>
              <TextInput
                value={chatGroupName}
                style={styles.inputG}
                onChangeText={t => setChatGroupName(t)}
                placeholderTextColor="#000"
                placeholder="Tên nhóm (Bắt buộc)"
                keyboardType="default"
              />
            </View>
            <View style={styles.line} />
            <Text style={styles.Txt}>Thành viên nhóm</Text>
            <FlatList
              data={FakeData}
              renderItem={item => renderItemG({item})}
              keyExtractor={item => item.id}
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
              onPress={() =>
                navigation.navigate({
                  name: 'ChatDetail',
                  params: {item: chatGroupName},
                })
              }>
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
