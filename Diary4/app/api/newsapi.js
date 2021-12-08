import axios from 'axios';
import {formatDate} from '../utils/forms/stringForms';
export const requestCovidData = makeCovidData => {
  let today = formatDate().today;
  let yesterday = formatDate().yesterday;
  const requestCovid = axios({
    //모듈화 필요
    //COVID 19공공 api get
    method: 'GET',
    url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=0C5aP5Fobx5FMuWckWfHEm78jK4lX7%2BYV%2F%2FfAObXYmqJMd2n6DyvlExAb1vZmGgmc6JJpxPOIcjBkIBrrBJVsA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`,
  })
    .then(response => {
      makeCovidData(response.data);
      console.log('aaa', response.data);
    })
    .catch(e => console.log(e));
};

export const requestDustData = makeDustData => {
  const fineDust = ['PM10', 'PM25', 'NO2'];
  for (const item of fineDust) {
    const requestDust = axios({
      //미세먼지 공공 api get
      method: 'GET',
      url: `http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?itemCode=${item}&dataGubun=HOUR&pageNo=1&numOfRows=100&returnType=json&serviceKey=0C5aP5Fobx5FMuWckWfHEm78jK4lX7%2BYV%2F%2FfAObXYmqJMd2n6DyvlExAb1vZmGgmc6JJpxPOIcjBkIBrrBJVsA%3D%3D`,
    }).then(response => {
      makeDustData(item, response.data);
    });
  }
};
