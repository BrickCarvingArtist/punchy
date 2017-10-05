import {success, error} from "../../utils";
import {search} from "../../services/article";
export default () => async ctx => {
	try{
		ctx.body = success(await search(ctx.params.word));
	}catch(e){
		ctx.body = error({
			code: 5000101000,
			ctx,
			e
		});
	}
};