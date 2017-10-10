import React from "react";
import {Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "../../utils";
import Profile from "./Profile";
import MyArticle from "./Article";
import MyFavorite from "./Favorite";
import MyFocus from "./Focus";
import NotFound from "../other/NotFound";
import {setAuthorProfile, setAuthorArticles, setMyArticles, setMyFavorites, setMyFocuses} from "../../actions/user";
export const routes = [
	{
		path: "/u/:id",
		exact: true,
		component: Profile,
		async fetchData({dispatch}, {params}){
			const {id} = params;
			dispatch(await setAuthorProfile(id));
			dispatch(await setAuthorArticles({
				author: id,
				index: 0,
				size: 10
			}, 1));
		}
	},
	{
		path: "/u/:id/article",
		component: MyArticle,
		async fetchData({dispatch}, {params}){
			dispatch(await setMyArticles({
				author: params.id,
				index: 0,
				size: 10
			}, 1));
		}
	},
	{
		path: "/u/:id/favorite",
		component: MyFavorite,
		async fetchData({dispatch}, {params}){
			dispatch(await setMyFavorites({
				user_id: params.id,
				index: 0,
				size: 10
			}, 1));
		}
	},
	{
		path: "/u/:id/focus",
		component: MyFocus,
		async fetchData({dispatch}, {params}){
			dispatch(await setMyFocuses({
				user_id: params.id,
				index: 0,
				size: 10
			}, 1));
		}
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