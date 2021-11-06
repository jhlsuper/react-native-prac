import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet} from 'react-native';

var _interval;

const Timer = ({style}) => {
  const [second, setSecond] = useState(600);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setSecond(second - 1);
    },
    second >= 1 ? delay : null,
  );

  //setIsRunning(false);

  return (
    <Text style={{...styles.text, ...style}}>
      {' '}
      {Math.floor(second / 60)} : {second % 60}{' '}
    </Text>
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
  text: {
    fontSize: 50,

    color: 'red',
  },
});

export default Timer;
