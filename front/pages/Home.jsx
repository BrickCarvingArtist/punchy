import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import ArticleSection from "../components/ArticleSection";
import {basis} from "../actions";
import {setArticles} from "../actions/home";
import {Time} from "../utils";
try{
	require("../styles/home");
}catch(e){}
@connect(({home, core}) => ({
	articles: home.articles
}), dispatch => bindActionCreators(basis, dispatch))
@connect()
export default class Home extends Component{
	async componentWillMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("首页");
		setHeaderLeftButton();
		setHeaderRightButton();
		setFooterType(1);
		dispatch(await setArticles());
	}
	render(){
		return (
			<div className="page home without-footer">
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} />)
				}
			</div>
		);
	}
}