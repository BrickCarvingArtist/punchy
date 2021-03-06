import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Switch, withRouter} from "react-router-dom";
import Dialog from "./components/Dialog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SlideOnBar from "./components/SlideOnBar";
import Home, {routes as homeRoutes} from "./pages/home";
import Article, {routes as articleRoutes} from "./pages/article";
import Discovery, {routes as discoveryRoutes} from "./pages/discovery";
import Me, {routes as meRoutes} from "./pages/me";
import User, {routes as userRoutes} from "./pages/user";
import Setting, {routes as settingRoutes} from "./pages/setting";
import Other, {routes as otherRoutes} from "./pages/other";
import {setUser} from "./actions";
import {setCategory} from "./actions/article";
import {RouteWithSubRoutes, attachStyles} from "./utils";
export const routes = [
	{
		path: "/",
		exact: true,
		component: Home,
		routes: homeRoutes,
		async fetchData({dispatch}){
			dispatch(await setCategory());
		}
	},
	{
		path: "/article",
		component: Article,
		routes: articleRoutes,
		async fetchData({dispatch}){
			dispatch(await setCategory());
		}
	},
	{
		path: "/discovery",
		component: Discovery,
		routes: discoveryRoutes
	},
	{
		path: "/me",
		component: Me,
		routes: meRoutes
	},
	{
		path: "/setting",
		component: Setting,
		routes: settingRoutes
	},
	{
		path: "/u/:id",
		component: User,
		routes: userRoutes,
		async fetchData({dispatch}){
			dispatch(await setCategory());
		}
	},
	{
		component: Other,
		routes: otherRoutes
	}
];
@attachStyles(() => require("./styles"))
@withRouter
@connect(({core}) => core)
export default class App extends Component{
	async componentDidMount(){
		const {dispatch} = this.props;
		try{
			dispatch(await setUser());
			dispatch(await setCategory());
		}catch(e){
			Dialog.alert(e);
		}
	}
	render(){
		const {
			title,
			headerLeftButton,
			headerRightButton,
			headerType,
			slideOnBars
		} = this.props;
		return [
			<Header key={0} title={title} headerLeftButton={headerLeftButton} headerRightButton={headerRightButton} headerType={headerType} />,
			<Footer key={1} entrances={
				[
					{
						icon: "home",
						label: "首页",
						to: "/"
					},
					{
						icon: "article",
						label: "文章",
						to: "/article"
					},
					{
						icon: "add",
						to: "/article/edit/0"
					},
					{
						icon: "discovery",
						label: "发现",
						to: "/discovery"
					},
					{
						icon: "me",
						label: "我的",
						to: "/me"
					}
				]
			} hiddenIndex={2} />,
			<Switch key={2}>
				{
					routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
				}
			</Switch>,
			<SlideOnBar key={3} bars={slideOnBars} />,
			<Dialog key={4} />
		];
	}
}