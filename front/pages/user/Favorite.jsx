import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {basis, setSlideOnBar} from "../../actions";
import {addFavorite} from "../../actions/article";
import {setMyFavorites, updateMyFavorites} from "../../actions/user";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
@connect(({me, user}) => ({
	user: me.tel,
	articles: user.favorites
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
	updateMyFavorites
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
		setTitle("我的收藏");
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
	async getData(index, isRefresh){
		const {
			dispatch,
			size,
			user
		} = this.props;
		dispatch(await setMyFavorites({
			user_id: user,
			index,
			size
		}, isRefresh));
	}
	render(){
		const {
			dispatch,
			setMessage,
			setSlideOnBar,
			updateMyFavorites,
			articles
		} = this.props;
		return (
			<Scroller className="page with-footer" loadData={this::this.getData} ending={this.state.ending}>
				{
					articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={
						articleId => {
							setSlideOnBar([
								{
									name: "取消收藏",
									onClick: async e => {
										if(dispatch(await addFavorite(articleId)).ok){
											updateMyFavorites(i);
											setMessage("取消收藏成功");
										}
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