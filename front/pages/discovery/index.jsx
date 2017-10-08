import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
try{
	require("../../styles/discovery");
}catch(e){}
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class User extends Component{
	componentDidMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setHeaderType
		} = this.props;
		setTitle("发现");
		setHeaderLeftButton();
		setHeaderRightButton();
		setHeaderType(1);
	}
	render(){
		return (
			<div className="page discovery without-footer">
				<h3>开发者信息</h3>
				<div className="row">
					<a className="small" href="https://github.com/BrickCarvingArtist">Github：BrickCarvingArtist</a>
				</div>
				<div className="row">
					<a className="small" href="http://wpa.qq.com/msgrd?v=3&uin=806321554&site=qq&menu=yes">QQ号：806321554</a>
				</div>
				<div className="row">
					<a className="small" href="http://shang.qq.com/wpa/qunwpa?idkey=6ff6f2e96e77e3321c42a756bc7a83a64ac70129da6f3d0a59809afe08346998">QQ群：精通JavaScript</a>
				</div>
			</div>
		);
	}
}