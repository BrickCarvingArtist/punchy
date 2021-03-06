import React from "react";
import {Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "../../utils";
import Setting from "./Setting";
import Profile from "./Profile";
import NotFound from "../other/NotFound";
import {attachStyles} from "../../utils";
export const routes = [
	{
		path: "/setting",
		exact: true,
		component: Setting
	},
	{
		path: "/setting/profile",
		component: Profile
	},
	{
		component: NotFound
	}
];
export default attachStyles(() => require("../../styles/setting"))(() => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
));