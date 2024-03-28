/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
type University = {
  alpha_two_code: string;
  web_pages: string;
  name: string;
  domains: string;
  country: string;
};
function App() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<University[]>([]);
  const [searchCountry, setSearchCountry] = useState('');
  const getUniversities = async () => {
    try {
      const response = await fetch(
        'http://universities.hipolabs.com/search?country=' + `${searchCountry}`,
      );
      const json = await response.json();
      setData(json);
      console.log(searchCountry);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      <TextInput
        style={{borderColor: 'black', borderWidth: 1}}
        onChangeText={newText => setSearchCountry(newText)}
      />
      <Button
        title="Search"
        onPress={() => {
          getUniversities();
          setLoading(true);
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          initialNumToRender={20}
          keyExtractor={({name}) => name}
          renderItem={({item}) => (
            <View
              style={{
                borderColor: 'black',
                borderWidth: 1,
                margin: 5,
                padding: 5,
              }}>
              <Text>{item.name}</Text>
              <Text>{item.web_pages}</Text>
              <Text>{item.domains}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default App;
