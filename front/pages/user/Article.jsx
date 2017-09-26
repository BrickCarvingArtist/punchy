import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {basis, setSlideOnBar} from "../../actions";
import {setMyArticles, removeMyArticle} from "../../actions/user";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
import Dialog from "../../components/Dialog";
@connect(({me, user}) => ({
	user: me.tel,
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
	componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType
		} = this.props;
		setTitle("我的文章");
		setHeaderLeftButton("back");
		setHeaderRightButton();
		setFooterType();
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
			setSlideOnBar,
			setMessage,
			user,
			size,
			articles
		} = this.props;
		return (
			<Scroller className="page with-footer" loadData={
				async (index, isRefresh) => {
					dispatch(await setMyArticles({
						author: user,
						index,
						size
					}, isRefresh));
				}
			} ending={this.state.ending}>
				{
					articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={
						articleId => {
							setSlideOnBar([
								{
									name: "编辑",
									to: `/article/edit/${articleId}`
								},
								{
									name: "删除",
									async onClick(){
										Dialog.confirm("确认删除这篇文章？")(async () => disatch(await removeMyArticle(articleId)));
									}
								}
							])
						}
					} />)
				}
			</Scroller>
		);
	}
}