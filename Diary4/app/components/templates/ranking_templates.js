import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {monthBefore, getUsers, getRank} from '../../database/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleText from '../molecules/titleText';
import DateBeforeButtonArray from '../organisms/dateBeforeButtonArray';
import styles_templates from './styles_templates';
import RankFlatList from '../organisms/rankFlatList';
import LoadingIndicator from '../molecules/loadingIndicator';
import {BLACK, USER_RANKING, WHITE} from '../../i18n/msg';
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
  const [colorArray, setColorArray] = useState([BLACK, WHITE, WHITE]); //랭킹 날짜 기준 버튼 색깔

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

  const resetDate = (when, button) => {
    //이건 어디에 위치해야할까?
    //button 값은 0,1,2 -> 월, 주, 일
    //기준 날짜에 따라서 랭킹 다시 갱신
    if (!pressed[button]) {
      const pressed_list = [false, false, false]; //안눌린 리스트
      const pressed_color = [WHITE, WHITE, WHITE]; //모두 흰색 리스트
      setrainkingBefore(when); //기준 날짜 갱신
      setrankLoading(true); //랭킹 로딩중
      pressed_list[button] = true; //눌린 버튼값 지정
      pressed_color[button] = BLACK; //버튼 색깔 지정
      setPressed(pressed_list);
      setColorArray(pressed_color);
      console.log('****pressed*****', pressed);
    }
  };

  if (rankLoading) {
    return <LoadingIndicator />;
  }
  return (
    <SafeAreaView style={styles_templates.container}>
      <TitleText title={USER_RANKING} />
      <View style={styles_templates.topContainer}>
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
        </View>
      </View>
      <View style={styles_templates.rankginContainer}>
        <RankFlatList rankingArray={rankingArray} />
      </View>
    </SafeAreaView>
  );
};

export default RankingTemplates;
