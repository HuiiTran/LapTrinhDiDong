
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey              :   'AIzaSyAe-FMgjlAJjcTRYTTzJfON11XaQkgAgnI',
  authDomain          :   '',
  projectId           :   'todoapp-62037',
  storageBucket       :   'todoapp-62037.appspot.com',
  messagingSenderId   :   '89458535532',
  appId               :   '1:597211205725:android:a6f6c42bc0d2fe86a6fdb4',

}

// Initialize Firebase
const app = initializeApp( firebaseConfig )

export const dbFS = getFirestore( app )
