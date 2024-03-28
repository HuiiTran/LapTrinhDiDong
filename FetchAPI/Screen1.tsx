import React, {Component, useState} from 'react';
import SubjectList from './SubjectList';
import {
  Modal,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import Screen2 from './Screen2';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const data = [
  {id: 'a', value: 'A'},
  {id: 'b', value: 'B'},
  {id: 'c', value: 'C'},
  {id: 'd', value: 'D'},
  {id: 'e', value: 'E'},
  {id: 'f', value: 'F'},
  {id: 'g', value: 'G'},
  {id: 'h', value: 'H'},
  {id: 'i', value: 'I'},
];
const numColumns = 3;

const styles = StyleSheet.create({
  itemContainer: {
    width: 135,
    height: 135,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  },
});

function Screen1(props, {navigation}) {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View
          style={styles.itemContainer}
          onTouchStart={() => navigation.navigate('Screen2')}>
          <Text style={styles.item}>{item.value}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns}
    />
  );
}
export default Screen1;
