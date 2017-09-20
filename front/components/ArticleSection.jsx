import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {Time} from "../utils";
process.title === "node" || require("../styles/article_section.styl");
export default ({id, avator, author, title, description, updated_at, viewed_times, cover}) => (
	<section className="article">
		<header>
			<img className="avator" src={avator || "/avator.png"} />
			<Link to={`/profile/${author}`}>
				<strong>{author}</strong>
			</Link>
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