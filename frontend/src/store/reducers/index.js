import { combineReducers } from 'redux';
import { eventReducer } from './eventReducer';
import { userReducer } from './userReducer'
// import { systemReducer } from './systemReducer'

export const rootReducer = combineReducers({
  eventModule: eventReducer,
  userModule:userReducer
});
