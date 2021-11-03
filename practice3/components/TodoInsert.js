import React from 'react';
import {Button, StyleSheet, TextInput, View, useState} from 'react-native';

const TodoInsert = ({onAddTodo}) => {
  const [newTodoItem, setNewTodoItem] = useState;

  const todoInputHandler = newTodo => {
    setNewTodoItem(newTodo);
  };
  const addTodoHandler = () => {
    onAddTodo(newTodoItem);
    setNewTodoItem('');
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="항목을 추가하세요!"
        placeholderTextColor={'#999'}
        onChangeText={todoInputHandler}
        value={newTodoItem}
        autoCorrect={false}
      />
      <View style={styles.button}>
        <Button title={'ADD'} onPress={addTodoHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    padding: 20,
    fontSize: 24,
    marginLeft: 20,
  },
  button: {
    marginRight: 10,
  },
});

export default TodoInsert;
