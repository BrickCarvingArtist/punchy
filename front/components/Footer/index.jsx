import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import classNames from "classnames";
import {attachStyles} from "../utils";
@attachStyles(() => require("./footer"))
export class Footer extends Component{
	render(){
		const {
				location,
				entrances,
				hiddenIndex
			} = this.props,
			{
				pathname
			} = location;
		return (
			<footer className={
				classNames({
					hidden: !entrances.some(({to}, i) => to === pathname && i !== hiddenIndex)
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
export default withRouter(Footer);