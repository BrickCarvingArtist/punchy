import {success, error} from "../../utils";
import {recommand} from "../../services/article";
export default () => async ctx => {
	try{
		ctx.body = success(await recommand(ctx.query.size));
	}catch(e){
		ctx.body = error({
			code: 5000101100,
			ctx,
			e
		});
	}
};