import {success, error} from "../../utils";
import {validate_labels} from "./utils";
import {getFavorites} from "../../services/article";
export default () => async ctx => {
	const {
		index = 0,
		size = 10,
		sup_label,
		sub_label,
		user_id,
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
		ctx.body = success(await getFavorites({
			index,
			size,
			sup_label,
			sub_label,
			user_id,
			from,
			to
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000100803,
			ctx,
			e
		});
	}
};