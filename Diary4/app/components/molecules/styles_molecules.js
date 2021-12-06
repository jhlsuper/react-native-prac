import {StyleSheet} from 'react-native';
import React from 'react';

export default styles_molecules = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    hadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonOpen: {
    backgroundColor: 'darkgreen',
    // #F194FF
  },
  modalTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  ////instruction ////
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'blue',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    shadowColor: 'gray',
  },
  instructionContainer: {
    alignItems: 'flex-start',
  },
  instructionText: {
    fontSize: 15,
    margin: 5,
  },
  text_btn: {
    fontSize: 20,
    color: 'white',
  },
  pressable: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  /// news///
  contentView: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: 20,
    alignContent: 'center',
  },

  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  redText: {
    color: '#C00000',
  },
  blueText: {
    color: '#0070C0',
  },
  grayText: {
    // color: '#808080',
    color: 'lightgray',
  },
  timeText: {
    fontSize: 17,
    color: 'lightgray',
  },
  contentView_: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: 20,
    alignContent: 'center',
  },
  emoticonText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
