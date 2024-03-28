import React, {Component} from 'react';
import SubjectList from './SubjectList';
import {
  Modal,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

class Login extends Component<{}, {modalVisible: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  render() {
    return (
      <ScrollView style={{marginLeft: '14%'}}>
        <Text style={styles.sectionDescription}>Login</Text>
        <View>
          <Text>User name:</Text>
          <TextInput
            style={styles.inputBox}
            //onChangeText={newText => setWeight(parseFloat(newText))}
          />
        </View>
        <View>
          <Text>Password :</Text>
          <TextInput
            style={styles.inputBox}
            //onChangeText={newText2 => setHeight(parseFloat(newText2))}
          />
        </View>
        <View style={{marginTop: '5%', width: 300}}>
          <Button
            title="Login"
            onPress={() => this.setState({modalVisible: true})}
          />
        </View>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <SubjectList />
          <Button
            title="Exit"
            onPress={() => this.setState({modalVisible: false})}
          />
        </Modal>
      </ScrollView>
    );
  }
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
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Login;
