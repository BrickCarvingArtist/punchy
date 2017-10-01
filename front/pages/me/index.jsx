import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
import {SERVER_NAME, AUTH_SERVER} from "../../configs";
try{
	require("../../styles/me");
}catch(e){}
const Entrance = ({icon, label, to, name, onClick, tel, count}) => (
	<Link className="entrance with-icon" to={tel ? `${to.replace(":id", tel)}` : to} onClick={onClick}>
		<icon className={
			classNames(["medium", icon])
		}></icon>
		<label>{label}</label>
		<span>{count}</span>
		<icon className="small go"></icon>
	</Link>
);
@connect(({core, me}) => ({
	tel: me.tel,
	name: me.name,
	avatar: me.avatar
}), dispatch => bindActionCreators(basis, dispatch))
export default class Me extends Component{
	static defaultProps = {
		entrances: [
			[
				{
					icon: "my-article",
					label: "我的文章",
					to: "/u/:id/article",
					name: "articleSum"
				},
				{
					icon: "my-favorite",
					label: "我的收藏",
					to: "/u/:id/favorite",
					name: "favoriteSum"
				},
				{
					icon: "my-focus",
					label: "我的关注",
					to: "/u/:id/focus"
				}
			], [
				{
					icon: "info",
					label: "产品信息",
					to: "/info"
				},
				{
					icon: "about",
					label: "关于我们",
					to: "/about"
				},
				{
					icon: "help",
					label: "帮助中心",
					to: "/help"
				}
			]
		]
	};
	componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("我的");
		setHeaderLeftButton();
		setHeaderRightButton({
			label: "设置",
			to: "/setting"
		});
		setFooterType(1);
	}
	render(){
		const {
			location,
			entrances,
			name,
			tel,
			avatar
		} = this.props;
		return (
			<div className="page me without-footer">
				<div className="profile">
					<img className="avatar" src={avatar || "/avatar.png"} alt="用户头像" />
					{
						tel ? <strong>{name || tel}</strong> : (
							<a href={`${AUTH_SERVER}?referer=${SERVER_NAME}${location.pathname}`}>点击登录</a>
						)
					}
				</div>
				<div className="container">
					{
						entrances[0].map((entrance, i) => (
							<Entrance {...entrance} tel={tel} key={i} count={this.props[entrance.name]} />
						))
					}
				</div>
				<div className="container">
					{
						entrances[1].map((entrance, i) => (
							<Entrance {...entrance} key={i} />
						))
					}
				</div>
			</div>
		);
	}
}