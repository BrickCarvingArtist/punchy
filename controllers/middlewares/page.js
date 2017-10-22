import {resolve} from "path";
import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {matchRoutes} from "react-router-config";
import {readFile, error} from "../../utils";
import reducers from "../../front/reducers";
import App, {routes} from "../../front/App";
/**
 * fetch data from routes' fetchData config
 * @param {Object} store the redux store
 * @param {String} path the request path
 * @returns {Promise} request promises of pages' requirements from the path
 */
const fetchBranchData = (store, path) => {
	const branch = matchRoutes(routes, path);
	const promises = branch.map(({route, match}) => {
		if(route.fetchData){
			return route.fetchData(store, match);
		}
		return Promise.resolve();
	});
	return Promise.all(promises);
};
const store = createStore(combineReducers({
	...reducers,
	router: routerReducer
}));
const pageCss = [
	"/punchy/index.css"
].map(item => `<link rel="stylesheet" href="${item}" />`).join("");
const pageJs = [
	"/punchy/dependencies.js",
	"/punchy/index.js"
].map(item => `<script src="${item}"></script>`).join("");
/**
 * the page renderer middleware uses react-server-render
 * @returns {undefined}
 */
export default () => async (ctx, next) => {
	const {path} = ctx;
	try{
		await fetchBranchData(store, path);
	}catch(e){}
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={path} context={{}}>
				<App />
			</StaticRouter>
		</Provider>
	);
	const {title} = store.getState().core;
	try{
		ctx.body = (await readFile(resolve(__dirname, "../../views/template.html"), "utf-8"))
			.replace(/<link rel="stylesheet" \/>/, pageCss)
			.replace(/(<title>)(<\/title>)/, `$1${title}$2`)
			.replace(/(<div id="app">)(<\/div>)/, `$1${html}$2${pageJs}`);
	}catch(e){
		ctx.body = error({
			code: 5009900000,
			ctx,
			e
		});
	}
	next();
};