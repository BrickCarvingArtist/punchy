import React from "react";
import {Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "../../utils";
import Profile from "./Profile";
import MyArticle from "./Article";
import MyFavorite from "./Favorite";
import MyFocus from "./Focus";
import NotFound from "../other/NotFound";
const routes = [
	{
		path: "/u/:id",
		exact: true,
		component: Profile
	},
	{
		path: "/u/:id/article",
		component: MyArticle
	},
	{
		path: "/u/:id/favorite",
		component: MyFavorite
	},
	{
		path: "/u/:id/focus",
		component: MyFocus
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