import React from 'react'
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import {AppNavigator} from './ReduxAppNavigation'

const store = configureStore()

const ReduxApp = () => (
		<Provider store={store}>
			<PaperProvider>
				<AppNavigator/>
			</PaperProvider>
		</Provider>
)
export default ReduxApp