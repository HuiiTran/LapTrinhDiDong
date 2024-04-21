
import * as React from 'react'
import { Text, View, StyleSheet } from'react-native'
import TodoApp from './screens/TodoApp'

// Import Redux
import store from './redux/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={ store } >
      <TodoApp/>
      <View>
      <Text style={ styles.bottomText } >
      </Text>
      </View>
    </Provider>
    
  )
}

const styles = StyleSheet.create( {

  bottomText: {

    flexDirection:'row',
    alignSelf : 'center',
    paddingBottom:26,
    paddingTop:10,
    color:'gray'
    
 },
})

export default App

