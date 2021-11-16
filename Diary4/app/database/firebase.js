import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyByCuAYav-Mx94iSOWHXkSPbAUT1TaUSHk',
  authDomain: 'tenmin-398be.firebaseapp.com',
  projectId: 'tenmin-398be',
  storageBucket: 'tenmin-398be.appspot.com',
  messagingSenderId: '646047715818',
  appId: '1:646047715818:web:c9af6980f90b389aac2293',
  measurementId: 'G-R72571BTSC',
};

firebase.initializeApp(firebaseConfig);

const fetchData = async () => {
  try {
    const list = [];
    firestore()
      .collection('users')
      .doc('4GsKgwJ4cFykV1CDd58V')
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data());
        const {data, userEmail} = querySnapshot.data();
        list.push(data);

        setUserData(list);
        if (loading) {
          setLoading(false);
        }
      });
  } catch (e) {
    console.log(e);
  }
};

export default firebase;
