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
  const [totalUser, settotalUser] = useState(); //총 유저수를 측정
  const [pressed, setPressed] = useState([true, false, false]); // 랭킹 날짜 기준 버튼 눌림확인.
  const [colorArray, setColorArray] = useState(['black', 'white', 'white']); //랭킹 날짜 기준 버튼 색깔
  async function getUsers() {
    await firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        const user_list = [];
        settotalUser(snapshot.size); //user 다큐멘트의 모든 사용자 수 저장
        snapshot.docs.forEach(id => {
          firestore()
            .collection('users')
            .doc(id.id)
            .get()
            .then(user_list.push(id.id), console.log('iddidid', id.id)); //유저 id user_list에 추가
        });
        setUsers(user_list);
      });
    setLoading(false); //유저 리스트 저장 완료
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
                //ios 와 android 배열의 순서가 달라서 따로 처리
                _.values(dateData)[0].forEach(value => {
                  //
                  if (value.date >= rankingBefore) {
                    //월, 주,일 비교날짜 이후면 count
                    temp += value.count;
                  }
                });
              } else if (Platform.OS === 'android') {
                _.values(dateData)[1].forEach(value => {
                  if (value.date >= rankingBefore) {
                    temp += value.count;
                  }
                });
              }

              temp_list.push({email: dateData.email, count: temp}); //이메일값과 총 집중횟수 저장

              console.log('temp_list', temp_list);
              if (parseInt(temp_list.length) == parseInt(totalUser)) {
                setrankingArray(_.reverse(_.sortBy(temp_list, 'count'))); //내림차순으로 총 집중횟수 순으로 정렬한 리스트 저장
                // setrankingArray(temp_list);
                setrankLoading(false); // 랭킹 로딩완료
                // setrankingArray(_.sortBy(rankingArray, 'count'));

                console.log('after Loading', rankLoading);
              }
            });
          // if (rankLoading) {
          //   setrankLoading(false);
          // }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getUsers();
    console.log('getUser test2');
  }, []);
  useEffect(() => {
    getRank();
  }, [users]);
  useEffect(() => {
    //월, 주, 일 기준값이 변했을때 랭킹리스트 갱신
    getRank();
  }, [rankingBefore]);

  const Item = ({data}) => {
    //flat list의 Item
    return (
      <View style={styles.item}>
        <Text>총 {data.count}번.</Text>
        <Text style={[styles.email, {color: 'white'}]}>{data.email}</Text>
      </View>
    );
  };
  const resetDate = (when, button) => {
    //button 값은 0,1,2 -> 월, 주, 일
    //기준 날짜에 따라서 랭킹 다시 갱신
    if (!pressed[button]) {
      const pressed_list = [false, false, false]; //안눌린 리스트
      const pressed_color = ['white', 'white', 'white']; //모두 흰색 리스트
      setrainkingBefore(when); //기준 날짜 갱신
      setrankLoading(true); //랭킹 로딩중
      pressed_list[button] = true; //눌린 버튼값 지정
      pressed_color[button] = 'black'; //버튼 색깔 지정
      setPressed(pressed_list);
      setColorArray(pressed_color);
      console.log('****pressed*****', pressed);
    }
  };
  const renderItem = ({item}) => {
    return <Item data={item} />;
  };
  if (rankLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
