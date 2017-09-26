import {pick} from "lodash";
import {sequelize, Article, View, User, UserInfo, Favorite, Thumb, Focus} from "./";
import {filter} from "./utils";
User.hasOne(Article, {
	foreignKey: "author"
});
Article.belongsTo(User, {
	foreignKey: "author",
	targetKey: "tel",
	as: "user"
});
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
export const fetch = async ({index, size, sup_label, sub_label, author, from, to}) => (await Article.findAll({
	where: filter({
		sup_label,
		sub_label,
		author,
		from,
		to
	}),
	include: [
		{
			model: User,
			attributes: ["tel", "name"],
			as: "user"
		},
		{
			model: UserInfo,
			attributes: ["avator"],
			as: "info"
		}
	],
	attributes: ["id", "title", "description", "updated_at",
		[sequelize.literal("(SELECT COUNT(0) FROM `article_views` WHERE `article_views`.`article_id` = `article`.`id` AND (`article`.`deleted_at` > CURRENT_TIMESTAMP OR `article`.`deleted_at` IS NULL))"), "viewed_times"],
		[sequelize.literal("(SELECT COUNT(0) FROM `favorites` AS `favorite` WHERE `favorite`.`article_id` = `article`.`id` AND (`favorite`.`deleted_at` > CURRENT_TIMESTAMP OR `favorite`.`deleted_at` IS NULL))"), "favorite_sum"],
		[sequelize.literal("(SELECT COUNT(0) FROM `thumbs` AS `thumb` WHERE `thumb`.`article_id` = `article`.`id` AND (`thumb`.`deleted_at` > CURRENT_TIMESTAMP OR `thumb`.`deleted_at` IS NULL))"), "thumb_sum"]
	],
	order: [["updated_at", "DESC"]],
	group: ["article.id", "user.name", "info.avator"],
	raw: true,
	offset: index * size,
	limit: +size
})).filter(article => {
	article.author_id = article["user.tel"];
	article.author_name = article["user.name"];
	article.avator = article["info.avator"];
	delete article["user.tel"];
	delete article["user.name"];
	delete article["info.avator"];
	return article;
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
export const random = () => sequelize.query("SELECT * FROM (SELECT id, title, author as author_id, description, updated_at, IFNULL(t1.viewed_times, 0) AS viewed_times FROM articles LEFT JOIN (SELECT article_id, COUNT(ip) AS viewed_times FROM article_views GROUP BY article_id)t1 ON id=t1.article_id ORDER BY RAND() DESC LIMIT 10)t2 ORDER BY t2.updated_at DESC;", {
	type: sequelize.QueryTypes.SELECT
});
export const getDetail = async id => {
	const detail = await Article.findOne({
		where: {
			id
		},
		include: [
			{
				model: User,
				attributes: ["name"],
				as: "user"
			}
		],
		group: ["user.name"],
		raw: true
	}) || {};
	detail.author_id = detail.author;
	detail.author_name = detail["user.name"];
	delete detail.author;
	delete detail["user.name"];
	return detail;
};
export const getFavorites = async ({index, size, sup_label, sub_label, user_id, from, to}) => {
	let articleIds;
	try{
		articleIds = await Favorite.findAll(filter({
			where: {
				user_id
			},
			attributes: ["article_id"]
		})).map(({article_id}) => article_id);
	}catch(e){
		throw {
			code: 5000100803
		};
	}
	return (await Article.findAll({
		where: filter({
			sup_label,
			sub_label,
			id: {
				in: articleIds
			},
			from,
			to
		}),
		include: [
			{
				model: User,
				attributes: ["tel", "name"],
				as: "user"
			},
			{
				model: UserInfo,
				attributes: ["avator"],
				as: "info"
			}
		],
		attributes: ["id", "title", "description", "updated_at",
			[sequelize.literal("(SELECT COUNT(0) FROM `article_views` WHERE `article_views`.`article_id` = `article`.`id`)"), "viewed_times"],
			[sequelize.literal("(SELECT COUNT(0) FROM `favorites` WHERE `favorites`.`article_id` = `article`.`id`)"), "favorite_sum"],
			[sequelize.literal("(SELECT COUNT(0) FROM `thumbs` WHERE `thumbs`.`article_id` = `article`.`id`)"), "thumb_sum"]
		],
		order: [["updated_at", "DESC"]],
		group: ["article.id", "user.name", "info.avator"],
		raw: true,
		offset: index * size,
		limit: +size
	})).map(article => {
		article.author_id = article["user.tel"];
		article.author_name = article["user.name"];
		article.avator = article["info.avator"];
		delete article["user.tel"];
		delete article["user.name"];
		delete article["info.avator"];
		return article;
	});
};
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
				await Favorite.restore({
					where
				});
				return {
					article_id,
					favorite: 1
				};
			}
			try{
				await Favorite.destroy({
					where
				});
				return {
					article_id,
					favorite: 0
				};
			}catch(e){
				throw {
					code: 5000100802
				};
			}
		}
		await Favorite.create(where);
		return {
			article_id,
			favorite: 1
		};
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
				await Thumb.restore({
					where
				});
				return {
					article_id,
					thumb: 1
				};
			}
			try{
				await Thumb.destroy({
					where
				});
				return {
					article_id,
					thumb: 0
				};
			}catch(e){
				throw {
					code: 5000100902
				};
			}
		}
		await Thumb.create(where);
		return {
			article_id,
			thumb: 1
		};
	}catch(e){
		throw {
			code: e.code || 5000100901
		};
	}
};
export const getRelation = async ({user_id, article_id}) => {
	const where = filter({
		user_id,
		article_id
	});
	return (await sequelize.transaction(t => Promise.all([
		Favorite.findOne({
			where,
			attributes: [[sequelize.fn("COUNT", sequelize.col("*")), "favorite"]],
			transaction: t,
			raw: true
		}),
		Thumb.findOne({
			where,
			attributes: [[sequelize.fn("COUNT", sequelize.col("*")), "thumb"]],
			transaction: t,
			raw: true
		}),
	]))).reduce((relations, relation) => ({
		...relations,
		...relation
	}), {
		article_id: +article_id
	});
};
export const getAuthorAdditions = async ({author, user_id}) => {
	const where = filter({
		author
	});
	const [article_sum, focus_sum, focused] = await sequelize.transaction(t => Promise.all([
		Article.count({
			where
		}),
		Focus.count({
			where
		}),
		Focus.count({
			where: filter({
				author,
				user_id
			})
		})
	]));
	return {
		article_sum,
		focus_sum,
		focused
	};
};