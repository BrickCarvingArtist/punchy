import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
import {basis, setSlideOnBar} from "../../actions";
import {setArticles} from "../../actions/home";
import {Time} from "../../utils";
try{
	require("../../styles/home");
}catch(e){}
@connect(({me, home, core}) => ({
	use: me.user,
	articles: home.articles
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar
}, dispatch))
@connect()
export default class Home extends Component{
	static defaultProps = {
		size: 10
	};
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
		setTitle("首页 | Punchy");
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
		}, isRefresh)).ok || this.setState({
			ending: 1
		});
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
			<Scroller className="page home without-footer" loadData={::this.getData} ending={this.state.ending}>
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={::this.handleSlideOnBarOption} />)
				}
			</Scroller>
		);
	}
}