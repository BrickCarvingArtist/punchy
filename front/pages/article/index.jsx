import React from "react";
import {Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "../../utils";
import Article from "./Article";
import Detail from "./Detail";
import Edit from "./Edit";
import NotFound from "../other/NotFound";
const routes = [
	{
		path: "/article",
		exact: true,
		component: Article
	},
	{
		path: "/article/edit/:id",
		component: Edit
	},
	{
		path: "/article/:id",
		component: Detail
	},
	{
		component: NotFound
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);