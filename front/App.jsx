import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, withRouter} from "react-router-dom";
import Dialog from "./components/Dialog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SlideOnBar from "./components/SlideOnBar";
import Home from "./pages/Home";
import Article from "./pages/article";
import Discovery from "./pages/Discovery";
import Me from "./pages/Me";
import User from "./pages/user";
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
	},
	{
		path: "/:id",
		component: User
	},
	{
		path: "/",
		component: () => <div>404</div>
	}
];
@withRouter
@connect()
export default class App extends Component{
	async componentWillMount(){
		const {dispatch} = this.props;
		dispatch(await setUser());
		dispatch(await setCategory());
	}
	render(){
		return (
			<main>
				<Header />
				<Switch>
					{
						routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
					}
				</Switch>
				<Footer />
				<SlideOnBar />
				<Dialog />
			</main>
		);
	}
}