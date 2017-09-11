import {Article} from "../";
import {success, error} from "../../utils";
export default () => async ctx => {
	try{
		ctx.body = success(await Article.findOne({
			where: {
				id: ctx.params.id
			}
		}) || {});
	}catch(e){
		ctx.body = error({
			code: 5000100301,
			ctx,
			e
		});
	}
};