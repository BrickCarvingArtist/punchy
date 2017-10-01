import React, {Component} from "react";
export default class Search extends Component{
	handleCancel(){

	}
	render(){
		return (
			<div className="search">
				<img src="/logo" alt="logo" />
				<input className="search"/>
				<a onClick={::this.handleCancel}>取消</a>
			</div>
		);
	}
}