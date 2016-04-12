import React from 'react';
import {Router, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import core from './core.jsx';

// Import reducer.
import reducer from './../reducers/index.js';

// Create application store.
const store = createStore(reducer);

const reactRouter = (
	<Router history={browserHistory}>
			{core}
	</Router>
);

const reduxRouter = (
	<Provider store={store}>
		{reactRouter}
	</Provider>
);

export default reduxRouter;
