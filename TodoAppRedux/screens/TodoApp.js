
import * as React from 'react'
import { Text, View, StyleSheet, FlatList, Modal, Pressable, Alert, Platform, ScrollView, Keyboard } from 'react-native'
import Constants from 'expo-constants'

// You can import from local files
import Spacer from '../components/Spacer'
import ButtonIcon from '../components/ButtonIcon'

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper'
import { FontAwesome as Icon } from '@expo/vector-icons'

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux'
import { addTodo, deleteTodo, updateTodo } from '../redux/actions'

// // Import Firebase / Firestore
import { dbFS } from '../firebase/firebaseConfig'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'



const TodoApp = ( { todo_list, addTodo, deleteTodo, updateTodo } ) => { 

  const [data, setData] = React.useState( [] )

  React.useEffect(  () => { 

    const dbCollection = collection( dbFS, 'todo-apps' )
    const unsubscribe = onSnapshot( dbCollection, ( snapshot ) => { 

      const newData = []
      snapshot.forEach( ( doc ) => { 

        newData.push( { 

          id: doc.id,
          ...doc.data (),

       } )

     } )
      console.log( 'DATA : ', newData )

      setData( newData )

   } )

    return  () => { 

      unsubscribe ()

   }

 }, [] )


  // FIREBASE FUNTIONS ****************************************************************
  const [post, setPost] = React.useState( { status: '', titleTodo: '', taskTodo: '' } )
  const [modalUpdateVisible, setModalUpdateVisible] = React.useState( false )
  const [modalAddVisible, setModalAddVisible] = React.useState( false )
  function newTodo () { 

    const todoDB = collection( dbFS, 'todo-apps' )

    addDoc( todoDB, { 

      statusTodo: 'Due',
      titleTodo: post.titleTodo,
      taskTodo: post.taskTodo,


   } ).then(  () => { 

      setPost( { status: '', titleTodo: '', taskTodo: '' } )

   } )
    setModalAddVisible(false)
    Keyboard.dismiss ()

 }

  const handleStatusChange = async ( id, stat ) => { 

    console.log( 'Status changed:', id, stat )

    if ( stat === 'Late' || stat === 'Done' ) { 

      try { 

        await updateDoc( doc( dbFS, 'todo-apps', id ), { 

          statusTodo: stat,

       } )

        setModalUpdateVisible( false )

     } catch ( error ) { 

        console.error( 'Error updating status:', error )

     }
   }
 }


  const handleupdateTodo = async ( id ) => { 

    // Fetch updated title and task from the selectedItem state
    const { titleTodo, taskTodo } = selectedItem

    try { 

      // Update todo item in Firebase
      await updateDoc( doc( dbFS, 'todo-apps', id ), { 

        titleTodo,
        taskTodo,

     } )

      setModalUpdateVisible( false ) // Close the modal after successful update

   } catch ( error ) { 

      // Handle error
      console.error( 'Error updating todo item:', error )

   }

 }

  const handleDeleteTodo = ( id ) => { 

    const deleteRef = doc( dbFS, 'todo-apps', id )
    console.log( 'FOR DELETION :', deleteRef )

    Alert.alert( 'Remove Todo', 'This action will permanently delete this task. This action cannot be undone!', [
      { 

        text: 'Confirm',
        onPress: async  () => { 

          try { 

            await deleteDoc( deleteRef )

         }
          catch ( error ) { 

            console.log( 'Error in deleteing : ', error )

         }
       }
     },
      { text: 'Cancel' }
    ] )


 }

  // Separation state text input variables for modal
  const [modalTask, setModalTask] = React.useState( '' )
  const [modalTitle, setModalTitle] = React.useState( '' )
  const [selectedItem, setSelectedItem] = React.useState( null )
  const openModal = ( item ) => { 

    setSelectedItem( item )
    setModalTask( item.task )
    setModalTitle( item.title )

    setModalUpdateVisible( true )

 }

  const CustomIcon = ( { name, size, color, label } ) => { 

    return ( 
      <View style={ { flexDirection: 'column', alignItems: 'center' } }>
        <Icon name={ name } size={ size } color={ color } />
        <Text style={ { marginLeft: 2 } }>{ label }</Text>
      </View>
     )

 }



  return ( 

    <View style={ styles.container } >
      <Card title="Card Title">
        
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
        <Button onPress={ () => setModalAddVisible( true ) } >+ Add new Todo</Button>
        </Card.Content>
      </Card>
      <Spacer />

      <ScrollView>
        { data.map( ( item ) => { 
          const status = item.statusTodo[item.id] || item.statusTodo
          const cardBG = status === 'Late' ? 'lightcoral' : status === 'Done' ? '#8FBC8F' : 'white'
          const iconColor = status === 'Late' ? 'white' : status === 'Done' ? 'white' : 'gray'
          const cardTitle = <Text style={ { color: 'gray' } }>{ item.titleTodo || '[ No Title ]' }</Text>

          return ( 
            <Pressable key={ item.id } onPress={ () => openModal( item ) }>
              <Card style={ { backgroundColor: cardBG } }>
                <Card.Title title={ item.titleTodo || cardTitle } left={ ( props ) => ( 
                  <CustomIcon name="sticky-note" size={ 25 } color={ iconColor } label={ status } />
                 ) }
                  right={ ( props ) => ( <ButtonIcon iconName="close" color="red" onPress={ () => handleDeleteTodo( item.id ) } /> ) }
                />
                <Card.Content>
                  <Paragraph>{ item.taskTodo }</Paragraph>
                  <Paragraph style={ { marginTop: 10, color: 'gray', fontSize: 12 } }>
                    Tap to edit
                  </Paragraph>
                </Card.Content>
              </Card>
              <View style={ { height: 8 } } />
            </Pressable>
           )
       } ) }
      </ScrollView>
       

      { /* Modal for updating tasks */ }
      <Modal animationType="fade" transparent={ true } visible={ modalUpdateVisible } onRequestClose={ () => setModalUpdateVisible( false ) } >
        { selectedItem && ( 
          <View style={ styles.modalContainer }>
            <View style={ styles.modalContent }>
              { /*TITLE INPUT */ }
              <TextInput label={ `ToDo Title : ` } value={ selectedItem.titleTodo } onChangeText={ ( title ) => setSelectedItem( { ...selectedItem, titleTodo: title } ) } />
              <View style={ { height: 8 } } />
              { /*TASK INPUT */ }
              <TextInput label={ `ToDo Task : ` } value={ selectedItem.taskTodo } onChangeText={ ( task ) => setSelectedItem( { ...selectedItem, taskTodo: task } ) } />
              <Spacer />
              <View>
                <Text>Update Status :</Text>
                <View style={ { height: 8 } } />
                <View style={ { flexDirection: 'row', columnGap: 13 } } >
                  { /*BUTTON FUNCTION*/ }
                  <Button style={ [styles.btnStyleStatus, { backgroundColor: 'lightcoral' }] } onPress={ () => handleStatusChange( selectedItem.id, 'Late' ) } >
                    <Text style={ { color: 'white', fontWeight: 'bold' } } >
                      Late
                    </Text>
                  </Button>
                  <Button style={ [styles.btnStyleStatus, { backgroundColor: '#8FBC8F' }] } onPress={ () => handleStatusChange( selectedItem.id, 'Done' ) } >
                    <Text style={ { color: 'white', fontWeight: 'bold' } } >
                      Done
                    </Text>
                  </Button>
                </View>
                <View style={ { height: 8 } } />
                <Button style={ { backgroundColor: '#3F7CAC' } } onPress={ () => handleupdateTodo( selectedItem.id ) } >
                  <Text style={ { color: 'white', fontWeight: 'bold' } } >
                    Update
                  </Text>
                </Button>
              </View>
              <Spacer />
              <View>
                <Spacer />
                <Button mode="outlined" onPress={ () => setModalUpdateVisible( false ) } >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
         ) }
      </Modal>
      <Modal animationType="fade"  visible={ modalAddVisible } onRequestClose={ () => setModalAddVisible( false ) } >
        <Title>Add ToDo Here</Title>
            <View style={ { height: 8} }/>
            <TextInput mode="outlined" label="Task" value={ post.taskTodo } onChangeText={ ( task ) => setPost( { ...post, taskTodo: task } ) } />
            { post.taskTodo.trim () !== '' && <View style={ { height: 8 } } /> }
            { post.taskTodo.trim () !== '' && ( <TextInput mode="outlined" label="Title Task" value={ post.titleTodo } onChangeText={ ( title ) => setPost( { ...post, titleTodo: title } ) } /> ) }
            { post.taskTodo.trim () !== '' && <View style={ { height: 16 } } /> }
            { post.taskTodo.trim () !== '' && ( <Button mode="contained" onPress={ newTodo } >Add Task</Button> ) }
            <Button style={{marginTop: '5%', backgroundColor: 'rgba(52, 52, 52, 0.3)'}} onPress={ () => setModalAddVisible( false ) }>Cancel</Button>
       </Modal>
    </View>
   )
 }

const styles = StyleSheet.create( { 
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
  btnStyleStatus: { 
    ...Platform.select( { 
      ios: { 
        width: 168,
     },
      android: { 
        width: 185,
        justifyContent: 'center',
     }
   } )
 },
  modalContainer: { 
    flex: 1,
    backgroundColor: 'rgba( 118, 118, 118, .80 )',
    justifyContent: 'center',
 },
  modalContent: { 
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
 },
 } )

const mapStateToProps = ( state, ownProps ) => { 
  return { 
    todo_list: state.todos.todo_list,
 }
 }

const mapDispatchToProps = { addTodo, deleteTodo, updateTodo }

export default connect( mapStateToProps, mapDispatchToProps )( TodoApp )
