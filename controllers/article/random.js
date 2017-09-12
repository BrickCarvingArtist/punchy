import {success, error} from "../../utils";
import {random} from "../../services/article";
export default () => async ctx => {
	try{
		ctx.body = success(await random());
	}catch(e){
		ctx.body = error({
			code: 5000100100,
			ctx,
			e
		});
	}
};