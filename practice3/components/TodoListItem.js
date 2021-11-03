import React, {useReducer} from 'react';
import {
  useState,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

const TodoListItem = ({textValue, id, checked}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.circle}>
          <Icon name="circledowno" size={30} color="red" />
        </View>
      </TouchableOpacity>
      <Text style={[styles.text, styles.strikeText]}>{textValue}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="DELETE" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 2,
    marginLeft: 20,
  },
  completeCircle: {
    marginRight: 20,
    marginLeft: 20,
  },
  strikeText: {
    color: 'gray',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default TodoListItem;
