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
try{
	require("../../styles/setting");
}catch(e){}
@connect(({core, me}) => ({
	name: me.name,
	avator: me.avator || "/avator.png"
}), dispatch => bindActionCreators(basis, dispatch))
@connect()
class Setting extends Component{
	componentWillMount(){
		const {
			dispatch,
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
	}
	async handleAvator(e){
		const file = new FormData();
		file.append("avator", e.target.files[0]);
		this.props.dispatch(await setAvator(file));
	}
	clearCaches(){
		const {length} = localStorage.ik_punchy;
		localStorage.clear();
		this.props.setMessage(`已为您清除${length / 1000}KB缓存`);
	}
	render(){
		const {
			location,
			name,
			avator
		} = this.props;
		return (
			<div className="page setting with-footer">
				<Link className="profile" to="/setting/profile">
					<input className="avator" type="file" accept="image/*" onChange={::this.handleAvator} onClick={
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
					<Link className="entrance without-icon" to="/setting/authorization">实名认证</Link>
					<a className="entrance without-icon" href={`${AUTH_SERVER}/behavior?referer=${SERVER_NAME}${location.pathname}`}>修改密码</a>
					<a className="entrance without-icon" onClick={::this.clearCaches}>清除缓存</a>
				</div>
				<a className="entrance out" href="/api/out">退出登录</a>
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
	},
	{
		component: () => <div>404</div>
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);