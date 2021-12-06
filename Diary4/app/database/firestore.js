import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export function setDates(userEmail, dateNCount) {
  //날짜 count값 배열에 추가
  firestore()
    .collection('users')
    .doc(userEmail)

    .update({
      data: firestore.FieldValue.arrayUnion(dateNCount),
    });
  console.log('data', dateNCount);
}

export function delDates(userEmail, dateNCount) {
  //해당 날짜와 count값 동일하면 삭제
  firestore()
    .collection('users')
    .doc(userEmail)
    .update({
      data: firestore.FieldValue.arrayRemove(dateNCount),
    });
}

export function createUser(userEmail) {
  //유저 생성시 db에 userEmail document 추가, data 필드 추가
  console.log('생성됨');
  firestore().collection('users').doc(userEmail).set({data: []});
}
export function createUser2(userEmail) {
  //유저 생성시 db에 userEmail 필드 등록
  console.log('email 추가됨');
  firestore().collection('users').doc(userEmail).update({email: userEmail});
}
export function getCount(userEmail, fun) {
  //오늘의 count값 받아서 state에 저장
  firestore()
    .collection('users')
    .doc(userEmail)
    .get()
    .then(querySnapshot => {
      const {data} = querySnapshot.data();
      // console.log('whole data', data);

      // console.log('data', data[data.length - 1]);

      if (data[data.length - 1]['date'] == today) {
        fun(parseInt(data[data.length - 1]['count']));
      }
      data.forEach(item => {
        // console.log('data items', item);
      });
      // console.log('userData', userData);
    });
}
//통계 데이터 받아오기
export const getStatisticsData = async props => {
  try {
    const list = [];
    let temp = 0;
    firestore()
      .collection('users')
      .doc(email)
      .get()
      .then(querySnapshot => {
        const {data} = querySnapshot.data();
        data.forEach(item => {
          console.log('item', item);
          temp += item.count; //총 집중시간 계산
          list.push({date: item.date, count: item.count});
        });
        console.log('list', list);
        console.log(temp);
        setTotalTime(temp); //총 집중 횟수 저장
        setUserData(list); //날짜, 집중횟수 data저장
        const lastFocusCount = list[list.length - 1].count;
        if (lastFocusCount != 0) {
          setMostRecent(list[list.length - 1].date); //가장최근 공부한 날 저장
        } else {
          setMostRecent('아직 없습니다');
        }
        // console.log('userData', userData);
      });
    if (loading) {
      setLoading(false);
    }
  } catch (e) {
    console.log(e);
  }
};

export let todayLong = new Date();
export let today =
  todayLong.getFullYear() +
  '-' +
  parseInt(todayLong.getMonth() + 1) +
  '-' +
  todayLong.getDate();
export let nextDay = moment(todayLong).add(1, 'day').format('YYYY-MM-DD');

export let weekBefore = moment(todayLong).add(-7, 'day').format('YYYY-MM-DD');
export let monthBefore = moment(todayLong).add(-1, 'M').format('YYYY-MM-DD');
