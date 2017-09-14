import {pick} from "lodash";
import {sequelize, Article, View, UserInfo, Favorite, Thumb} from "./";
import {filter} from "./utils";
UserInfo.hasOne(Article, {
	foreignKey: "author"
});
Article.belongsTo(UserInfo, {
	foreignKey: "author",
	targetKey: "user_id",
	as: "info"
});
Article.hasMany(View, {
	foreignKey: "article_id",
	sourceKey: "id",
	as: "view"
});
View.belongsTo(Article, {
	foreignKey: "article_id",
	targetKey: "id"
});
Article.hasMany(Favorite, {
	foreignKey: "article_id",
	sourceKey: "id",
	as: "favorite"
});
Favorite.belongsTo(Article, {
	foreignKey: "article_id",
	targetKey: "id"
});
Article.hasMany(Thumb, {
	foreignKey: "article_id",
	sourceKey: "id",
	as: "thumb"
});
Thumb.belongsTo(Article, {
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
	include: [
		{
			model: View,
			attributes: [[sequelize.fn("COUNT", sequelize.col("article_id")), "viewed_times"]],
			as: "view"
		},
		{
			model: UserInfo,
			attributes: ["avator"],
			as: "info"
		}
	],
	attributes: ["id", "author", "title", "description", "updated_at"],
	order: [["updated_at", "DESC"]],
	group: ["article.id", "info.avator"],
	raw: true,
	offset: index * size
	// ,limit: size // 莫名其妙sql会被乱编译到错误的位置，无法使用，todo
})).filter((article, index) => {
	article.viewed_times = article["view.viewed_times"];
	article.avator = article["info.avator"];
	delete article["view.viewed_times"];
	delete article["info.avator"];
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
export const addFavorite = async ({user_id, article_id}) => {
	const where = filter({
		user_id,
		article_id
	});
	try{
		const record = await Favorite.findOne({
			where,
			raw: true,
			paranoid: false
		});
		if(record){
			if(record.deleted_at){
				return Favorite.restore({
					where
				});
			}
			try{
				await Favorite.destroy({
					where
				});
				return 1;
			}catch(e){
				throw {
					code: 5000100802
				};
			}
		}
		return Favorite.create(where);
	}catch(e){
		throw {
			code: e.code || 5000100801
		};
	}
};
export const thumb = async ({user_id, article_id}) => {
	const where = filter({
		user_id,
		article_id
	});
	try{
		const record = await Thumb.findOne({
			where,
			raw: true,
			paranoid: false
		});
		if(record){
			if(record.deleted_at){
				return Thumb.restore(where);
			}
			try{
				await Thumb.destroy(where);
				return 1;
			}catch(e){
				throw {
					code: 5000100902
				};
			}
		}
		return Thumb.create(where);
	}catch(e){
		throw {
			code: e.code || 5000100901
		};
	}
};
// export const getRelation = ({user_id, article_id}) => Article.find({
// 	where: {
// 		article_id
// 	},
// 	include: [
// 		{
// 			model: Favorite,
// 			attributes: [[sequelize.fn("COUNT"), sequelize.col("*")], ""]
// 		},
// 		{
// 			model: 
// 		}
// 	]
// })