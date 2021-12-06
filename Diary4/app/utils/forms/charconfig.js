const chartConfig = {
  //차트 설정값
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(128,128,128,${opacity})`, //차트 색깔
  labelColor: (opacity = 1) => 'green', //달력 월 -색깔

  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default chartConfig;
