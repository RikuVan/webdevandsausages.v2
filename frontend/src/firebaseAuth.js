import firebase from '@firebase/app'
import config from '../../secrets'
import '@firebase/auth'

console.log(firebase)

firebase.initializeApp(config.firebase_client_config)

export const auth = firebase.auth()
