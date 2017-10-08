import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import classNames from "classnames";
try{
	require("./footer");
}catch(e){}
@withRouter
export default class Footer extends Component{
	static defaultProps = {
		entrances: [
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
	};
	render(){
		const {
				location,
				entrances
			} = this.props,
			{
				pathname
			} = location;
		return (
			<footer className={
				classNames({
					hidden: !entrances.some(({to}) => to === pathname)
				})
			}>
				{
					entrances.map(({icon, label, to}, i) => (
						<NavLink key={i} to={to} exact>
							<icon className={
								classNames("big", icon, {
									"active": pathname === to
								})
							}></icon>
							<strong>{label}</strong>
						</NavLink>
					))
				}
			</footer>
		);
	}
}