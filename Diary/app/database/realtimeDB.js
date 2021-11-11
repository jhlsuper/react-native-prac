import {firebase} from '@react-native-firebase/database';

const reference = database().ref('/users/123');

const database = firebase
  .app()
  .database('https://tenmin-398be-default-rtdb.firebaseio.com/')
  .ref('/users/123');
