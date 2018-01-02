import { createStore } from 'smitty'
import { assocPath, dissocPath, path, not, compose } from 'ramda'
import actions from './actions'

const initialState = {
  ui: {
    theme: 'standard',
    showMobileNav: false,
    isScrolled: false,
    currentTab: 'register'
  },
  api: {},
  notifications: {}
}

const store = createStore(initialState)

store.createActions(actions)

const togglePath = (slicePath, state) =>
  assocPath(slicePath, compose(not, path(slicePath))(state))(state)

/* eslint no-console: 0, no-unused-vars: 0 */
const log = (type, e, state) => {
  console.group('%c action type', 'color: gray; font-weight: lighter;', type)
  console.log('%c data', 'color: #9E9E9E; font-weight: bold;', e)
  console.log('%c state', 'color: #03A9F4; font-weight: bold;', state)
  console.groupEnd()
}

store.handleActions({
  [store.actions.toggleMobileNav]: state =>
    togglePath(['ui', 'showMobileNav'], state),
  [store.actions.setIsScrolled]: (state, isScrolled) =>
    assocPath(['ui', 'isScrolled'], isScrolled, state),
  [store.actions.apiStart]: (state, { key }) =>
    assocPath(['api', key], { status: 'started' }, state),
  [store.actions.apiFinish]: (state, { key, status, data, error }) =>
    assocPath(['api', key], { status, data, error }, state),
  [store.actions.resetApi]: (state, { key }) =>
    dissocPath(['api', key, 'status'], state),
  [store.actions.notify]: (state, { key }) =>
    assocPath(['notifications', key], true, state),
  [store.actions.closeNotification]: (state, { key }) =>
    dissocPath(['notifications', key], state),
  [store.actions.changeTab]: (state, tab) =>
    assocPath(['ui', 'currentTab'], tab, state),
  [store.actions.changeTheme]: (state, theme) =>
    assocPath(['ui', 'theme'], theme, state),
  '*': (state, e, type) => {
    // for dev purposes
    //log(type, e, state)
    return state
  }
})

export default store
