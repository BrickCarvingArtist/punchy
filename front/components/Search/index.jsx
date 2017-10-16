import React, {Component} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {attachStyles} from "../utils";
@attachStyles(() => require("./search"))
export default class Search extends Component{
	state = {
		editable: 0,
		content: "",
		results: []
	};
	handleCancel(){
		this.setState({
			editable: 0
		});
	}
	showSearchPage(){
		this.state.editable || this.setState({
			editable: 1
		});
	}
	async handleChange({target}){
		const {value} = target;
		this.setState({
			content: value
		});
		value && this.props.handleSearch(value);
	}
	renderAdditions(key){
		const {
			recommendations,
			histories,
			clearHistory
		} = this.props;
		return (
			<div key={key} className={
				classNames("search-addition", {
					hidden: !this.state.editable
				})
			}>
				<section>
					<h1>热门推荐</h1>
					{
						recommendations.map(({id, title}, i) => <Link key={i} to={`/article/${id}`}>{title}</Link>)
					}
				</section>
				{
					histories.length ? 
						<section>
							<h1>
								<strong>历史记录</strong>
								{
									clearHistory ? <icon className="small dustbin" onClick={clearHistory}></icon> : null
								}
							</h1>
							{
								histories.map(({id, title}, i) => <Link key={i} to={`/article/${id}`}>{title}</Link>)
							}
						</section>
						: null
				}
			</div>
		);
	}
	renderSearchResult(key){
		const {
			editable,
			content
		} = this.state;
		const {
			results
		} = this.props;
		return (
			<div key={key} className={
				classNames("search-result", {
					hidden: !(content && editable)
				})
			}>
				{
					results.length ? 
						results.map(({id, title}, i) => <Link key={i} to={`/article/${id}`}>{title}</Link>)
						: [
							<icon key={0} className="empty"></icon>,
							<p key={1} className="note">不好，没有相关内容...</p>
						]
				}
			</div>
		);
	}
	render(){
		const {
			editable,
			content
		} = this.state;
		return [
			<div key={0} className="search-header">
				<img className={
					classNames("logo", {
						hidden: editable
					})
				} src="/logo.svg" alt="logo" />
				<input type="text" className={
					classNames("search", {
						shrink: !editable,
						expand: editable
					})
				} onFocus={::this.showSearchPage} placeholder={(this.props.recommendations[0] || {}).title} onChange={::this.handleChange} />
				<a className={
					classNames("cancel", {
						display: editable
					})
				} onClick={::this.handleCancel}>取消</a>
			</div>,
			this.renderAdditions(1),
			this.renderSearchResult(2)
		];
	}
}