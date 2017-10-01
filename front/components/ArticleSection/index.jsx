import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {Time} from "../../utils";
try{
	require("./article_section");
}catch(e){}
export default ({id, avator, author_id, author_name, title, description, updated_at, favorite_sum, thumb_sum, viewed_times, cover, handleOption}) => (
	<section className="article">
		<header>
			<Link className="author" to={`/u/${author_id}`}>
				<img className="avator" src={avator || "/avator.png"} alt="作者头像" />
				<strong>{author_name || author_id}</strong>
			</Link>
			<icon className="medium option" onClick={
				() => {
					handleOption(id, author_id);
				}
			}></icon>
		</header>
		<Link className={
			classNames("detail", {
				hasCover: cover
			})
		} to={`/article/${id}`}>
			{
				cover ? <div className="cover"></div> : []
			}
			<h1>{title}</h1>
			<p>{description}</p>
		</Link>
		<footer>
			<time>{Time.diff(Date.now(), updated_at)}</time>
			<div className="right">
				<icon className="small favorite"></icon>
				<span>{favorite_sum}</span>
				<icon className="small six"></icon>
				<span>{thumb_sum}</span>
				<icon className="small view"></icon>
				<span>{viewed_times}</span>
			</div>
		</footer>
	</section>
);