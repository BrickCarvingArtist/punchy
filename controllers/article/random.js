import {sequelize, Article, View} from "../";
import {success, error} from "../../utils";
export default () => async ctx => {
	try{
		ctx.body = success(await sequelize.query("SELECT * FROM (SELECT id, title, author, description, updated_at, IFNULL(t1.viewed_times, 0) AS viewed_times FROM articles LEFT JOIN (SELECT article_id, COUNT(ip) AS viewed_times FROM article_views GROUP BY article_id)t1 ON id=t1.article_id ORDER BY RAND() DESC LIMIT 10)t2 ORDER BY t2.updated_at DESC;", {
			type: sequelize.QueryTypes.SELECT
		}));
	}catch(e){
		ctx.body = error({
			code: 5000100100,
			ctx,
			e
		});
	}
};