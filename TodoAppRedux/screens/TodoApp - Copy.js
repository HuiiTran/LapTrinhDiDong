
import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Modal, Pressable, Alert, Platform } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../redux/actions';


const TodoApp = ({ todo_list, addTodo, deleteTodo, updateTodo }) => {
  
  const [task, setTask] = React.useState('');
  const [title, setTitle] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalUpdateVisible, setModalUpdateVisible] = React.useState(false)

  const [selectedTaskId, setSelectedTaskId] = React.useState(null)

  const handleAddTodo = () => {

    if (task.trim() != '') {

      addTodo(task, title)
      setTask('')
      setTitle('')
      setModalVisible(false)

    }

  }

  const doneTodo = () => {
    
    console.log( 'DONE!' )
    setModalUpdateVisible( false )

  }

  const handleupdateTodo = () => {
    
    // updateTodo( id )
    updateTodo(title, task, new Date().toISOString())
    console.log( title )
    console.log( task )

    setModalUpdateVisible( false )

  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }  

  const status = 'Due'

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>

          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer />

          {task.trim() !== '' && (
            // <Button mode="contained" onPress={handleAddTodo}>
            <Button mode="contained" onPress={() => setModalVisible(true)} >
              Add Title
            </Button>
          )}

        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <Pressable onPress={() => {
                console.log("Selected Task ID:", item.id)
                setSelectedTaskId(item.id)
                setModalUpdateVisible(true)
              }}>
                <Card>
                  <Card.Title
                    // <Card style={{ backgroundColor : 'green'}}>
                    title={`${item.title}`}
                    subtitle={`Status : ${status}`}

                    left={(props) => <Icon name="sticky-note" size={24} color="green" />}
                    right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
                  />
                  <Card.Content>
                    <Paragraph>{item.task}</Paragraph>
                    <Paragraph style={{ marginTop: 10, color: 'gray', fontSize: 12 }}>Tap to edit</Paragraph>
                  </Card.Content>
                </Card>
              </Pressable>
              <Spacer />
            </>
          );
        }}
      />
      <Spacer />

      {/* Modal for adding tasks */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              mode="outlined"
              label="Title Task"
              value={title}
              onChangeText={title => setTitle(title)} />
            <Spacer />
            <Button mode="contained" onPress={handleAddTodo}>
              Add Task
            </Button>
            <Spacer />
            <Spacer />
            <Button mode="outlined" onPress={() => setModalVisible(false)}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      {/* Modal for updating tasks */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalUpdateVisible}
        onRequestClose={() => setModalUpdateVisible(false)} >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Update Task :</Text>
            <Spacer />
            <TextInput
              mode="outlined"
              label={`ToDo Title : `}
              // value={title}
              value={ title || ( selectedTaskId ? todo_list.find( item => item.id === selectedTaskId ).title : '' ) }
              onChangeText={ title => setTitle( title ) } />
              <Spacer />
            <TextInput
              mode="outlined"
              label={`ToDo Task : `}
              // value={task}
              value={ task || ( selectedTaskId ? todo_list.find( item => item.id === selectedTaskId ).task : '' ) }
              onChangeText={task => setTask(task)} />
            <Spacer />
            <Button mode="contained" onPress={ () => handleupdateTodo() } >
              Update Task
            </Button>
            <Spacer />
            <Button style={ { backgroundColor : 'green' } } mode="contained" onPress={ doneTodo } >
              Done!
            </Button>
            <Spacer />
            <Button mode="outlined" onPress={() => setModalUpdateVisible(false)}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // cardColor : {
  //   backgroundColor : '#24562b',
  //   border : '#24562b',
  // }
  modalContainer: {

    flex: 1,
    // backgroundColor : 'black',
    backgroundColor: 'rgba(118, 118, 118, .80)',
    justifyContent: 'center',

  },
  modalContent: {

    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,

  }

});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo, updateTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
