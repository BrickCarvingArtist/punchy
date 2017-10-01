import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ArticleSection from "../../components/ArticleSection";
import Scroller from "../../components/Scroller";
import {RouteWithSubRoutes} from "../../utils";
import {basis, setSlideOnBar} from "../../actions";
import {setArticles} from "../../actions/article";
import Detail from "./Detail";
import Edit from "./Edit";
import NotFound from "../other/NotFound";
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
	async getData(index, isRefresh){
		const {
			dispatch,
			size
		} = this.props;
		dispatch(await setArticles({
			index,
			size
		}, isRefresh));
	}
	handleSlideOnBarOption(articleId, author){
		const {
			setMessage,
			setSlideOnBar,
			user
		} = this.props;
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
	render(){
		return (
			<Scroller className="page article without-footer" loadData={::this.getData} ending={this.state.ending}>
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={::this.handleSlideOnBarOption} />)
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
		component: NotFound
	}
];
export default () => (
	<Switch>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>
);