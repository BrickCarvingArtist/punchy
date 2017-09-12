import {success, error} from "../../utils";
import {validate_labels} from "./utils";
import {insert} from "../../services/article";
export default () => async ctx => {
	const {
		sup_label,
		sub_label
	} = ctx.request.body;
	let code;
	if(code = validate_labels(sup_label, sub_label)){
		return ctx.body = error({
			code,
			ctx
		});
	}
	try{	
		ctx.body = success(await insert({
			...ctx.request.body,
			author: ctx.state.tel
		}));
	}catch(e){
		ctx.body = error({
			code: 5000100401,
			ctx,
			e
		});
	}
};