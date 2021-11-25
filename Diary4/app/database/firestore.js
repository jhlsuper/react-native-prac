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
  //유저 생성시 db에 userEmail등록
  console.log('썡성됨ㅁ?');
  firestore()
    .collection('users')
    .doc(userEmail)
    .set({data: []}, {email: userEmail});
}
export function createUser2(userEmail) {
  //유저 생성시 db에 userEmail등록
  console.log('썡성됨ㅁ?');
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
      console.log('whole data', data);
      // console.log('data', data[data.length - 1]['count']);
      console.log('data', data[data.length - 1]);
      // fun(parseInt(data[data.length - 1]['count']));
      if (data[data.length - 1]['date'] == today) {
        fun(parseInt(data[data.length - 1]['count']));
      }
      data.forEach(item => {
        // console.log('data items', item);
      });
      // console.log('userData', userData);
    });
}
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
