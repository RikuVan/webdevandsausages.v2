import { createStore } from 'smitty'
import { assocPath, path, not, compose } from 'ramda'

const initialState = {
  ui: {
    showMobileNav: false
  }
}

const store = createStore(initialState)

store.createActions({
  toggleMobileNav: 'nav/MOBILE_TOGGLE'
})

const togglePath = (slicePath, state) =>
  assocPath(slicePath, compose(not, path(slicePath))(state))(state)

store.handleActions({
  [store.actions.toggleMobileNav]: state =>
    togglePath(['ui', 'showMobileNav'], state),
  '*': (state, e, type) => {
    console.log('CURRENT STATE: ', state, 'ACTION: ', type)
    return state
  }
})

export default store
