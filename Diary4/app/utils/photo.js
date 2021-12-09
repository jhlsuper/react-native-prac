import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
///프로필 사진 불러오는거 외부 함수 작업 해야됨
export const getPhoto = (email, setUri, setProfileImage) => {
  launchImageLibrary({selectionLimit: 1}, response => {
    //   console.log(response.assets[0].uri);
    if (response == null) {
      console.log('error');
    } else {
      setUri(response.assets[0].uri);
      setProfileImage(email, response.assets[0].uri);
      //   getUserProfileImage(email, setUri);
    }
  });
};
