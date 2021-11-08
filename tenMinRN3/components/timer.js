import {is} from '@babel/types';
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';

// var _interval;

const Timer = props => {
  const [second, setSecond] = useState(parseInt(props.sec));
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [btnText, setbtnText] = useState('시작하기');
  useEffect(() => {
    if (second == 0) {
      if (second == 0) {
        setSecond(props.sec);
        setDelay(1000);
      }
      console.log('its done');
      //   cnt++;
      props.addCount();
      console.log(props.cnt);
      setIsRunning(false);
      setbtnText('다시하기');
    }
  }, [second, isRunning]);

  useInterval(
    () => {
      if (isRunning === true) {
        setSecond(second - 1);
        setbtnText('포기하기');
      } else {
        setSecond(props.sec);
        setbtnText('시작하기');
      }
    },
    second >= 1 ? delay : null,
  );
  const buttonPressed = () => {
    if (isRunning === true) {
      setIsRunning(false);
      console.log(isRunning);
    } else {
      setIsRunning(true);
      console.log(isRunning);
    }
  };
  //   setIsRunning(false);

  return (
    <View>
      <Text style={styles.text}>
        {' '}
        {Math.floor(second / 60)} 분 : {second % 60} 초
      </Text>
      <Button title={btnText} onPress={buttonPressed} />
    </View>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const styles = StyleSheet.create({
  timecontainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 50,
    color: 'blue',
  },
  count_text: {
    // alignContent: 'center',
    marginTop: 10,
    // justifyContent: 'center',
  },
});

export default Timer;
