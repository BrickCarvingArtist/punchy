import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import classNames from "classnames";
try{
	require("../styles/footer");
}catch(e){}
@withRouter
@connect(({core}) => ({
	footerType: core.footerType
}))
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
			footerType,
			entrances
		} = this.props;
		return (
			<footer className={
				classNames({
					fixed: footerType
				})
			}>
				{
					entrances.map(({icon, label, to}, i) => (
						<NavLink key={i} to={to} exact>
							<icon className={
								classNames("big", icon, {
									"active": location.pathname === to
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