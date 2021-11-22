import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export function setDates(userEmail, dateNCount) {
  firestore()
    .collection('users')
    .doc(userEmail)

    .update({
      data: firestore.FieldValue.arrayUnion(dateNCount),
    });
  console.log('data', dateNCount);
}

export function delDates(userEmail, dateNCount) {
  firestore()
    .collection('users')
    .doc(userEmail)
    .update({
      data: firestore.FieldValue.arrayRemove(dateNCount),
    });
}

export function createUser(userEmail) {
  firestore().collection('users').doc(userEmail).set({data: []});
}

export function getCount(userEmail, fun) {
  firestore()
    .collection('users')
    .doc(userEmail)
    .get()
    .then(querySnapshot => {
      const {data} = querySnapshot.data();
      console.log('data', data[1]['count']);
      fun(parseInt(data[1]['count']));
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
