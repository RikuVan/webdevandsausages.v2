import firebase from 'firebase'
import config from '../../secrets'
/*
  FIXME:
  The following works in development but
  breaks the build. Do we really have to import everything?
  import firebase from '@firebase/app'
   import '@firebase/auth'
 */

firebase.initializeApp(config.firebase_client_config)

export const auth = firebase.auth()
