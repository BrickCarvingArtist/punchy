import {pick} from "lodash";
import {sequelize, Article, View} from "./";
import {filter} from "./utils";
Article.hasMany(View, {
	foreignKey: "article_id",
	sourceKey: "id"
});
View.belongsTo(Article, {
	foreignKey: "article_id",
	targetKey: "id"
});
export const fetch = async ({index, size, sup_label, sub_label, from, to}) => (await Article.findAll({
	where: filter({
		sup_label,
		sub_label,
		from,
		to
	}),
	include: [{
		model: View,
		attributes: [[sequelize.fn("COUNT", sequelize.col("article_id")), "viewed_times"]]
	}],
	attributes: ["id", "author", "title", "description", "updated_at"],
	order: [["updated_at", "DESC"]],
	group: "id",
	raw: true,
	offset: index * size
	// ,limit: size // 莫名其妙sql会被乱编译到错误的位置，无法使用，todo
})).filter((article, index) => {
	article.viewed_times = article["article_views.viewed_times"];
	delete article["article_views.viewed_times"];
	return index < size;
});
export const insert = async ({title, author, sup_label, sub_label, content}) => pick(await Article.create(filter({
	title,
	author,
	sup_label,
	sub_label,
	content
})), ["id", "title", "author", "sup_label", "sub_label", "content"]);
export const update = async ({id, title, author, sup_label, sub_label, content}) => {
	if((await Article.findOne({
		where: {
			id
		},
		attributes: ["author"]
	})).author !== author){
		throw {
			code: 5000100500
		};
	}
	return pick((await Article.update(filter({
		title,
		author,
		sup_label,
		sub_label,
		content
	}), {
		where: {
			id
		},
		limit: 1,
		individualHooks: true
	}))[1][0], ["id", "title", "author", "sup_label", "sub_label", "content"]);
};
export const remove = id => sequelize.transaction(t => Promise.all([
	Article.destroy({
		where: {
			id
		}
	}, {
		transcation: t
	}),
	View.destroy({
		where: {
			article_id: id
		}
	}, {
		transcation: t
	})
]));
export const random = () => sequelize.query("SELECT * FROM (SELECT id, title, author, description, updated_at, IFNULL(t1.viewed_times, 0) AS viewed_times FROM articles LEFT JOIN (SELECT article_id, COUNT(ip) AS viewed_times FROM article_views GROUP BY article_id)t1 ON id=t1.article_id ORDER BY RAND() DESC LIMIT 10)t2 ORDER BY t2.updated_at DESC;", {
	type: sequelize.QueryTypes.SELECT
});
export const getDetail = id => Article.findOne({
	where: {
		id
	}
}) || {};