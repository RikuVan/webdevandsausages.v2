import { createStore } from 'smitty'
import { assocPath, path, not, compose, merge } from 'ramda'
import actions from './actions'

const initialState = {
  ui: {
    showMobileNav: false,
    isScrolled: false
  },
  api: {}
}

const store = createStore(initialState)

store.createActions(actions)

const togglePath = (slicePath, state) =>
  assocPath(slicePath, compose(not, path(slicePath))(state))(state)

store.handleActions({
  [store.actions.toggleMobileNav]: state =>
    togglePath(['ui', 'showMobileNav'], state),
  [store.actions.setIsScrolled]: (state, isScrolled) =>
    assocPath(['ui', 'isScrolled'], isScrolled, state),
  [store.actions.apiStart]: (state, { key }) =>
    assocPath(['api', key], { status: 'started' }, state),
  [store.actions.apiFinish]: (state, { key, status, payload, error }) =>
    assocPath(['api', key], { status, payload, error }, state),
  '*': (state, e, type) => {
    console.log('CURRENT STATE: ', state, 'ACTION: ', type)
    return state
  }
})

export default store
