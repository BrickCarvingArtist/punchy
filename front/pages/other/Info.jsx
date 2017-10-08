import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../../actions";
try{
	require("../../styles/info");
}catch(e){}
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class NotFound extends Component{
	componentDidMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setTitle("产品信息");
		setHeaderLeftButton("back");
		setHeaderRightButton();
	}
	render(){
		return (
			<div className="page info with-footer">
				<h1>博客系统</h1>
				<a href="/">https://punchy.ikindness.cn</a>
				<pre>{"全站Sketch移动端设计，常规及flex混合布局，遍布CSS3（Stylus预编译），适配方案全使用最新技术。\n\n后端基于阿里云Linux（CentOS7）环境，Nginx代理，https加密，http2加速数据传输，静态资源及用户上传AliOSS，服务端语言Node.js（已升级至Node8+Koa2），数据库为MySQL（ORM使用Sequelize，并同步翻译中文文档）。\n\n前端基于ECMAScript上至stage-0，下至原生ES3，框架React（已升级至V16）+React-Router（已升级至V4）+Redux，模块化打包工具Webpack（已升级至V3），ESLint规范代码风格，测试Mocha for both，Enzyme for React，进程管理PM2，版本工具Git。"}</pre>
				<h1>用户系统</h1>
				<a href="https://auth.ikindness.cn">https://auth.ikindness.cn</a>
				<pre>{"技术同上，并实现单点登录（JWT）。"}</pre>
			</div>
		);
	}
};