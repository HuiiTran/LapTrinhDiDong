/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {
  Modal,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Login from './Login';

function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Login />
        </View>
        <Modal
          animationType="none"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View>
            <Text style={styles.sectionDescription}>Success</Text>
            <Button title="ok" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    alignSelf: 'center',
    marginTop: 8,
    fontSize: 58,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  stretch: {
    alignSelf: 'center',
    marginTop: 10,
    width: 330,
    height: 300,
  },
  inputBox: {
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default App;
