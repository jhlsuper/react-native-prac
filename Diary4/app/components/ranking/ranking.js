import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _, {size, times} from 'lodash';
import {weekBefore, monthBefore, today} from '../../database/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Ranking = () => {
  // console.log('datedatedate', weekBefore, monthBefore, today);
  const [userLoading, setLoading] = useState(true);
  const [rankLoading, setrankLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [rankingArray, setrankingArray] = useState([]);
  const [rankingBefore, setrainkingBefore] = useState(monthBefore);
  const [pressed, setPressed] = useState([true, false, false]);
  const [totalUser, settotalUser] = useState();
  const [colorArray, setColorArray] = useState(['black', 'white', 'white']);
  async function getUsers() {
    await firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        const user_list = [];
        settotalUser(snapshot.size);
        snapshot.docs.forEach(id => {
          firestore()
            .collection('users')
            .doc(id.id)
            .get()
            .then(user_list.push(id.id), console.log('iddidid', id.id));
        });
        setUsers(user_list);
      });
    setLoading(false);
    getRank();
  }
  const getRank = async () => {
    // getUsers();
    console.log('get rank의 유저리스트', users);
    if (rankLoading) {
      try {
        let temp_list = [];
        users.forEach(value => {
          let temp = 0;

          firestore()
            .collection('users')
            .doc(value)
            .get()
            .then(querySnapshot => {
              const dateData = querySnapshot.data();
              // console.log('dataaaaa', _.values(dateData));
              // console.log('dateData[0]', _.values(dateData)[0]);
              //ios _.values(dateData[0])   android _.values(dateData[1])
              if (Platform.OS === 'ios') {
                _.values(dateData)[0].forEach(value => {
                  if (value.date >= rankingBefore) {
                    // console.log('each value', value.date, value.count);
                    // console.log(data.email); //email값.
                    temp += value.count;
                  }
                });
              } else if (Platform.OS === 'android') {
                _.values(dateData)[1].forEach(value => {
                  if (value.date >= rankingBefore) {
                    // console.log('each value', value.date, value.count);
                    // console.log(data.email); //email값.
                    temp += value.count;
                  }
                });
              }

              temp_list.push({email: dateData.email, count: temp});

              console.log('temp_list', temp_list);
              if (parseInt(temp_list.length) == parseInt(totalUser)) {
                setrankingArray(_.reverse(_.sortBy(temp_list, 'count')));
                // setrankingArray(temp_list);
                setrankLoading(false);
                // setrankingArray(_.sortBy(rankingArray, 'count'));

                console.log('after Loading', rankLoading);
              }
            });
          if (rankLoading) {
            setrankLoading(false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getUsers();
    // getRank();
    console.log('getUser test2');
  }, []);
  useEffect(() => {
    getRank();
  }, [users]);
  useEffect(() => {
    getRank();
  }, [rankingBefore]);

  const Item = ({data}) => {
    return (
      <View style={styles.item}>
        <Text>총 {data.count}번.</Text>
        <Text style={[styles.email, {color: 'white'}]}>{data.email}</Text>
      </View>
    );
  };
  const resetDate = (when, button) => {
    if (!pressed[button]) {
      const pressed_list = [false, false, false];
      const pressed_color = ['white', 'white', 'white'];
      setrainkingBefore(when);
      setrankLoading(true);
      pressed_list[button] = true;
      pressed_color[button] = 'black';
      setPressed(pressed_list);
      setColorArray(pressed_color);
      console.log('****pressed*****', pressed);
    }
  };
  const renderItem = ({item}) => {
    console.log('aaa', item);

    return <Item data={item} />;
  };
  if (rankLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // console.log('before date', rankingBefore);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}></View>
          <View
            style={{
              flex: 1,

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => resetDate(monthBefore, 0)}>
              <Text style={{...styles.buttonText, color: colorArray[0]}}>
                월
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => resetDate(weekBefore, 1)}>
              <Text style={{...styles.buttonText, color: colorArray[1]}}>
                주
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => resetDate(today, 2)}>
              <Text style={{...styles.buttonText, color: colorArray[2]}}>
                일
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.rankginContainer}>
        <FlatList
          data={rankingArray}
          keyExtractor={item => item.email} //각 요소 구별, 유일
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rankginContainer: {
    flex: 7,
  },
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  email: {
    fontSize: 30,
  },
  rankignText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonDate: {
    backgroundColor: 'gray',
    alignItems: 'flex-end',
    padding: 5,
    margin: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
export default Ranking;
