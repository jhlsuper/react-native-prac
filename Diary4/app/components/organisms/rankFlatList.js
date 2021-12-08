import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles_organisms from './styles_organisms';
const RankFlatList = props => {
  const Item = ({data}) => {
    //flat list의 Item
    return (
      <View style={styles_organisms.item}>
        <Text>총 {data.count}번.</Text>
        <Text style={[styles_organisms.email, {color: 'white'}]}>
          {data.email}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return <Item data={item} />;
  };
  return (
    <FlatList
      data={props.rankingArray}
      keyExtractor={item => item.email} //각 요소 구별, 유일
      renderItem={renderItem}
    />
  );
};

export default RankFlatList;
