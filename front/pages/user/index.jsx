import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Switch} from "react-router-dom";
import classNames from "classnames";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
import {basis, setSlideOnBar} from "../../actions";
import {getAuthorProfile, setAuthorArticles, focus} from "../../actions/user";
import {RouteWithSubRoutes} from "../../utils";
import MyArticle from "./Article";
import MyFavorite from "./Favorite";
import MyFocus from "./Focus";
import NotFound from "../other/NotFound";
try{
	require("../../styles/user");
}catch(e){}
@connect(({user, router}) => {
	let id;
	try{
		id = router.location.pathname.match(/\d+/)[0];
	}catch(e){}
	return {
		author: id,
		articles: [],
		...user[id]
	};
}, dispatch => bindActionCreators({
	...basis,
	setSlideOnBar
}, dispatch))
@connect()
class User extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	componentWillMount(){
		const {
			setTitle,
			setHeaderType,
			setFooterType,
			author
		} = this.props;
		setTitle(`${author}的个人主页`);
		setHeaderType(0);
		setFooterType();
		this.setAuthorProfile();
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
	componentWillUnmount(){
		this.props.setHeaderType(1);
	}
	async setAuthorProfile(){
		const {
			author,
			dispatch
		} = this.props;
		dispatch(await getAuthorProfile(author));
	}
	async getData(index, isRefresh){
		const {
			dispatch,
			size,
			author
		} = this.props;
		dispatch(await setAuthorArticles({
			author,
			index,
			size
		}, isRefresh)).ok || this.setState({
			ending: 1
		});
	}
	render(){
		const {
			dispatch,
			setMessage,
			setSlideOnBar,
			history,
			avator,
			name,
			author,
			tel,
			article_sum,
			focus_sum,
			focused,
			size,
			articles
		} = this.props;
		return (
			<div className="page user-profile with-both">
				<div className="profile">
					<icon className="medium back-white" onClick={
						() => {
							history.goBack();
						}
					}></icon>
					<div className="main">
						<div className="left">
							<img className="avator" src={avator || "/avator.png"} alt="作者头像" />
							<div className="center">
								<strong>{name || author}</strong>
								<p>
									<span>文章 {article_sum || 0}</span>
									<span>粉丝 {focus_sum || 0}</span>
								</p>
							</div>
						</div>
						<a className="border-button white" onClick={
							async () => {
								const {
									ok,
									value
								} = dispatch(await focus(author));
								if(ok){
									setMessage(`${["取消", ""][value.focus]}关注成功`);
									this.setAuthorProfile();
								}
							}
						}>{
							["关注", "取消关注"][focused]
						}</a>
					</div>
				</div>
				<Scroller className="article" loadData={::this.getData} ending={this.state.ending}>
					{
						articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={
							articleId => {
								setSlideOnBar([
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
			</div>
		);
	}
}
const routes = [
	{
		path: "/u/:id",
		exact: true,
		component: User
	},
	{
		path: "/u/:id/article",
		component: MyArticle
	},
	{
		path: "/u/:id/favorite",
		component: MyFavorite
	},
	{
		path: "/u/:id/focus",
		component: MyFocus
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