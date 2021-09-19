import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function SearchBar(props) {
  const [valueTextInput, setValueTextInput] = useState('');
  const {doST, iconSearch, textInputHolder} = props;
  return (
    <View style={styles.header}>
      <View style={styles.containerSearch}>
        <TouchableOpacity style={iconSearch}>
          <Ionicons
            name={'search-outline'}
            size={30}
            color={'#fff'}
            style={styles.searchImg}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder={textInputHolder}
          value={valueTextInput}
          onChangeText={t => {
            setValueTextInput(t);
          }}
        />
        <TouchableOpacity
          style={styles.circleClose}
          onPress={() => {
            setValueTextInput('');
          }}>
          <Ionicons
            name={'close-circle-outline'}
            size={30}
            color={'#fff'}
            style={styles.imgClose}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#144e8c',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgMenu: {width: 20, height: 20},
  iconMenu: {
    width: 20,
    height: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    width: 250,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImg: {paddingHorizontal: 20},
  textInput: {width: 170},
  circleClose: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  imgClose: {width: 6, height: 6},
  btnBell: {marginHorizontal: 15},
  bellIcon: {width: 20, height: 20},
});
