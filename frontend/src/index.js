import './unregister'
import { h } from 'preact'
import './style'
import './style/fonts/fonts'
import App from './components/app'
import { Provider } from './preact-smitty'
import store from './store'

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppWithStore
