import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {pick} from "lodash/core";
import {basis} from "../../actions";
import {saveAll} from "../../actions/editor";
@connect(({article}) => ({
	category: article.category,
}), dispatch => bindActionCreators({
	...basis,
	saveAll
}, dispatch))
export default class Category extends Component{
	state = {
		supLabel: undefined
	};
	componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("选择类目");
		setHeaderLeftButton("back");
		setHeaderRightButton();
		setFooterType();
	}
	saveAll(sup_label, sub_label){
		const {
			saveAll,
			match,
			history
		} = this.props;
		saveAll({
			id: match.params.id,
			sup_label,
			sub_label
		});
		history.goBack();
	}
	render(){
		return (
			<div className="page category with-footer">
				{
					this.props.category.map(({sup, sub}, supLabel) => (
						<section key={supLabel} className={
							classNames({
								expand: supLabel === this.state.supLabel
							})
						}>
							<h1 onClick={
								() => {
									const prevSupLabel = this.state.supLabel;
									this.setState({
										supLabel: prevSupLabel === undefined || prevSupLabel !== supLabel ? supLabel : undefined
									})
								}
							}>
								<strong>{sup}</strong>
								<icon className="small down"></icon>
							</h1>
							{
								sub.map((item, subLabel) => (
									<p onClick={
										() => {
											this.saveAll(supLabel, subLabel);
										}
									}>{item}</p>
								))
							}
						</section>
					))
				}
			</div>
		);
	}
}