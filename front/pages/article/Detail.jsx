import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
import {getDetail, getUserRelationsToArticle, addFavorite, saySix} from "../../actions/article";
import {Time} from "../../utils";
@connect(({article}) => ({
	category: article.category,
	...article
}), dispatch => bindActionCreators(basis, dispatch))
@connect()
export default class Detail extends Component{
	state = {
		isHold: 0
	};
	async componentWillMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType,
			match,
		} = this.props;
		const {id} = match.params;
		setTitle("文章详情页");
		setHeaderLeftButton("back");
		setHeaderRightButton({
			label: "分享",
			level: 1
		});
		setFooterType();
		dispatch(await getDetail(id));
		// dispatch(await getUserRelationsToArticle(id));
	}
	componentWillReceiveProps(nextProps){
		const {
			setTitle,
			match
		} = this.props;
		setTitle(nextProps[match.params.id].title);
	}
	render(){
		const {
			dispatch,
			match,
			category,
			isFavorite,
			isSix,
		} = this.props;
		const {
			id,
			title,
			author,
			avator,
			updated_at,
			content,
			sup_label,
			sub_label
		} = this.props[match.params.id] || {};
		const supLabel = category[sup_label] || {sub:[]};
		return (
			<article className="page detail with-footer" onScroll={
				() => {
					this.state.isHold || this.setState({
						isHold: 1
					});
				}
			} onTouchEnd={
				() => {
					this.setState({
						isHold: 0
					});
				}
			}>
				<header>
					<h1>{title}</h1>
					<div className="base">
						<Link to={`/profile/${author}`}>
							<img className="avator small" src={avator || "/avator.png"} />
							<strong>{author}</strong>
						</Link>
						<time>{Time.toDash(updated_at)}</time>
					</div>
				</header>
				<div className="category">
					<Link to={`/article?sup_label=${sup_label}&sub_label=${sub_label}`}>{supLabel.sup}·{supLabel.sub[sub_label]}</Link>
				</div>
				<pre>{content}</pre>
				<footer className={
					classNames({
						pin: !this.state.isHold
					})
				}>
					<button type="button" onClick={
						async () => {
							dispatch(await addFavorite(id));
						}
					}>
						<icon className={
							classNames("medium", {
								"on-favorite": isFavorite,
								"off-favorite": !isFavorite
							})
						}></icon>
						<span>收藏</span>
					</button>
					<button type="button" onClick={
						async () => {
							dispatch(await saySix(id));
						}
					}>
						<icon className={
							classNames("medium", {
								"on-six": isSix,
								"off-six": !isSix
							})
						}></icon>
						<span>点赞</span>
					</button>
				</footer>
			</article>
		);
	}
}