import {pick} from "lodash";
import {Article} from "../";
import {success, error} from "../../utils";
import {validate_labels} from "../utils";
export default () => async ctx => {
	const {body} = ctx.request,
		{
			sup_label,
			sub_label
		} = body,
		{id} = ctx.params;
	let code;
	if(code = validate_labels(sup_label, sub_label)){
		return ctx.body = error({
			code,
			ctx
		});
	}
	if((await Article.findOne({
		where: {
			id
		},
		attributes: ["author"]
	})).author !== ctx.state.tel){
		return ctx.body = error({
			code: 5000100500,
			ctx
		});
	}
	try{
		ctx.body = success(pick((await Article.update(body, {
			where: {
				id
			},
			limit: 1,
			individualHooks: true
		}))[1][0], ["id", "title", "sup_label", "sub_label", "content"]));
	}catch(e){
		ctx.body = error({
			code: 5000100501,
			ctx,
			e
		});
	}
};