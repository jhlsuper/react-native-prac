import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  View,
  Pressable,
  FlatList,
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
  const [totalUser, settotalUser] = useState();
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
              const data = querySnapshot.data();

              _.values(data)[0].forEach(value => {
                if (value.date >= rankingBefore) {
                  console.log('dateataet', rankingBefore);
                  // console.log('each value', value.date, value.count);
                  // console.log(data.email); //email값.
                  temp += value.count;
                }
              });
              temp_list.push({email: data.email, count: temp});

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
  const Item = ({email}) => {
    return (
      <View style={styles.item}>
        <Text>총 {email.count}번.</Text>
        <Text style={styles.email}>{email.email}</Text>
      </View>
    );
  };
  const resetDate = when => {
    setrainkingBefore(when);
    setrankLoading(true);
  };
  const renderItem = ({item}) => {
    console.log('aaa', item);

    return <Item email={item} />;
  };
  if (rankLoading) {
    return (
      <View>
        <Text>123</Text>
      </View>
    );
  }
  console.log('before date', rankingBefore);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.rankignText}>유저 랭킹</Text>
          </View>
          <View
            style={{
              flex: 1,

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => resetDate(monthBefore)}>
              <Text style={styles.buttonText}>월</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => resetDate(weekBefore)}>
              <Text style={styles.buttonText}>주</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => resetDate(today)}>
              <Text style={styles.buttonText}>일</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
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
    backgroundColor: '#f9c2ff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 8,
    marginHorizontal: 16,
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
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default Ranking;
