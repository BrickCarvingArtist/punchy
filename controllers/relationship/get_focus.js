import {success, error} from "../../utils";
import {getFocuses} from "../../services/relationship";
export default () => async ctx => {
	try{
		ctx.body = success(await getFocuses(ctx.params.id));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000300000,
			ctx,
			e
		});
	}
};