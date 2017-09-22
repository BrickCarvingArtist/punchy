import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {RouteWithSubRoutes} from "../../utils";
import MyArticle from "./Article";
const routes = [
	{
		path: "/:id",
		exact: true,
		component: () => <div>用户首页</div>
	},
	{
		path: "/:id/article",
		component: MyArticle
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);