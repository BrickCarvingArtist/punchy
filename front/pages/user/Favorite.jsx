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
import {alert} from "../../components/Dialog";
@connect(({me, user}) => ({
	user: me.tel,
	articles: user.favorites
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
	updateMyFavorites,
	dispatch
}, dispatch))
export default class Article extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	componentWillMount(){
		this.props.setTitle("我的收藏");
	}
	componentDidMount(){
		const {
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
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
			user && dispatch(await setMyFavorites({
				user_id: user,
				index,
				size
			}, isRefresh)).ok || this.setState({
				ending: 1
			});
		}catch(e){
			alert(e);
		}
	}
	render(){
		const {
			dispatch,
			setSlideOnBar,
			updateMyFavorites,
			articles
		} = this.props;
		return (
			<Scroller className="page with-footer" loadData={::this.getData} ending={this.state.ending}>
				{
					articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={
						articleId => {
							setSlideOnBar([
								{
									name: "取消收藏",
									onClick: async e => {
										try{
											if(dispatch(await addFavorite(articleId)).ok){
												updateMyFavorites(i);
												alert("取消收藏成功");
											}
										}catch(e){
											alert(e);
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