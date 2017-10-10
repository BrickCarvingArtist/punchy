import React from "react";
import {Switch} from "react-router-dom";
import {RouteWithSubRoutes, attachStyles} from "../../utils";
import Article from "./Article";
import Detail from "./Detail";
import Edit from "./Edit";
import NotFound from "../other/NotFound";
import {setArticles, getDetail} from "../../actions/article";
export const routes = [
	{
		path: "/article",
		exact: true,
		component: Article,
		async fetchData({dispatch}){
			dispatch(await setArticles({
				index: 0,
				size: 10
			}, 1));
		}
	},
	{
		path: "/article/edit/:id",
		component: Edit,
		async fetchData({dispatch}, {params}){
			dispatch(await getDetail(params.id));
		}
	},
	{
		path: "/article/:id",
		component: Detail,
		async fetchData({dispatch}, {params}){
			dispatch(await getDetail(params.id));
		}
	},
	{
		component: NotFound
	}
];
export default attachStyles(() => require("../../styles/article"))(() => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
));