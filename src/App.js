import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import {AppNavigator} from './ReduxAppNavigation'

const store = configureStore()

const ReduxApp = () => (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
)
export default ReduxApp