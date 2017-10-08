import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Switch} from "react-router-dom";
import classNames from "classnames";
import {pick} from "lodash/core";
import {alert} from "../../components/Dialog";
import {basis} from "../../actions";
import {getDetail} from "../../actions/article";
import {saveAll, insert, update, clearDraft} from "../../actions/editor";
import {RouteWithSubRoutes} from "../../utils";
import Category from "./Category";
try{
	require("../../styles/article");
}catch(e){}
@connect(({article, editor}) => ({
	article,
	editor
}), dispatch => bindActionCreators({
	...basis,
	saveAll,
	clearDraft
}, dispatch))
@connect()
class Editor extends Component{
	async componentDidMount(){
		const {
			dispatch,
			setTitle,
			setHeaderLeftButton,
			setHeaderRightButton,
			match,
			clearDraft,
			history
		} = this.props;
		const {id} = match.params;
		setTitle("编辑文章");
		setHeaderLeftButton("back");
		setHeaderRightButton({
			label: "发表",
			onClick: async () => {
				const article = this.props.editor[id] || {};
				if(!this.validate(article)){
					return;
				}
				try{
					let {ok} = +id ? dispatch(await update({
						id,
						...article
					})) : dispatch(await insert(article));
					if(ok){
						alert("发表成功");
						clearDraft(id);
						history.push("/article");
					}
				}catch(e){
					alert(e);
				}
			}
		});
		if(+id){
			try{
				dispatch(await getDetail(id));
				this.saveAll();
			}catch(e){
				alert(e);
			}
		}
	}
	saveAll(obj){
		const {
			saveAll,
			article,
			editor,
			match
		} = this.props;
		const {id} = match.params;
		saveAll(Object.assign(pick(article[id], ["id", "title", "sup_label", "sub_label", "content"]), editor[id], {
			id,
			...obj
		}));
	}
	validate({title, sup_label, sub_label, content}){
		if(!/^\S{1,40}$/.test(title)){
			return alert("文章标题不能包含空格"), 0;
		}
		if(!/^\d+$/.test(sup_label) && !/^\d+$/.test(sub_label)){
			return alert("文章类目还未选择"), 0;
		}
		if(!/./.test(content)){
			return alert("文章内容不能为空"), 0;
		}
		return 1;
	}
	render(){
		const {
			saveLabels,
			match,
			editor
		} = this.props;
		const {id} = match.params;
		const {
			title,
			sup_label,
			sub_label,
			content
		} = editor[id] || {};
		const setting = this.props.article.category[sup_label];
		return (
			<article className="page article-editor with-footer">
				<input type="text" className="full" maxLength="40" placeholder="请输入标题" value={title} onChange={
					({target}) => {
						this.saveAll({
							title: target.value
						});
					}
				} />
				<textarea placeholder="请输入正文" value={content} onChange={
					({target}) => {
						this.saveAll({
							content: target.value
						});
					}
				}></textarea>
				<footer className={
					classNames({
						"without-result": !setting
					})
				}>
					{
						setting ? <output>{setting.sup}·{setting.sub[sub_label]}</output> : []
					}
					<Link className="category" to={`/article/edit/category/${id}`} state={
						id
					}>
						<span>分类</span>
						<icon className="small round-add"></icon>
					</Link>
				</footer>
			</article>
		);
	}
}
const routes = [
	{
		path: "/article/edit/category/:id",
		component: Category
	},
	{
		path: "/article/edit/:id",
		component: Editor
	}
];
export default () => (
	<Switch>
	{
		routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
	}
	</Switch>
);