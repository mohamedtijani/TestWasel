import React, { PureComponent } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


import RootNavigator from './AppNavigator';


const middleware = createReactNavigationReduxMiddleware(
		'root',
		state => state.nav
);


const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
	state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);


export { RootNavigator, AppNavigator, middleware };
