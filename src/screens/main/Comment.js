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
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {commentPost, getPost} from '../../helpers/network';

export default function Comment({navigation, route}) {
  const {data, countLike, name, ava} = route.params;
  console.log('dda', data.item.comments);
  // const [dataPost, setDataPost] = useState([]);
  // const getData = async () => {
  //   const data = await getPosts();
  //   console.log('data', data);
  //   setDataPost(data);
  // };

  // useEffect(() => {
  //   getData();
  // },[]);

  //ảnh đại diện của từng comment
  const [urlAva, setUrlAva] = useState('');
  const [visibleSeeModal, setVisibleSeeModal] = useState(false);
  //content of new comment
  const [comment, setComment] = useState('');
  //array comment
  const [arrComt, setArrComt] = useState([]);
  useEffect(() => {
    const arr = [];
    data.item.comments.map(item => {
      arr.push(item.comment);
    });
    setArrComt(arr);
  }, []);
  useEffect(() => {
    getPost({
      postId: data.item._id,
    });
  }, []);
  //url ảnh avata
  let url = 'abc';
  function renderItem({item}) {
    console.log('e', item.comment);
    return (
      <View style={styles.contaiItem}>
        <TouchableOpacity style={styles.buttonName}>
          {
            //   url && (
            //   <Image style={styles.img} source={{uri: item.image[0]}} />
            // )
          }
          <Image
            style={styles.img}
            source={
              ava !== ''
                ? {uri: ava}
                : require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')
            }
          />
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imgClose}
          onPress={() => setVisibleSeeModal(true)}>
          <Ionicons
            name={'ellipsis-horizontal-outline'}
            size={25}
            color={'#143375'}
          />
        </TouchableOpacity>
        <Text style={styles.content}>{item}</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleSeeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setVisibleSeeModal(!visibleSeeModal)}>
                <Ionicons
                  name={'close-circle-outline'}
                  size={30}
                  color={'#000'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonComment}>
                <Text>Chỉnh sửa comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonComment}>
                <Text>Xóa comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name={'chevron-back-outline'}
          size={40}
          color={'#143375'}
          style={styles.imgBack}
        />
      </TouchableOpacity>
      <View style={styles.center}>
        {data.item.image[0] && (
          <Image
            style={{width: '80%', height: 200}}
            source={{uri: data.item.image[0]}}
          />
        )}
        <Text style={styles.contentStatus}>{data.item.content}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.inlineView}>
        <TouchableOpacity
          onPress={async () => {
            const getPost1 = await getPost({
              postId: data.item._id,
            });
            console.log('getpost', getPost1);
          }}>
          {
            //so sasnh islike để lấy heart trắng và đỏ
            countLike > 0 ? (
              <Image
                source={require('../../assets/img/heartRed.png')}
                style={{width: 30, height: 30}}
              />
            ) : (
              <Image
                source={require('../../assets/img/heart.png')}
                style={{width: 30, height: 30}}
              />
            )
          }
        </TouchableOpacity>
        <Text style={styles.txtStatus}>{countLike}</Text>
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
      <FlatList
        data={arrComt}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10}}
      />
      <View style={styles.inlineBar}>
        <TextInput
          value={comment}
          onChangeText={t => setComment(t)}
          placeholderTextColor="#143375"
          placeholder="Nội dung bình luận"
          keyboardType="default"
          style={styles.txtInput}
          multiline={true}
        />
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => {
            commentPost({
              postId: data.item._id,
              comment: comment,
            });
            setArrComt([...arrComt, comment]);
            setComment('');
          }}>
          <Text style={styles.txtSend}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 12},
  center: {alignItems: 'center'},
  line: {
    marginTop: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: '100%',
  },
  inlineView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  txtStatus: {fontSize: 15, marginLeft: 5},
  inlineComment: {flexDirection: 'row', alignItems: 'center'},
  img: {width: 50, height: 50, borderRadius: 25},
  buttonName: {flexDirection: 'row', alignItems: 'center'},
  name: {fontSize: 16, marginLeft: 5, color: '#143375', fontWeight: 'bold'},
  imgClose: {position: 'absolute', top: 15, right: 15},
  contaiItem: {
    backgroundColor: '#ddd',
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
  },
  content: {padding: 12, fontSize: 15},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '60%',
    height: '25%',
  },
  buttonClose: {position: 'absolute', top: 0, right: 0},
  buttonComment: {
    width: 200,
    height: 50,
    backgroundColor: '#ddd',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  contentStatus: {fontSize: 15, marginTop: 20},
  inlineBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  txtInput: {width: '86%', fontSize: 15},
  buttonSend: {},
  txtSend: {color: '#143375', fontSize: 15},
});
