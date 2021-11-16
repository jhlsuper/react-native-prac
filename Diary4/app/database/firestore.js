import firestore from '@react-native-firebase/firestore';
export default fetchData = async () => {
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
  return list;
};
