// src/reducers/index.js
import { combineReducers } from 'redux'
import authReducer from './authReducer'
// 导入其他reducer...

const rootReducer = combineReducers({
  auth: authReducer,
  // 其他reducer...
})

export default rootReducer