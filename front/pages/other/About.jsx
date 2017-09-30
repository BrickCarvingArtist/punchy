import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../../actions";
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class NotFound extends Component{
	componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("关于我们");
		setHeaderLeftButton("back");
		setHeaderRightButton();
		setFooterType();
	}
	render(){
		return (
			<div className="page"></div>
		);
	}
};