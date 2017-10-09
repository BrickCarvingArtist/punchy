import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import Scroller from "../../components/Scroller";
import ArticleSection from "../../components/ArticleSection";
import {alert} from "../../components/Dialog";
import {basis, setSlideOnBar} from "../../actions";
import {setAuthorProfile, setAuthorArticles, focus} from "../../actions/user";
try{
	require("../../styles/user");
}catch(e){}
@connect(({user}) => ({
	user
}), dispatch => bindActionCreators({
	...basis,
	setSlideOnBar,
	dispatch
}, dispatch), ({user}, dispatchProps, ownProps) => {
	const {id} = ownProps.match.params;
	return {
		...user,
		...user[id],
		author: id,
		...dispatchProps,
		...ownProps
	};
})
export default class Profile extends Component{
	static defaultProps = {
		size: 10
	};
	state = {
		ending: 0
	};
	componentDidMount(){
		const {
			setTitle,
			setHeaderType,
			author,
			name
		} = this.props;
		setTitle(`${name || author}的个人主页`);
		setHeaderType();
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
	async setAuthorProfile(){
		const {
			author,
			dispatch
		} = this.props;
		try{
			dispatch(await setAuthorProfile(author));
		}catch(e){
			alert(e);
		}
	}
	async getData(index, isRefresh){
		const {
			dispatch,
			size,
			author
		} = this.props;
		try{
			dispatch(await setAuthorArticles({
				author,
				index,
				size
			}, isRefresh)).ok || this.setState({
				ending: 1
			});
		}catch(e){
			alert(e);
		}
	}
	handleSlideOnBarOption(articleId, author){
		this.props.setSlideOnBar([
			{
				name: "举报",
				onClick(){
					alert("举报成功");
				}
			}
		]);
	}
	async focus(){
		const {
			dispatch,
			author
		} = this.props;
		try{
			const {
				ok,
				value
			} = dispatch(await focus(author));
			if(ok){
				alert(`${["取消", ""][value.focus]}关注成功`);
				this.setAuthorProfile();
			}
		}catch(e){
			alert(e);
		}
	}
	renderProfile(){
		const {
			history,
			avatar,
			name,
			author,
			article_sum,
			focus_sum,
			focused
		} = this.props;
		return (
			<div className="profile">
				<icon className="medium back-white" onClick={::history.goBack}></icon>
				<div className="main">
					<div className="left">
						<img className="avatar" src={avatar || "/avatars/avatar.png"} alt="作者头像" />
						<div className="center">
							<strong>{name || author}</strong>
							<p>
								<span>文章 {article_sum || 0}</span>
								<span>粉丝 {focus_sum || 0}</span>
							</p>
						</div>
					</div>
					<a className="border-button white" onClick={::this.focus}>{
						["关注", "取消关注"][focused]
					}</a>
				</div>
			</div>
		);
	}
	render(){
		return (
			<div className="page user-profile with-both">
				{
					this.renderProfile()
				}
				<Scroller className="article" loadData={::this.getData} ending={this.state.ending}>
					{
						this.props.articles.map((article, i) => <ArticleSection key={i} {...article} handleOption={::this.handleSlideOnBarOption} />)
					}
				</Scroller>
			</div>
		);
	}
}