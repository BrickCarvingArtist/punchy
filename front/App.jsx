import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Dialog from "./components/Dialog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/article";
import Discovery from "./pages/Discovery";
import Me from "./pages/Me";
import Setting from "./pages/setting";
import {setUser} from "./actions";
import {setCategory} from "./actions/article";
import {RouteWithSubRoutes} from "./utils";
export const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/article",
		component: Article
	},
	{
		path: "/discovery",
		component: Discovery
	},
	{
		path: "/me",
		component: Me
	},
	{
		path: "/setting",
		component: Setting
	}
];
@withRouter
@connect()
export default class App extends Component{
	async componentWillMount(){
		dispatch(await setUser());
		dispatch(await setCategory());
	}
	render(){
		return (
			<main>
				<Header />
				{
					routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
				}
				<Footer />
				<Dialog />
			</main>
		);
	}
}