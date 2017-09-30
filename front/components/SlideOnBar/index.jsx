import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import classNames from "classnames";
try{
	require("./slide_on_bar");
}catch(e){}
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
	hide(){
		this.setState({
			display: 0
		});
	}
	render(){
		return (
			<div className={
				classNames("slide-on-bar", {
					hidden: !this.state.display
				})
			} onClick={this::this.hide}>
				<div className="shadow"></div>
				<div className="bars">
					{
						this.props.bars.map(({name, to, onClick}) => {
							if(to){
								return <Link to={to}>{name}</Link>
							}
							return <a onClick={
								async e => {
									e.stopPropagation();
									await onClick(e);
									this.hide();
								}
							}>{name}</a>
						})
					}
					<a>取消</a>
				</div>
			</div>
		);
	}
}