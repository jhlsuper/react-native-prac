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

const Ranking = () => {
  // console.log('datedatedate', weekBefore, monthBefore, today);
  const [userLoading, setLoading] = useState(true);
  const [rankLoading, setrankLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [rankingArray, setrankingArray] = useState([]);

  const [totalUser, settotalUser] = useState();
  async function getUsers() {
    await firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        const user_list = [];
        // console.log('sizeee', snapshot.size);
        settotalUser(snapshot.size);
        snapshot.docs.forEach(id => {
          firestore().collection('users').doc(id.id).get().then(
            user_list.push(id.id),
            // console.log('iddidid', id.id);
          );
        });
        setUsers(user_list);
        setLoading(false);
      });
    console.log('user get done');
    // console.log('values values', querySnapshot.data());
  }
  const getRank = async () => {
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

              // console.log('-------underscore-----\n', _.values(data)[0]); //한유저의 모든 count date값.
              // console.log('querySnap', data);
              _.values(data)[0].forEach(value => {
                if (value.date >= monthBefore) {
                  // console.log('each value', value.date, value.count);
                  // console.log(data.email); //email값.
                  temp += value.count;
                }
              });
              temp_list.push({email: data.email, count: temp});

              console.log('temp_list', temp_list);
              if (parseInt(temp_list.length) == parseInt(totalUser)) {
                setrankingArray(temp_list);
                return temp_list;
                // setrankingArray(rankingArray => [...rankingArray, temp_list]);
                setrankLoading(false);
                // setrankingArray(_.sortBy(rankingArray, 'count'));

                // console.log('after Loading', rankLoading);
                console.log('rankArray', rankingArray);
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
  console.log('test1');
  useEffect(() => {
    getUsers();

    console.log('test2');
  }, []);
  useEffect(() => {
    console.log('test3');
    getRank();
  }, [userLoading]);
  const Item = ({email}) => (
    <View style={styles.item}>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
  const renderItem = ({item}) => <Item title={item.email} />;

  if (rankLoading) {
    return (
      <View>
        <Text>123</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Text>hi</Text>
      <FlatList
        data={rankingArray}
        renderItem={renderItem}
        keyExtractor={item => item.email}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  color: {
    alignContent: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  email: {
    fontSize: 32,
  },
});
export default Ranking;
