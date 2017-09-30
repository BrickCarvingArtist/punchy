import React from "react";
import {Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "../../utils";
import Info from "./Info";
import About from "./About";
import Help from "./Help";
import NotFound from "./NotFound";
const routes = [
	{
		path: "/info",
		component: Info
	},
	{
		path: "/about",
		component: About
	},
	{
		path: "/help",
		component: Help
	},
	{
		component: NotFound
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)
		}
	</Switch>
);