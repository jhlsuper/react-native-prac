import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';

export default function AddTodo({submitHandler, count}) {
  const [text, setText] = useState('');

  const changeHandler = val => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={`오늘 할 일 ${5 - count}개를 추가해주세요!`}
        onChangeText={changeHandler}
        value={text}
      />

      <View>
        <Button
          onPress={() => {
            if (count < 5) {
              submitHandler(text);
              console.log(`${count}`);

              setText('');
            } else {
              setText('');
              Alert.alert('경고!', '하루 5개면 충분합니다.');
            }
          }}
          title="할 일 추가"
          color="coral"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
