import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
import Search from "../../components/Search";
import {alert, confirm} from "../../components/Dialog";
import {basis, setSlideOnBar} from "../../actions";
import {setArticles, removeArticle, search, setRecommendations, clearHistory} from "../../actions/home";
import {Time} from "../../utils";
try{
	require("../../styles/home");
}catch(e){}
@connect(({me, home}) => ({
	user: me.tel,
	...home
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
	clearHistory
}, dispatch))
@connect()
export default class Home extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	async componentDidMount(){
		const {
			dispatch,
			setTitle,
			setHeaderType
		} = this.props;
		setTitle("首页 | Punchy");
		setHeaderType();
		dispatch(await setRecommendations(3));
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
		this.props.setSlideOnBar([]);
	}
	async getData(index, isRefresh){
		const {
			dispatch,
			size
		} = this.props;
		try{
			dispatch(await setArticles({
				index,
				size
			}, isRefresh)).ok || this.setState({
				ending: 1
			});
		}catch(e){
			alert(e);
		}
	}
	handleSlideOnBarOption(articleId, index, author){
		const {
			dispatch,
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
					confirm("确认删除这篇文章？", async () => {
						try{
							dispatch(await removeArticle(articleId, index)).ok && alert("操作成功");
						}catch(e){
							alert(e);
						}
					});
				}
			}
		] : [
			{
				name: "举报",
				onClick(){
					alert("举报成功");
				}
			}
		]);
	}
	async handleSearch(value){
		try{
			return this.props.dispatch(await search(value));
		}catch(e){
			alert(e);
		}
	}
	render(){
		const {
			results,
			recommendations,
			histories,
			clearHistory
		} = this.props;
		return (
			<div className="page home without-footer">
				<Search handleSearch={::this.handleSearch} results={results} recommendations={recommendations} histories={histories} clearHistory={clearHistory} />
				<Scroller loadData={::this.getData} ending={this.state.ending}>
					{
						this.props.articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={this.handleSlideOnBarOption.bind(this, article.id, i, article.author_id)} />)
					}
				</Scroller>
			</div>
		);
	}
}