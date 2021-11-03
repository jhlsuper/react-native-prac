import {stringLiteral} from '@babel/types';
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  // todos: {id: Number, textValue: string, checked: boolean }
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    setTodos([
      ...todos,
      {id: Math.random().toString(), textValue: text, checked: false},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Hello Todolist</Text>
      <View style={styles.card}>
        <TodoInsert />
        <TodoList todos={todos} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appTitle: {
    color: 'blue',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'lightgray',
    flex: 1,

    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default App;
