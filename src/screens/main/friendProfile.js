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
import {newPost, getPost} from '../../helpers/network';

export default function FriendProfile({navigation}) {
  const [imageAvatar, setImageAvatar] = useState(0);
  const [avatarPath, setAvatarPath] = useState('');
  const {user, socket} = useContext(Context);
  //có 2 modal có thể hiển thị khi chọn vào ava
  // modal change ava cho phép sửa + xem ảnh đại diện
  const [modalChangeAva, setModalChangeAva] = useState(false);
  // status mới
  const [inforNewStatus, setInforNewStatus] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  // modal setting
  const [visibleSetting, setVisibleSetting] = useState(false);
  //url ảnh avata
  const [urlStatus, setUrlStatus] = useState('');
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    getPost();
  }, []);

  const chooseFile = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    ImagePicker?.launchImageLibrary(options, async response => {
      setUrlImage(response.assets[0].uri);
      //-----Link uri gửi lên server là uri: res.assets[0].uri----
      const source = response;
      //console.log('res: ', source);
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

  function renderItem({item}) {
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
        <View style={styles.inlineView}>
          <TouchableOpacity>
            {
              //so sasnh islike để lấy heart trắng và đỏ
            }
            <Image
              source={require('../../assets/img/heart.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <Text style={styles.txtStatus}>10</Text>
          <TouchableOpacity
            style={styles.inlineComment}
            onPress={() => navigation.navigate('Comment')}>
            <Ionicons
              name={'chatbox-outline'}
              size={30}
              color={'#000'}
              style={{marginLeft: 10}}
            />
            <Text style={styles.txtStatus}>Bình luận</Text>
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
      <View style={styles.header}>
        <View style={styles.contaiAva}>
          <TouchableOpacity
            onPress={() => setModalChangeAva(true)}
            style={styles.ava}>
            <Image
              source={
                user.avatar
                  ? {uri: user.avatar}
                  : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
              }
              style={styles.avata}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infor}>
          <Text style={styles.txtInfor}>{user.fullname}</Text>
          <TouchableOpacity style={styles.buttonRemoveFriend}>
            <Text style={{color: '#fff', fontSize: 15}}>Hủy kết bạn</Text>
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
              <TouchableOpacity
                style={styles.contaiButton}
                onPress={() => {
                  setModalChangeAva(true);
                  setVisibleSetting(false);
                }}>
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
            <TouchableOpacity
              style={styles.contaiCloseButton}
              onPress={() => setModalChangeAva(false)}>
              <Ionicons
                name={'close-circle-outline'}
                size={40}
                color={'#143375'}
                style={styles.imgClose}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contaiButton} onPress={chooseFile}>
              <Text style={styles.txtButton}>Đổi ảnh đại diện</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {
        //modal update Status
      }
      <Modal animationType="slide" transparent={true} visible={modalStatus}>
        <View style={styles.centeredViewStatus}>
          <View style={styles.modalViewStatus}>
            <TouchableOpacity
              style={styles.contaiCloseButton}
              onPress={() => setModalStatus(false)}>
              <Ionicons
                name={'close-circle-outline'}
                size={35}
                color={'#143375'}
                style={styles.imgClose}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {urlStatus == '' ? (
                <TouchableOpacity
                  style={styles.buttonAddImageStatus}
                  onPress={chooseFile}>
                  {urlImage ? (
                    <Image
                      source={{uri: urlImage}}
                      style={{height: '100%', width: '100%'}}
                      resizeMode={'contain'}
                    />
                  ) : (
                    <Text>Thêm ảnh</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <Image source={{uri: urlStatus}} />
              )}
              <TextInput
                value={inforNewStatus}
                onChangeText={t => setInforNewStatus(t)}
                placeholderTextColor="#143375"
                placeholder="Bạn đang nghĩ gì?"
                keyboardType="default"
                style={styles.txtInputStatus}
                multiline={true}
              />
              <TouchableOpacity
                style={styles.buttonC}
                onPress={() => {
                  newPost({
                    content: inforNewStatus,
                    image: [urlImage],
                  });
                  setModalStatus(false);
                  setUrlImage('');
                  setInforNewStatus('');
                }}>
                <Text style={{color: '#fff', fontSize: 15}}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  buttonBack: {position: 'absolute', left: 12, top: 12},
  header: {flex: 0.8, width: '100%', height: '100%'},
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
  buttonRemoveFriend: {
    width: 200,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  txtThinking: {color: '#05162e', fontSize: 15},
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
  inlineView: {flexDirection: 'row', alignItems: 'center'},
  txtStatus: {fontSize: 15, marginLeft: 5},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  inlineComment: {flexDirection: 'row', alignItems: 'center'},
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
  contaiCloseButton: {position: 'absolute', top: -5, right: -5},
  centeredViewIntroduce: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  modalViewIntroduce: {
    width: '80%',
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
  txtInput: {
    width: '90%',
    padding: 12,
    fontSize: 15,
    height: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonC: {
    width: '90%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  centeredViewStatus: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalViewStatus: {
    width: '100%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonAddImageStatus: {
    width: '90%',
    height: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInputStatus: {
    width: '90%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
    borderRadius: 5,
    fontSize: 14,
  },
});
