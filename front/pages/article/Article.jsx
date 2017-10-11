import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ArticleSection from "../../components/ArticleSection";
import Scroller from "../../components/Scroller";
import {alert, confirm} from "../../components/Dialog";
import {basis, setSlideOnBar} from "../../actions";
import {setArticles, removeArticle} from "../../actions/article";
@connect(({article, me}) => ({
	user: me.tel,
	articles: article.articles
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
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
		this.props.setTitle("所有文章");
	}
	componentDidMount(){
		this.props.setHeaderType(1);
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
		try{
			dispatch(await setArticles({
				index,
				size
			}, isRefresh));
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
	componentWillUnmount(){
		this.props.setSlideOnBar([]);
	}
	render(){
		return (
			<Scroller className="page article without-footer" loadData={::this.getData} ending={this.state.ending}>
				{
					this.props.articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={this.handleSlideOnBarOption.bind(this, article.id, i, article.author_id)} />)
				}
			</Scroller>
		);
	}
}