import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Alert, Button} from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [counts, setCounts] = useState(0);

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };
  const submitHandler = text => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        // console.log(todos.length);
        const newTodos = [
          {text: text, key: Math.random().toString()},
          ...prevTodos,
        ];
        setCounts(counts + 1);

        return newTodos;
      });
    } else {
      Alert.alert(
        '어머!',
        'TODO가 너무 짧아요!\n TODO는 4글자 이상이여야 합니다.',
        {
          text: '네',
          onPress: () => console.log('alert closed'),
        },
      );
    }
  };
  const reset = () => {
    setTodos([]);
    setCounts(0);
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} count={counts} />

        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
        <Button
          title="초기화"
          color="coral"
          onPress={() => {
            {
              reset();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 45,
  },
  list: {
    marginTop: 10,
  },
});
