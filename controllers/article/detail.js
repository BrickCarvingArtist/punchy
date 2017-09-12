import {success, error} from "../../utils";
import {getDetail} from "../../services/article"
export default () => async ctx => {
	try{
		ctx.body = success(await getDetail(ctx.params.id));
	}catch(e){
		ctx.body = error({
			code: 5000100301,
			ctx,
			e
		});
	}
};