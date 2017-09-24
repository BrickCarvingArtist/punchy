import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {Time} from "../utils";
try{
	require("../styles/article_section");
}catch(e){}
export default ({id, avator, author_id, author_name, title, description, updated_at, viewed_times, cover, handleOption}) => (
	<section className="article">
		<header>
			<div className="left">
				<img className="avator" src={avator || "/avator.png"} alt="作者头像" />
				<Link to={`/${author_id}`}>
					<strong>{author_name || author_id}</strong>
				</Link>
			</div>
			<icon className="medium option" onClick={
				() => {
					handleOption(id, author_id);
				}
			}></icon>
		</header>
		<div className="detail">
			<Link className={
				classNames({
					title: true,
					hasCover: cover
				})
			} to={`/article/${id}`}>
				{
					cover ? <div className="cover"></div> : []
				}
				<h1>{title}</h1>
			</Link>
			<p>{description}</p>
		</div>
		<footer>
			<time>{Time.diff(Date.now(), updated_at)}</time>
			<div className="view">
				<icon className="small view"></icon>
				<span>{viewed_times}</span>
			</div>
		</footer>
	</section>
);