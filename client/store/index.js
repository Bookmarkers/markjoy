import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import bookmarksReducer from './bookmark'
import goalsReducer from './goal'
import goalReducer from './singleGoal'
import blockedReducer from './blocked'

const reducer = combineReducers({
  user,
  bookmarks: bookmarksReducer,
  goals: goalsReducer,
  goal: goalReducer,
  blocked: blockedReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
