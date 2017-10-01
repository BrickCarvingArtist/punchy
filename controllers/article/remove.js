import {success, error} from "../../utils";
import {remove} from "../../services/article";
export default () => async ctx => {
	try{
		await remove(ctx.params.id);
		ctx.body = success();
	}catch(e){
		ctx.body =  error({
			code: 5000100600,
			ctx,
			e
		});
	}
};