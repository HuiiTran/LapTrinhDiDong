

import { collection, getDocs } from 'firebase/firestore'
import { dbFS } from './firebaseConfig'

export async function load() {

    try {

      const dataLoad = []
      const dbCollection = collection(dbFS, 'todo-apps')
      const querySnapshot = await getDocs(dbCollection)
  
      querySnapshot.forEach( ( doc ) => {

        const post = {
        
          ...doc.data(),
          id: doc.id
        
        }
        
        dataLoad.push( post )
      })
  
      return dataLoad
    
    } catch ( error ) {

      console.error( 'Error loading data:', error )
      return null // Return null in case of an error
    
    }
  }

  