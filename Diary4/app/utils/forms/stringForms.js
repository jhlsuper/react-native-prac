export function addComma(num) {
  console.log('addComma', num);
  if (num != undefined) {
    let regExp = /\B(?=(\d{3})+(?!\d))/g; //쉼표를 3자리수마다 찍어주는 정규표현식
    return num.toString().replace(regExp, ',');
  } else {
    return num;
  }
}

export function formatDate() {
  //오늘 값과  어제 저장  2021124 와같은 형식
  let todayDate = new Date();
  let today = calculateDate(todayDate);

  let yesterdayDate = new Date(Date.now() - 86400000); //현재에서 24시간전 의 시간
  let yesterday = calculateDate(yesterdayDate);
  let dateData = {today: today, yesterday: yesterday};
  return dateData;
}
function calculateDate(date) {
  //date값을 20211124와 같은 형식으로 만듦.
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString(); //결과가 0~11이라
  let day = date.getDate().toString();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  let finalDate = `${year}${month}${day}`;
  return finalDate;
}
