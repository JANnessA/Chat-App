import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import fakeData from '../../fakedata';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FriendRequest({navigation}) {
  const [valueTextInput, setValueTextInput] = useState('');
  function renderItem({item}) {
    return (
      <View style={styles.contaiItem}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('StackProfile')}>
          <Image
            source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
            style={styles.img}
          />
          <Text style={styles.name}>{item.item.username}</Text>
        </TouchableOpacity>
        <View style={styles.introduce}>
          <Text style={styles.txIntro}>
            Rất vui được làm quen với bạn, mình là {item.item.username}
          </Text>
        </View>
        <View style={styles.inline}>
          <TouchableOpacity style={styles.buttonAc}>
            <Text style={styles.txtAc}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDe}>
            <Text style={styles.txtAc}>Decline</Text>
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
      <View style={{alignItems: 'center'}}>
        <View style={styles.contaiSearch}>
          <TouchableOpacity style={styles.contaiIcon}>
            <Ionicons
              name={'search-outline'}
              size={25}
              color={'#143375'}
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
      <FlatList
        data={fakeData}
        renderItem={item => renderItem({item})}
        keyExtractor={item => item.id}
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
