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
import {
  weekBefore,
  monthBefore,
  today,
  getUsers,
  getRank,
} from '../../database/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TitleText from '../molecules/titleText';
import DateBeforeButton from '../molecules/dateBeforeButton';
import DateBeforeButtonArray from '../organisms/dateBeforeButtonArray';
const RankingTemplates = () => {
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

  useEffect(() => {
    getUsers(settotalUser, setUsers, setLoading);
    console.log('getUser test2');
  }, []);

  useEffect(() => {
    getRank(
      rankLoading,
      users,
      setrankingArray,
      setrankLoading,
      rankingBefore,
      totalUser,
    );
  }, [users]);

  useEffect(() => {
    //월, 주, 일 기준값이 변했을때 랭킹리스트 갱신
    getRank(
      rankLoading,
      users,
      setrankingArray,
      setrankLoading,
      rankingBefore,
      totalUser,
    );
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
      <TitleText title={'유저랭킹'} />
      <View style={styles.topContainer}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}></View>
          <DateBeforeButtonArray
            colorArray={colorArray}
            resetDate={resetDate}
          />
          {/* <View
            style={{
              flex: 1,

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <DateBeforeButton
              text={'월'}
              index={0}
              before={monthBefore}
              resetDate={resetDate}
              colorArray={colorArray}
            />
            <DateBeforeButton
              text={'주'}
              index={1}
              before={weekBefore}
              resetDate={resetDate}
              colorArray={colorArray}
            />
            <DateBeforeButton
              text={'일'}
              index={2}
              before={today}
              resetDate={resetDate}
              colorArray={colorArray}
            />
          </View> */}
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
export default RankingTemplates;
