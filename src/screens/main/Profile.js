/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
  Alert,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {getAuth, getUserInfor} from '../../helpers/network';
import AsyncStorage from '@react-native-community/async-storage';
import Context from '../../helpers/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {
  newPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  updateUserInfor,
  uploadFile,
  unlikePost,
} from '../../helpers/network';
import {styles} from './stylesProfile';

export default function Profile({navigation}) {
  //pull to refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const [imageAvatar, setImageAvatar] = useState(0);
  const [avatarPath, setAvatarPath] = useState('');
  const {user, socket} = useContext(Context);

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
  const [dataPost, setDataPost] = useState([]);
  //count => reload data posts
  const [count, setCount] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [likeTus, setLikeTus] = useState(false);
  const [likeTusCount, setLikeTusCount] = useState(0);
   console.log(user);

  let i = 0;
  let i2 = 0;
  //name user
  let fullname = '';
  // modal more in each status
  const [modalMore, setModalMore] = useState(false);
  //modal update post
  const [modalUpdate, setModalUpdate] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    const data = await getPosts();
    // console.log('data', data);
    setDataPost(data);
  };

  const getUserInfor1 = async () => {
    const data = await getUserInfor();
  };

  useEffect(() => {
    getData();
    getUserInfor1();
  }, [count]);

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
      // console.log('res: ', source);
      // console.log('resAVA', res);
      const formData = new FormData();
      formData.append('files', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      const data = await uploadFile(formData);
      setUrlImage(data.data.toString());
    });
  };
  const chooseFileAva = () => {
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
      // console.log('res: ', source);
      // console.log('resAVA', res);
      const formData = new FormData();
      formData.append('files', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      const data = await uploadFile(formData);
      await setAvatar(data.data.toString());

      const updateAva = await updateUserInfor({
        avatar: data.data.toString(),
        _id: user._id,
      });
      console.log('data', data.data.toString());
      console.log('updateAva', updateAva);
    });
  };

  async function handleChangeAva() {
    console.log('user', user);
    await chooseFileAva();

    setModalChangeAva(false);
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      socket.disconnect();
      navigation.navigate('Login');
    } catch (e) {}
  };

  function renderItem({item, index}) {
    return (
      <View style={styles.contaiItem}>
        <TouchableOpacity
          style={styles.iconMore}
          onPress={() => setModalMore(true)}>
          <Ionicons
            name={'ellipsis-horizontal-outline'}
            size={30}
            color={'#000'}
          />
        </TouchableOpacity>
        <View style={styles.ei}>
          <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
          {item.image.length > 0 && (
            <Image style={styles.img} source={{uri: item.image[0]}} />
          )}
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.content}>
            {item.content}
          </Text>
        </View>
        <View style={styles.inlineView}>
          {!likeTus ? (
            <TouchableOpacity
              onPress={async () => {
                // console.log('abc');
                const likeTus = await likePost({postId: item._id});
                // console.log('like', likeTus);
                const data = await getPosts();
                // console.log('data', data.data[index]);
                setDataPost(data);
                if (likeTus.data === true) {
                  setLikeTus(true);
                  setLikeTusCount(data.data[index].like.length);
                }
              }}>
              {
                //so sasnh islike để lấy heart trắng và đỏ
              }
              <Image
                source={require('../../assets/img/heart.png')}
                style={[{width: 30, height: 30}]}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                const unlikeTus = await unlikePost({postId: item._id});
                console.log('unlike', unlikeTus);
                if (unlikeTus.success === false) {
                  setLikeTus(false);
                  setLikeTusCount(0);
                }
              }}>
              {
                //so sasnh islike để lấy heart trắng và đỏ
              }
              <Image
                source={require('../../assets/img/heartRed.png')}
                style={[{width: 30, height: 30}]}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.txtStatus}>{likeTusCount}</Text>
          <TouchableOpacity
            style={styles.inlineComment}
            onPress={() =>
              navigation.navigate('Comment', {
                data: {item},
                countLike: likeTusCount,
                name: user.fullname,
                ava: avatar,
              })
            }>
            <Ionicons
              name={'chatbox-outline'}
              size={30}
              color={'#000'}
              style={{marginLeft: 10}}
            />
            <Text style={styles.txtStatus}>Bình luận</Text>
          </TouchableOpacity>
        </View>
        {
          //modal more in each status
        }
        <Modal
          animationType="none"
          transparent={true}
          visible={modalMore}
          onRequestClose={() => {
            setModalMore(false);
          }}>
          <View style={styles.centeredViewMore}>
            <View style={styles.modalViewMore}>
              <TouchableOpacity
                style={styles.contaiCloseButton}
                onPress={() => setModalMore(false)}>
                <Ionicons
                  name={'close-circle-outline'}
                  size={30}
                  color={'#143375'}
                  style={styles.imgClose}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalStatus(true);
                  setModalMore(false);
                }}
                style={styles.buttonUpdate}>
                <Text>Cập nhật bài đăng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await deletePost({
                    _id: item._id,
                    content: item.content,
                    image: item.image,
                  });
                  setModalMore(false);
                  const data = await getPosts();
                  console.log('data', data);
                  setDataPost(data);
                }}
                style={styles.buttonUpdate}>
                <Text>Xóa bài đăng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
          <TouchableOpacity
            onPress={() => setModalChangeAva(true)}
            style={styles.ava}>
            <Image
              source={
                avatar !== ''
                  ? {uri: avatar}
                  : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
              }
              style={styles.avata}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infor}>
          <Text style={styles.txtInfor}>{user.fullname}</Text>
        </View>
      </View>
      <View style={styles.inline}>
        <TouchableOpacity
          style={styles.inputMes}
          onPress={() => setModalStatus(true)}>
          <Text style={styles.txtThinking}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
        <View style={styles.contaiButtonImg}>
          <TouchableOpacity
            style={styles.buttonImg}
            onPress={() => {
              setModalStatus(true);
              setUrlImage('');
            }}>
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
          data={dataPost.data}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 10,
            width: Dimensions.get('window').width * 0.9,
          }}>
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        </FlatList>
      </View>
      {
        //modal setting
      }
      <Modal animationType="slide" transparent={true} visible={visibleSetting}>
        <View>
          <View style={[styles.modalView]}>
            <TouchableOpacity
              style={[styles.buttonClose, {alignSelf: 'flex-start'}]}
              onPress={() => setVisibleSetting(!visibleSetting)}>
              <Ionicons
                name={'chevron-back-outline'}
                size={30}
                color={'#000'}
              />
            </TouchableOpacity>
            <View style={{marginTop: 50, width: '80%'}}>
              <TouchableOpacity
                style={styles.contaiButton}
                onPress={() => {
                  setModalChangeAva(true);
                  setVisibleSetting(false);
                }}>
                <Text style={styles.txtButton}>Đổi ảnh đại diện</Text>
              </TouchableOpacity>
              {
                // <TouchableOpacity style={styles.contaiButton}>
                //   <Text style={styles.txtButton}>
                //     Cập nhật thông tin cá nhân
                //   </Text>
                // </TouchableOpacity>
              }
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
            <TouchableOpacity
              style={styles.contaiButton}
              onPress={() => {
                handleChangeAva();
              }}>
              <Text style={styles.txtButton}>Đổi ảnh đại diện</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {
        //modal Status
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
                onPress={async () => {
                  setCount(i++);
                  urlImage
                    ? await newPost({
                        content: inforNewStatus,
                        image: [urlImage],
                      })
                    : await newPost({
                        content: inforNewStatus,
                      });
                  setModalStatus(false);
                  setUrlImage('');
                  setInforNewStatus('');
                  const data = await getPosts();
                  // console.log('data', data);
                  setDataPost(data);
                }}>
                <Text style={{color: '#fff', fontSize: 15}}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {
        //modal update Status
      }
      <Modal animationType="slide" transparent={true} visible={modalUpdate}>
        <View style={styles.centeredViewStatus}>
          <View style={styles.modalViewStatus}>
            <TouchableOpacity
              style={styles.contaiCloseButton}
              onPress={() => setModalUpdate(false)}>
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
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode={'contain'}
                    />
                  ) : (
                    <Text style={{fontSize: 15}}>Thêm ảnh</Text>
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
                onPress={async () => {
                  setCount(i++);
                  urlImage
                    ? await updatePost({
                        content: inforNewStatus,
                        image: [urlImage],
                      })
                    : await updatePost({
                        content: inforNewStatus,
                      });
                  setModalUpdate(false);
                  setUrlImage('');
                  setInforNewStatus('');
                  const data = await getPosts();
                  // console.log('data', data);
                  setDataPost(data);
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
