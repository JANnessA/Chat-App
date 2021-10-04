import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import FakeData from '../../fakedata';
const numColumn = 2;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Call({navigation}) {
  let data = [
    {
      id: 1,
      username: 'Jann',
      phone: '0394567889',
      email: 'tuyenletm31@gmail.com',
      lastMes:
        'To render multiple columns, use the numColumns prop. Using this approach instead of a flexWrap layout can prevent conflicts with the item height logic.',
    },
  ];

  function renderItem() {
    return (
      <View style={styles.containerItem}>
        <Image
          source={require('../../assets/img/9b7cd428b340dcc5cbbb628df1383893.jpg')}
          style={styles.img}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={FakeData}
          renderItem={item => renderItem({item})}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}
          numColumns={numColumn}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate({
                name: 'ChatDetail',
                params: {item: 'abc'},
              })
            }>
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
