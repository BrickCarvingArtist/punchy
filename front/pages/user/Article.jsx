import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {basis, setSlideOnBar} from "../../actions";
import {setMyArticles} from "../../actions/user";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
@connect(({me, user}) => ({
	user: me.tel,
	articles: user.articles
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar
}, dispatch))
@connect()
export default class Article extends Component{
	state = {
		ending: 0
	};
	async componentWillMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType,
			user
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
		(articles.length == nextLength || nextLength % size) && this.setState({
			ending: 1
		});
	}
	render(){
		const {
			setSlideOnBar,
			setMessage
		} = this.props;
		return (
			<Scroller className="page article without-footer" loadData={
				async (index, isRefresh) => {
					this.props.dispatch(await setMyArticles({
						author: this.props.user,
						index
					}, isRefresh));
					isRefresh && this.setState({
						ending: 0
					});
				}
			} ending={this.state.ending}>
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={
						articleId => {
							setSlideOnBar([
								{
									name: "编辑",
									to: `/article/edit/${articleId}`
								},
								{
									name: "删除",
									onClick(){
										setMessage("确认删除这篇文章？");
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