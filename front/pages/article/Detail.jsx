import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
import {getDetail, getUserRelationsToArticle, addFavorite, saySix} from "../../actions/article";
import {Time} from "../../utils";
@connect(({article, articleRelation, router}) => {
	let id;
	try{
		id = router.location.pathname.match(/\d+/)[0];
	}catch(e){}
	return {
		category: article.category,
		id,
		...article[id],
		...articleRelation[id]
	};
}, dispatch => bindActionCreators(basis, dispatch))
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
			id,
		} = this.props;
		setTitle("文章详情页");
		setHeaderLeftButton("back");
		setHeaderRightButton({
			label: "分享",
			level: 1
		});
		setFooterType();
		dispatch(await getDetail(id));
		dispatch(await getUserRelationsToArticle(id));
	}
	componentWillReceiveProps(nextProps){
		this.props.setTitle(nextProps.title);
	}
	render(){
		const {
			dispatch,
			match,
			category,
			id,
			title,
			author_id,
			author_name,
			avator,
			updated_at,
			content,
			sup_label,
			sub_label,
			favorite,
			thumb,
		} = this.props;
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
						<Link to={`/${author_id}`}>
							<img className="avator small" src={avator || "/avator.png"} />
							<strong>{author_name || author_id}</strong>
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
					<div className="button" onClick={
						async () => {
							dispatch(await addFavorite(id));
						}
					}>
						<icon className={
							classNames("medium", {
								"on-favorite": favorite,
								"off-favorite": !favorite
							})
						}></icon>
						<span>收藏</span>
					</div>
					<div className="button" onClick={
						async () => {
							dispatch(await saySix(id));
						}
					}>
						<icon className={
							classNames("medium", {
								"on-six": thumb,
								"off-six": !thumb
							})
						}></icon>
						<span>点赞</span>
					</div>
				</footer>
			</article>
		);
	}
}