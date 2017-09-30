import {success, error} from "../../utils";
import {validate_labels} from "./utils";
import {getFavorites} from "../../services/article";
export default () => async ctx => {
	const {
		index = 0,
		size = 10,
		user_id
	} = ctx.query;
	try{
		ctx.body = success(await getFavorites({
			index,
			size,
			user_id
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000100803,
			ctx,
			e
		});
	}
};