import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {basis, setSlideOnBar} from "../../actions";
import {setMyArticles, removeMyArticle} from "../../actions/user";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
import {alert, confirm} from "../../components/Dialog";
@connect(({me, user}) => ({
	user: me.tel || 19999999999,
	articles: user.articles
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar
}, dispatch))
@connect()
export default class Article extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	componentDidMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setTitle("我的文章");
		setHeaderLeftButton("back");
		setHeaderRightButton();
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
			size,
			user
		} = this.props;
		try{
			dispatch(await setMyArticles({
				author: user,
				index,
				size
			}, isRefresh)) || this.setState({
				ending: 1
			});
		}catch(e){
			alert(e);
		}
	}
	handleSlideOnBarOption(articleId, index){
		const {
			dispatch,
			setSlideOnBar
		} = this.props;
		setSlideOnBar([
			{
				name: "编辑",
				to: `/article/edit/${articleId}`
			},
			{
				name: "删除",
				onClick(){
					confirm("确认删除这篇文章？", async () => {
						try{
							dispatch(await removeMyArticle(articleId, index)).ok && alert("操作成功");
						}catch(e){
							alert(e);
						}
					});
				}
			}
		]);
	}
	render(){
		const {
			setSlideOnBar,
			articles
		} = this.props;
		return (
			<Scroller className="page with-footer" loadData={::this.getData} ending={this.state.ending}>
				{
					articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={this.handleSlideOnBarOption.bind(this, article.id, i)} />)
				}
			</Scroller>
		);
	}
}