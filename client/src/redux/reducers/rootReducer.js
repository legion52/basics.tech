import { combineReducers } from 'redux';
import { accountsReducer } from './accountsReducer';
// import { todosReducer } from './todosReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
})
