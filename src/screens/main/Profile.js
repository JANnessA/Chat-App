import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {getAuth} from '../../helpers/network';
import AsyncStorage from '@react-native-community/async-storage';
import Context from '../../helpers/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FakeStatus from '../../fakeStatus';
import * as ImagePicker from 'react-native-image-picker';

export default function Profile({navigation}) {
  const [imageAvatar, setImageAvatar] = useState(0);
  const [avatarPath, setAvatarPath] = useState('');
  const {user, socket} = useContext(Context);
  //có 2 modal có thể hiển thị khi chọn vào ava
  // modal change ava cho phép sửa + xem ảnh đại diện => mình
  const [modalChangeAva, setModalChangeAva] = useState(false);
  // modal seeAva cho phép xem ảnh thôi => người khác
  const [modalSeeAva, setModalSeeAva] = useState(false);
  // lời giới thiệu bản thân
  const [userIntroduce, setUserIntroduce] = useState('');
  // status mới
  const [inforNewStatus, setInforNewStatus] = useState('');
  // modal setting
  const [visibleSetting, setVisibleSetting] = useState(false);

  const chooseFile = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    ImagePicker?.launchImageLibrary(options, async response => {
      //-----Link uri gửi lên server là uri: res.assets[0].uri----
      const source = response;
      console.log('res: ', source);
      const formData = new FormData();
      response.fileName = response.fileName
        ? response.fileName
        : Math.floor(Math.random() * Math.floor(999999999)) + '.jpg';
      response.name = 'image';
      formData.append('file', response);
      console.log('formData', formData);
      // console.log('resAVA', res);
    });
  };
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   setUserData();
  // }, []);

  // const setUserData = async () => {
  //   const res = await getAuth();
  //   if (res.success) {
  //     setData(res.data);
  //   }
  // };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      socket.disconnect();
      navigation.navigate('Login');
    } catch (e) {}
  };
  //biến userId xác định người đang xem là cá nhân hay người khác, nếu
  // là cá nhân thì cho phép chỉnh sửa ảnh đại diện, còn người ngoài
  // thì chỉ được xem
  let userId = 1;

  function handlePickImg() {
    if (userId === 1) {
      setModalChangeAva(true);
    } else {
      setModalSeeAva(true);
    }
  }

  function renderItem({item}) {
    let url = '';
    return (
      <View style={styles.contaiItem}>
        <View style={styles.ei}>
          <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
          {
            //tạm để ntn để hiểu giao diện, lúc ghép API thì dùng dòng này, chứ
            // url !== '' && <Image source={{uri: url}} style={styles.img} />
          }
          {
            //không dùng cái này
            <Image
              style={styles.img}
              source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
            />
          }
          <Text numberOfLines={3} ellipsizeMode="tail">
            {item.Content}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonMenu}
          onPress={() => setVisibleSetting(true)}>
          <Ionicons
            name={'ellipsis-horizontal-outline'}
            size={40}
            color={'#143375'}
            style={styles.imgClose}
          />
        </TouchableOpacity>
        <View style={styles.contaiAva}>
          <TouchableOpacity onPress={() => handlePickImg()} style={styles.ava}>
            <Image
              source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
              style={styles.avata}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infor}>
          <Text style={styles.txtInfor}>{user.fullname}</Text>
          {userIntroduce !== '' ? (
            <Text>{userIntroduce}</Text>
          ) : (
            <TouchableOpacity>
              <Text>Thêm lời giới thiệu bản thân</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.inline}>
        <TextInput
          value={inforNewStatus}
          style={styles.inputMes}
          onChangeText={t => setInforNewStatus(t)}
          placeholderTextColor="#143375"
          placeholder="Bạn đang nghĩ gì?"
          keyboardType="default"
        />
        <View style={styles.contaiButtonImg}>
          <TouchableOpacity style={styles.buttonImg}>
            <Ionicons
              name={'image-outline'}
              size={40}
              color={'#143375'}
              style={styles.imgClose}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={FakeStatus}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10, width: '90%'}}
        />
      </View>
      {
        //modal setting
      }
      <Modal animationType="slide" transparent={true} visible={visibleSetting}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setVisibleSetting(!visibleSetting)}>
              <Ionicons
                name={'chevron-back-outline'}
                size={30}
                color={'#000'}
              />
            </TouchableOpacity>
            <View style={{marginTop: 50, width: '100%'}}>
              <TouchableOpacity style={styles.contaiButton}>
                <Text style={styles.txtButton}>Đổi ảnh đại diện</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contaiButton}>
                <Text style={styles.txtButton}>
                  Cập nhật giới thiệu bản thân
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.contaiButton, {backgroundColor: '#326cd1'}]}
                onPress={() => handleLogout()}>
                <Text style={[styles.txtButton, {color: '#fff'}]}>
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {
        //modal change avata
      }
      <Modal animationType="slide" transparent={true} visible={modalChangeAva}>
        <View style={styles.centeredViewAva}>
          <View style={styles.modalViewAva}>
            <TouchableOpacity style={styles.contaiButton} onPress={chooseFile}>
              <Text style={styles.txtButton}>Đổi ảnh đại diện</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {
        //modal change User Introduction
        //   <Modal animationType="slide" transparent={true} visible={modalChangeAva}>
        //   <View style={styles.centeredViewAva}>
        //     <View style={styles.modalViewAva}>
        //       <TouchableOpacity style={styles.contaiButton}>
        //         <Text style={styles.txtButton}>Đổi ảnh đại diện</Text>
        //       </TouchableOpacity>
        //     </View>
        //   </View>
        // </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  header: {flex: 1.3, width: '100%', height: '100%'},
  buttonMenu: {position: 'absolute', top: 5, right: 5, marginBottom: 10},
  contaiAva: {justifyContent: 'center', alignItems: 'center'},
  ava: {justifyContent: 'center', alignItems: 'center'},
  avata: {
    width: 150,
    height: 150,
    borderRadius: 80,
  },
  infor: {marginVertical: 5, justifyContent: 'center', alignItems: 'center'},
  txtInfor: {
    color: '#143375',
    fontSize: 25,
    fontWeight: 'bold',
  },
  inline: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    flex: 0.5,
    backgroundColor: '#d5dbe3',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  inputMes: {
    flex: 0.9,
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#aaa',
    borderRadius: 10,
    color: '#05162e',
  },
  contaiButtonImg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    flex: 0.2,
    borderColor: '#aaa',
    borderRadius: 10,
  },
  buttonImg: {justifyContent: 'center', alignItems: 'center'},
  body: {flex: 2},
  contaiItem: {
    width: '95%',
    borderWidth: 0.5,
    borderColor: '#aaa',
    marginVertical: 12,
    marginHorizontal: 12,
    padding: 12,
  },
  ei: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    marginBottom: 12,
  },
  img: {width: '100%', height: 200},
  inlineView: {flexDirection: 'row'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  buttonClose: {position: 'absolute', top: 20, left: 20, marginBottom: 50},
  contaiButton: {
    width: '100%',
    height: 60,
    padding: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  txtButton: {fontSize: 20},
  centeredViewAva: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  modalViewAva: {
    width: '80%',
    height: 100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
});
