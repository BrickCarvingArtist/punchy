import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import classNames from "classnames";
process.title === "node" || require("../styles/slide_on_bar.styl");
@connect(({core}) => ({
	bars: core.slideOnBars
}))
export default class SlideOnBar extends Component{
	state = {
		display: 0
	};
	componentWillReceiveProps(nextProps){
		this.setState({
			display: nextProps.bars.length
		});
	}
	render(){
		return (
			<div className={
				classNames("slide-on-bar", {
					hidden: !this.state.display
				})
			}>
				<div className="shadow"></div>
				{
					this.props.bars.map(({name, to, onClick}) => {
						if(to){
							return <Link to={to} onClick={
								() => {
									this.setState({
										display: 0
									})
								}
							}>{name}</Link>
						}
						return <a onClick={onClick}>{name}</a>
					})
				}
				<a onClick={
					() => {
						this.setState({
							display: 0
						});
					}
				}>取消</a>
			</div>
		);
	}
}