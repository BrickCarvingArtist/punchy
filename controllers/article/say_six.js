import {success, error} from "../../utils";
import {thumb} from "../../services/article"
export default () => async ctx => {
	try{
		ctx.body = success(await thumb({
			article_id: ctx.request.body.article_id,
			user_id: ctx.state.tel
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000100900,
			ctx,
			e
		});
	}
};