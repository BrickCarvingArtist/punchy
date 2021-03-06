import React, {Component} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {attachStyles} from "../utils";
@attachStyles(() => require("./slide_on_bar"))
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
						this.props.bars.map(({name, to, onClick}, i) => {
							if(to){
								return <Link key={i} to={to}>{name}</Link>
							}
							return <a key={i} onClick={
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