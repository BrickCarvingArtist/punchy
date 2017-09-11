import {success, error, isEmptyOrIs} from "../../utils";
export default (sequelize, Article) => async ctx => {
	let {
		pageIndex,
		pageSize,
		user
	} = ctx.query;
	if(isEmptyOrIs(pageIndex, ["number"])){
		ctx.body = error({
			code: 5000100001,
			comment: "页码",
			ctx
		});
	}
	if(isEmptyOrIs(pageIndex, ["number"])){
		ctx.body = error({
			code: 5000100002,
			comment: "每页信息条数",
			ctx
		});
	}
	if(isEmptyOrIs(user, ["number"])){
		ctx.body = error({
			code: 5000100003,
			comment: "手机号",
			ctx
		});
	}
	user = user || ctx.state.tel;
	try{
		const [count, rows] = await Promise.all([
			Article.count({
				where: {
					author: user
				}
			}),
			sequelize.query(`SELECT id, title, author, description, updated_at, IFNULL(t.viewed_times, 0) AS viewed_times FROM articles LEFT JOIN (SELECT article_id, COUNT(ip) AS viewed_times FROM article_views GROUP BY article_id)t ON id=t.article_id WHERE author=${user} ORDER BY updated_at DESC LIMIT ${pageIndex * pageSize}, ${+pageSize};`, {
				type: sequelize.QueryTypes.SELECT
			})
		]);
		ctx.body = success({
			count,
			rows: rows || []
		});
	}catch(e){
		ctx.body = error({
			code: 5000100004,
			ctx,
			e
		});
	}
};