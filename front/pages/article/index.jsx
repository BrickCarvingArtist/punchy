import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {parse} from "querystring";
import ArticleSection from "../../components/ArticleSection";
import Scroller from "../../components/Scroller";
import {RouteWithSubRoutes} from "../../utils";
import {basis, setSlideOnBar} from "../../actions";
import {setArticles} from "../../actions/article";
import Detail from "./Detail";
import Edit from "./Edit";
@connect(({article, me}) => ({
	user: me.tel,
	articles: article.articles
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar
}, dispatch))
@connect()
class Article extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	async componentWillMount(){
		const {
			setTitle,
			setMessage,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("所有文章");
		setHeaderLeftButton();
		setHeaderRightButton({
			icon: "search",
			onClick(){
				setMessage("功能暂未开通");
			}
		});
		setFooterType(1);
	}
	componentWillReceiveProps(nextProps){
		const nextLength = nextProps.articles.length,
			{
				articles,
				size
			} = this.props;
		this.setState({
			ending: articles.length == nextLength || nextLength % size
		});
	}
	render(){
		const {
			dispatch,
			setMessage,
			setSlideOnBar,
			user,
			size,
			articles
		} = this.props;
		return (
			<Scroller className="page article without-footer" loadData={
				async (index, isRefresh) => {
					dispatch(await setArticles({
						index,
						size
					}, isRefresh));
				}
			} ending={this.state.ending}>
				{
					articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={
						(articleId, author) => {
							setSlideOnBar(author == user ? [
								{
									name: "编辑",
									to: `/article/edit/${articleId}`
								},
								{
									name: "删除",
									onClick(){
										setMessage("确定删除这篇文章？");
									}
								}
							] : [
								{
									name: "举报",
									onClick(){
										setMessage("举报成功");
									}
								}
							]);
						}
					} />)
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
	},
	{
		component: () => <div>404</div>
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);