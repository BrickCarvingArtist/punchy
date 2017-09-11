import {sequelize, Article, View} from "../";
import {success, error} from "../../utils";
export default () => async ctx => {
	const {id} = ctx.params;
	try{
		ctx.body = success(await sequelize.transaction(t => Promise.all([
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
		])));
	}catch(e){
		ctx.body =  error({
			code: 5000100600,
			ctx,
			e
		});
	}
};