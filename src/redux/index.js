import user from './user'
import counter from './counter'
import { combineReducers } from 'redux'

export default combineReducers({
    user,
    counter
})