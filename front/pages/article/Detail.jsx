import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {basis} from "../../actions";
import {getDetail} from "../../actions/article";
@connect(({article}) => article, dispatch => bindActionCreators(basis, dispatch))
@connect()
export default class Detail extends Component{
	async componentWillMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			setFooterType,
			match,
		} = this.props;
		setTitle("文章详情页");
		setHeaderLeftButton("back");
		setHeaderRightButton();
		setFooterType();
		dispatch(await getDetail(match.params.id));
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
			match
		} = this.props;
		const {
			title,
			author,
			updated_at,
			content,
			sup_label,
			sub_label
		} = this.props[match.params.id] || {};
		return (
			<article className="page article-detail with-footer">
				<h1>{title}</h1>
				<p>{author}</p>
				<p>{updated_at}</p>
				<p>{sup_label}-{sub_label}</p>
				<pre>{content}</pre>
			</article>
		);
	}
}