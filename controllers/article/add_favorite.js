import {success, error} from "../../utils";
import {addFavorite} from "../../services/article";
export default () => async ctx => {
	try{
		ctx.body = success(await addFavorite({
			article_id: ctx.request.body.article_id,
			user_id: ctx.state.tel
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000100800,
			ctx,
			e
		});
	}
};