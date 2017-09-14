import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {parse} from "querystring";
import ArticleSection from "../../components/ArticleSection";
import {RouteWithSubRoutes} from "../../utils";
import {basis} from "../../actions";
import {setArticles} from "../../actions/article";
import Detail from "./Detail";
import Edit from "./Edit";
@connect(({core, article}) => ({
	articles: article.articles
}), dispatch => bindActionCreators(basis, dispatch))
@connect()
class Article extends Component{
	async componentWillMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType,
			location
		} = this.props;
		setTitle("所有文章");
		setHeaderLeftButton();
		setHeaderRightButton();
		setFooterType(1);
		dispatch(await setArticles(parse(location.search.slice(1))));
	}
	render(){
		return (
			<div className="page article without-footer">
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} />)
				}
			</div>
		);
	}
}
const routes = [
	{
		path: "/article",
		exact: true,
		component: Article
	},
	{
		path: "/article/edit/:id",
		component: Edit
	},
	{
		path: "/article/:id",
		component: Detail
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);