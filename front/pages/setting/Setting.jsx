import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {parse} from "querystring";
import {alert} from "../../components/Dialog";
import {basis, clearCaches} from "../../actions";
import {setAvatar} from "../../actions/setting";
import {SERVER_NAME, AUTH_SERVER} from "../../configs";
@connect(({core, me}) => ({
	name: me.name,
	avatar: me.avatar || "/avatars/avatar.png"
}), dispatch => bindActionCreators({
	...basis,
	clearCaches,
	dispatch
}, dispatch))
export default class Setting extends Component{
	componentDidMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setTitle("设置");
		setHeaderLeftButton({
			icon: "back",
			to: "/me"
		});
		setHeaderRightButton();
	}
	async handleAvatar(e){
		const file = new FormData();
		file.append("avatar", e.target.files[0]);
		try{
			const {ok} = this.props.dispatch(await setAvatar(file));
			ok && alert("头像修改成功");
		}catch(e){
			alert(e);
		}
	}
	clearCaches(){
		const {length} = JSON.stringify(localStorage);
		this.props.clearCaches();
		alert(`已为您清除${length / 1000}KB缓存`);
	}
	render(){
		const {
			location,
			name,
			avatar
		} = this.props;
		return (
			<div className="page setting with-footer">
				<Link className="profile" to="/setting/profile">
					<input className="avatar" type="file" accept="image/*" onChange={::this.handleAvatar} onClick={
						e => {
							e.stopPropagation();
						}
					} style={
						{
							backgroundImage: `url("${avatar}")`
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