import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import nav from './nav'

const config = {
  key: 'root',
  storage
}
const rootReducer = persistCombineReducers(config, {
  nav,
})

export default rootReducer
