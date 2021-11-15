import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Timer from './timer';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import PopupButton from './popup_button';
import Instruction from './instruction';

const TimerComponent = () => {
  const [stop, setStop] = React.useState(false);
  const [count, setCounts] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.flex1}>
        <PopupButton
          visible={modalVisible}
          turnVisible={() => setModalVisible(!modalVisible)}
        />
      </View>

      <Instruction
        visible={modalVisible}
        turnVisible={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.flex3}>
        <Timer sec={3} cnt={count} addCount={() => setCounts(count + 1)} />
      </View>
      <View style={styles.flex1}>
        <Text style={styles.text}>{`${count} 번 완료`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 6,
    backgroundColor: '#7487C5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex1: {
    flex: 2.5,
    marginTop: 60,
  },
  flex3: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontStyle: 'italic',
  },
});

export default TimerComponent;
