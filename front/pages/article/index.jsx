import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {parse} from "querystring";
import ArticleSection from "../../components/ArticleSection";
import Scroller from "../../components/Scroller";
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
	state = {
		ending: 0
	};
	async componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("所有文章");
		setHeaderLeftButton();
		setHeaderRightButton();
		setFooterType(1);
	}
	componentWillReceiveProps(nextProps){
		const nextLength = nextProps.articles.length,
			{
				articles,
				size
			} = this.props;
		(articles.length == nextLength || nextLength % size) && this.setState({
			ending: 1
		});
	}
	render(){
		return (
			<Scroller className="page article without-footer" loadData={
				async (index, isRefresh) => {
					this.props.dispatch(await setArticles({index}, isRefresh));
					isRefresh && this.setState({
						ending: 0
					});
				}
			} ending={this.state.ending}>
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} />)
				}
			</Scroller>
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