import React, {useState, useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles_organisms from './styles_organisms';
import {GIVE_UP, RE_START, START} from '../../i18n/msg';
const Timer = props => {
  const [second, setSecond] = useState(parseInt(props.sec));
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [btnText, setbtnText] = useState(START);

  useEffect(() => {
    if (second == 0) {
      if (second == 0) {
        setSecond(props.sec);
        setDelay(1000);
      }

      props.addCount();
      setIsRunning(false);
      setbtnText(RE_START);
    }
  }, [second, isRunning]);

  useInterval(
    () => {
      if (isRunning === true) {
        setbtnText(GIVE_UP);
        setSecond(second - 1);
      } else {
        setbtnText(RE_START);
        setSecond(props.sec);
      }
    },
    second >= 1 ? delay : null,
  );
  const buttonPressed = () => {
    if (isRunning === true) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  return (
    <View style={styles_organisms.press}>
      <Text style={styles_organisms.textWhite75}>
        {Math.floor(second / 60)} 분 : {second % 60} 초
      </Text>
      <View style={styles_organisms.press}>
        <TouchableOpacity
          style={styles_organisms.press}
          onPress={buttonPressed}>
          <Text
            title={btnText}
            style={styles_organisms.btnText}
            onPress={buttonPressed}>
            {btnText}
          </Text>
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

export default Timer;
