import {success, error} from "../../utils";
import {getRelation} from "../../services/article";
export default () => async ctx => {
	try{
		ctx.body = success(await getRelation({
			user_id: ctx.state.tel || 0,
			article_id: ctx.params.id
		}));
	}catch(e){
		ctx.body = error({
			code: 5000100700,
			ctx,
			e
		});
	}
};