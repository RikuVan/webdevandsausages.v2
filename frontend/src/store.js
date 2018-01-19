import {createStore} from 'smitty'
import R from './helpers'
import actions from './actions'

const initialState = {
  ui: {
    theme: 'reverse',
    showMobileNav: false,
    isScrolled: false,
    showSidebar: false,
    isSideClosed: true
  },
  api: {},
  notifications: {},
  popup: null,
  auth: {
    name: null,
    user: null,
    pass: null,
    bySms: false,
    admin: false
  }
}

const store = createStore(initialState)

store.createActions(actions)

const togglePath = (slicePath, state) =>
  R.assocPath(slicePath, R.compose(R.not, R.path(slicePath))(state))(state)

/* eslint no-console: 0, no-unused-vars: 0, arrow-body-style: 0 */
const log = (type, e, state) => {
  console.group('%c action type', 'color: gray; font-weight: lighter;', type)
  console.log('%c data', 'color: #9E9E9E; font-weight: bold;', e)
  console.log('%c state', 'color: #03A9F4; font-weight: bold;', state)
  console.groupEnd()
}

store.handleActions({
  [store.actions.toggleMobileNav]: state =>
    togglePath(['ui', 'showMobileNav'], state),
  [store.actions.toggleSidebar]: state =>
    togglePath(['ui', 'showSidebar'], state),
  [store.actions.setIsScrolled]: (state, isScrolled) =>
    R.assocPath(['ui', 'isScrolled'], isScrolled, state),
  [store.actions.apiStart]: (state, {key}) =>
    R.assocPath(['api', key], {status: 'started'}, state),
  [store.actions.apiFinish]: (state, {key, status, data, error}) =>
    R.assocPath(['api', key], {status, data, error}, state),
  [store.actions.resetApi]: (state, {key}) =>
    R.dissocPath(['api', key, 'status'], state),
  [store.actions.notify]: (state, {key}) =>
    R.compose(
      R.assocPath(['popup'], key),
      R.assocPath(['notifications', key], true)
    )(state),
  [store.actions.closePopupNotification]: (state, {key}) =>
    R.assoc('popup', null, state),
  [store.actions.closeNotification]: (state, {key}) =>
    R.dissocPath(['notifications', key], state),
  [store.actions.changeTheme]: (state, theme) =>
    R.assocPath(['ui', 'theme'], theme, state),
  [store.actions.setAuth]: (state, data) =>
    R.assocPath(['auth'], R.merge(R.prop('auth', state), data), state),
  '*': (state, e, type) => {
    // for dev purposes
    log(type, e, state)
    return state
  }
})

export default store
