import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RankingTemplates from '../../components/templates/ranking_templates';
export default function RankingComponent() {
  return <RankingTemplates />;
}
