import {success, error} from "../../utils";
import {validate_labels} from "./utils";
import {update} from "../../services/article";
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
		ctx.body = success(await update(ctx.request.body));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000100501,
			ctx,
			e
		});
	}
};