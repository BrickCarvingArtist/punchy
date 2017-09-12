import {success, error} from "../../utils";
import {remove} from "../../services/article";
export default () => async ctx => {
	try{
		ctx.body = success(await remove(ctx.params.id));
	}catch(e){
		ctx.body =  error({
			code: 5000100600,
			ctx,
			e
		});
	}
};