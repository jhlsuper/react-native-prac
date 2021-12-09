import firestore from '@react-native-firebase/firestore';
import _, {size, times} from 'lodash';
import moment from 'moment';
import {today, nextDay, weekBefore, monthBefore} from '../utils/dates';
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
//서버에 프로필사진 저장
export function setProfileImage(userEmail, uri) {
  firestore().collection('users').doc(userEmail).update({profileImage: uri});
}
//서버에 프로필사진 가져오기
export const getUserProfileImage = async (email, setUri) => {
  try {
    firestore()
      .collection('users')
      .doc(email)
      .get()
      .then(querySnapshot => {
        const {profileImage} = querySnapshot.data();
        console.log(profileImage);
        setUri(profileImage);
      });
  } catch (e) {
    console.log(e);
  }
};

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
export const getStatisticsData = async (
  email,
  setTotalTime,
  setUserData,
  setMostRecent,
  loading,
  setLoading,
) => {
  console.log('aaaa', email);
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
        setTotalTime(temp);
        setUserData(list);
        // setTotalTime(temp); //총 집중 횟수 저장
        // setUserData(list); //날짜, 집중횟수 data저장
        const lastFocusCount = list[list.length - 1].count;
        if (lastFocusCount != 0) {
          setMostRecent(list[list.length - 1].date);
          // setMostRecent(list[list.length - 1].date); //가장최근 공부한 날 저장
        } else {
          setMostRecent('아직 없습니다');
          // setMostRecent('아직 없습니다');
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
/// 랭킹용 유저 목록 받아와서 저장
export async function getUsers(settotalUser, setUsers, setLoading) {
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
export const getRank = async (
  rankLoading,
  users,
  setrankingArray,
  setrankLoading,
  rankingBefore,
  totalUser,
) => {
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

// export let todayLong = new Date();
// export let today =
//   todayLong.getFullYear() +
//   '-' +
//   parseInt(todayLong.getMonth() + 1) +
//   '-' +
//   todayLong.getDate();
// export let nextDay = moment(todayLong).add(1, 'day').format('YYYY-MM-DD');

// export let weekBefore = moment(todayLong).add(-7, 'day').format('YYYY-MM-DD');
// export let monthBefore = moment(todayLong).add(-1, 'M').format('YYYY-MM-DD');
