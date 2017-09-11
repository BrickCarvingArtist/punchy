import {resolve} from "path";
import {sequelize, Article, View} from "../";
import {success, error} from "../../utils";
import {validate_labels, createWhereClause} from "../utils";
export default () => async ctx => {
	const {
		index = 0,
		size = 10,
		sup_label,
		sub_label,
		from,
		to
	} = ctx.query;
	let code;
	if(code = validate_labels(sup_label, sub_label)){
		return ctx.body = error({
			code,
			ctx
		});
	}
	try{
		View.belongsTo(Article, {
			foreignKey: "article_id",
			targetKey: "id"
		});
		Article.hasMany(View, {
			foreignKey: "article_id",
			sourceKey: "id"
		});
		ctx.body = success((await Article.findAll({
			where: createWhereClause({
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
		}));
	}catch(e){
		ctx.body = error({
			code: 5000100203,
			ctx,
			e
		});
	}
};