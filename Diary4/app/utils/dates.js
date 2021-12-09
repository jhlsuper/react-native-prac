import moment from 'moment';
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
