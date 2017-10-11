import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../../actions";
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class Help extends Component{
	componentWillMount(){
		this.props.setTitle("帮助中心");
	}
	componentDidMount(){
		const {
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setHeaderLeftButton("back");
		setHeaderRightButton();
	}
	render(){
		return (
			<div className="page"></div>
		);
	}
};