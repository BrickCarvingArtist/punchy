import {pick} from "lodash";
import {Article} from "../";
import {success, error} from "../../utils";
import {validate_labels} from "../utils";
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
		const {body} = ctx.request;
		ctx.body = success(pick(await Article.create({
			...body,
			author: ctx.state.tel,
		}), ["id", "title", "sup_label", "sub_label", "content"]));
	}catch(e){
		ctx.body = error({
			code: 5000100401,
			ctx,
			e
		});
	}
};