import React from "react";
import {hydrate} from "react-dom";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {ConnectedRouter, routerReducer, routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import reducers from "./reducers";
import App from "./App";
import "./styles";
const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers({
	...reducers,
	router: routerReducer
}), JSON.parse(localStorage.ik_punchy || "{}"), applyMiddleware(middleware));
store.subscribe(() => {
	const states = store.getState();
	localStorage.ik_punchy = JSON.stringify(states);
	console.log(states);
});
hydrate(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);