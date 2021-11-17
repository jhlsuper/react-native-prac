import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export function setDates(userEmail, dateNCount) {
  firestore()
    .collection('users')
    .doc(userEmail)

    .update({
      data: firestore.FieldValue.arrayUnion(dateNCount),
    });
}

export function delDates(userEmail, dateNCount) {
  firestore()
    .collection('users')
    .doc(userEmail)
    .update({
      data: firestore.FieldValue.arrayRemove(dateNCount),
    });
}

export function newUser(userEmail) {
  firestore().collection('users').doc(userEmail);
}

export let todayLong = new Date();
export let today =
  todayLong.getFullYear() +
  '-' +
  parseInt(todayLong.getMonth() + 1) +
  '-' +
  todayLong.getDate();
export let nextDay = moment(todayLong).add(1, 'day').format('YYYY-MM-DD');
