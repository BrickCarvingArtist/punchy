import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {parse} from "querystring";
import {basis} from "../../actions";
import {setAvator} from "../../actions/setting";
import {RouteWithSubRoutes} from "../../utils";
import {SERVER_NAME, AUTH_SERVER} from "../../configs";
import Profile from "./Profile";
process.title === "node" || require("../../styles/setting");
@connect(({core, me}) => ({
	name: me.name,
	avator: me.avator || "/avator.png"
}), dispatch => bindActionCreators(basis, dispatch))
@connect()
class Setting extends Component{
	static defaultProps = {
		entrances: [
			{
				label: "实名认证",
				to: "/setting/authorization"
			},
			{
				type: 1,
				label: "修改密码",
				to: `${AUTH_SERVER}/behavior`,
			}
		]
	};
	componentWillMount(){
		const {
			dispatch,
			setMessage,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType,
			location
		} = this.props;
		setTitle("设置");
		setHeaderLeftButton({
			icon: "back",
			to: "/me"
		});
		setHeaderRightButton();
		setFooterType();
		parse(location.search.slice(1)).sso_token && setMessage("密码修改成功");
	}
	handleAvator = async e => {
		const file = new FormData();
		file.append("avator", e.target.files[0]);
		this.props.dispatch(await setAvator(file));
	};
	render(){
		const {
			location,
			entrances,
			name,
			avator
		} = this.props;
		return (
			<div className="page setting with-footer">
				<Link className="profile" to="/setting/profile">
					<input className="avator" type="file" accept="image/*" capture onChange={this.handleAvator} onClick={
						e => {
							e.stopPropagation();
						}
					} style={
						{
							backgroundImage: `url("${avator}")`
						}
					} />
					<div className="basis">
						<strong>{name || "未名用户"}</strong>
						<span>修改用户名</span>
					</div>
					<icon className="medium go"></icon>
				</Link>
				<div className="container">
					{
						entrances.map(({label, to, type = 0}, i) => (
							[
								<Link className="entrance without-icon" key={i} to={to}>{label}</Link>,
								<a className="entrance without-icon" key={i} href={`${to}?referer=${SERVER_NAME}${location.pathname}`}>{label}</a>
							][type]
						))
					}
				</div>
				<Link className="entrance out" to="/out">退出登录</Link>
			</div>
		);
	}
}
const routes = [
	{
		path: "/setting",
		exact: true,
		component: Setting
	},
	{
		path: "/setting/profile",
		component: Profile
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);