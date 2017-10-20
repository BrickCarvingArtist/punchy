import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {alert} from "../../components/Dialog";
import {basis} from "../../actions";
import {getDetail, getUserRelationsToArticle, addFavorite, saySix, appendHistory} from "../../actions/article";
import {Time, copy} from "../../utils";
@connect(({article, articleRelation}) => ({
	article,
	articleRelation
}), dispatch => bindActionCreators({
	...basis,
	appendHistory,
	dispatch
}, dispatch), ({article, articleRelation}, dispatchProps, ownProps) => {
	const {id} = ownProps.match.params;
	return {
		category: article.category,
		id,
		...article[id],
		...articleRelation[id],
		...dispatchProps,
		...ownProps
	};
})
class Detail extends Component{
	state = {
		startY: 0,
		isHold: 0
	};
	componentWillMount(){
		this.props.setTitle("文章详情页");
	}
	async componentDidMount(){
		const {
			dispatch,
			setHeaderLeftButton,
			setHeaderRightButton,
			id
		} = this.props;
		setHeaderLeftButton("back");
		setHeaderRightButton({
			label: "分享",
			level: 1,
			onClick(){
				copy(location.href) && alert("文章地址已成功复制到剪贴板");
			}
		});
		try{
			dispatch(await getDetail(id));
			dispatch(await getUserRelationsToArticle(id));
			const {
				appendHistory,
				title
			} = this.props;
			appendHistory({
				id,
				title
			});
		}catch(e){
			alert(e);
		}
	}
	componentWillReceiveProps(nextProps){
		this.props.setTitle(nextProps.title);
	}
	render(){
		const {
			dispatch,
			category,
			id,
			title,
			author_id,
			author_name,
			avatar,
			updated_at,
			content,
			sup_label,
			sub_label,
			favorite,
			thumb
		} = this.props;
		const supLabel = category[sup_label] || {sub: []};
		return (
			<article className="page detail with-footer" onTouchStart={
				({touches}) => {
					this.state.startY = touches[0].pageY;
				}
			} onTouchEnd={
				({changedTouches}) => {
					this.setState({
						isHold: changedTouches[0].pageY < this.state.startY
					});
					const t = setTimeout(() => {
						clearTimeout(t);
						this.setState({
							isHold: 0
						});
					}, 2000);
				}
			}>
				<header>
					<h1>{title}</h1>
					<div className="base">
						<Link to={`/${author_id}`}>
							<img className="avatar small" src={avatar || "/avatars/avatar.png"} />
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
							try{
								dispatch(await addFavorite(id));
							}catch(e){
								alert(e);
							}
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
							try{
								dispatch(await saySix(id));
							}catch(e){
								alert(e);
							}
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