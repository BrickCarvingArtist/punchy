import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../actions";
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class User extends Component{
	componentWillMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("发现");
		setHeaderLeftButton();
		setHeaderRightButton();
		setFooterType(1);
	}
	render(){
		return (
			<div className="page discovery without-footer">
				发现
			</div>
		);
	}
}