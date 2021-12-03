import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

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

      props.addCount();
      // console.log(props.cnt);
      setIsRunning(false);
      setbtnText('다시하기');
    }
  }, [second, isRunning]);

  useInterval(
    () => {
      if (isRunning === true) {
        setbtnText('포기하기');
        setSecond(second - 1);
      } else {
        setbtnText('시작하기');
        setSecond(props.sec);
      }
    },
    second >= 1 ? delay : null,
  );
  const buttonPressed = () => {
    if (isRunning === true) {
      setIsRunning(false);
      // console.log(isRunning);
    } else {
      setIsRunning(true);
      // console.log(isRunning);
    }
  };

  return (
    <View style={styles.press}>
      <Text style={styles.text}>
        {' '}
        {Math.floor(second / 60)} 분 : {second % 60} 초
      </Text>
      <View style={styles.press}>
        <TouchableOpacity style={styles.press} onPress={buttonPressed}>
          {/* <Text>{btnText}</Text> */}
          <Text title={btnText} style={styles.btnText} onPress={buttonPressed}>
            {btnText}
          </Text>
          {/* <Button title={btnText} color="white" onPress={buttonPressed} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
/**
 * @param delay - 밀리세컨단위 만큼 줄어든다.
 */
function useInterval(callback, delay) {
  //delay만큼 줄여줌
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
    fontSize: 75,
    color: 'white',
  },
  count_text: {
    marginTop: 10,
  },
  press: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnText: {
    marginTop: 5,
    color: 'white',
    fontSize: 20,
  },
});

export default Timer;
