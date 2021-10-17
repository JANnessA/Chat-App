import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  header: {flex: 1.2, width: '100%', height: '100%'},
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
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#aaa',
    marginVertical: 12,
    padding: 12,
  },
  iconMore: {position: 'absolute', top: 1, right: 5},
  ei: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    marginBottom: 12,
  },
  img: {width: '100%', height: 200, marginTop: 15},
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
  content: {fontSize: 15, color: '#000'},
  centeredViewMore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalViewMore: {
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
  },
  buttonUpdate: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});
